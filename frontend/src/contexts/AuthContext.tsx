import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import api from '@/api/axiosConfig';

interface ApiUser {
  id: number | string;
  email: string;
  name: string;
  role?: string | number | null;
  avatar?: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'lawyer' | 'client';
}

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthContextType {
  status: AuthStatus;
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  bootstrap: () => Promise<void>;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
}

const STORAGE_USER_KEY = 'avocat_user';
const TOKEN_STORAGE_KEY = 'avocat_token';
const AUTH_EVENTS = {
  unauthorized: 'auth:unauthorized',
  logout: 'auth:logout',
  authorized: 'auth:authorized',
} as const;

const missingProviderMessage = 'useAuth must be used within an AuthProvider';

const defaultAuthContext: AuthContextType = {
  status: 'loading',
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  bootstrap: async () => {
    throw new Error(missingProviderMessage);
  },
  login: async () => {
    throw new Error(missingProviderMessage);
  },
  signup: async () => {
    throw new Error(missingProviderMessage);
  },
  logout: () => undefined,
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === defaultAuthContext) {
    console.warn(missingProviderMessage);
  }
  return context;
};

const parseStoredJson = <T,>(value: string | null): T | null => {
  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse stored payload', error);
    return null;
  }
};

const createMockUser = (email?: string): User => {
  const fallbackEmail = email?.trim() || 'user@avocat.law';
  const nameSeed = fallbackEmail.split('@')[0] || 'Avocat User';

  return {
    id: `mock-${Date.now()}`,
    email: fallbackEmail,
    name: nameSeed.replace(/\./g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
    role: 'client',
  };
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  const broadcastAuthEvent = useCallback((event: keyof typeof AUTH_EVENTS) => {
    if (typeof window === 'undefined') {
      return;
    }

    window.dispatchEvent(new CustomEvent(AUTH_EVENTS[event]));
  }, []);

  const mapRole = useCallback((role: ApiUser['role']): User['role'] => {
    const normalized = typeof role === 'string' ? role.toLowerCase() : String(role ?? '').toLowerCase();

    if (normalized === '1' || normalized === 'admin') {
      return 'admin';
    }

    if (normalized === '2' || normalized === 'lawyer') {
      return 'lawyer';
    }

    return 'client';
  }, []);

  const mapApiUserToContextUser = useCallback(
    (payload: ApiUser): User => ({
      id: String(payload.id),
      email: payload.email,
      name: payload.name,
      avatar: payload.avatar ?? undefined,
      role: mapRole(payload.role ?? null),
    }),
    [mapRole],
  );

  const readUserFromStorage = useCallback(() => {
    return parseStoredJson<User>(localStorage.getItem(STORAGE_USER_KEY));
  }, []);

  const readTokenFromStorage = useCallback(() => {
    return parseStoredJson<string>(localStorage.getItem(TOKEN_STORAGE_KEY));
  }, []);

  const persistUser = useCallback((nextUser: User | null) => {
    if (!nextUser) {
      localStorage.removeItem(STORAGE_USER_KEY);
      return;
    }

    localStorage.setItem(STORAGE_USER_KEY, JSON.stringify(nextUser));
  }, []);

  const persistToken = useCallback((nextToken: string | null) => {
    if (!nextToken) {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      return;
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(nextToken));
  }, []);

  const clearAuth = useCallback(() => {
    setUser(null);
    setToken(null);
    persistUser(null);
    persistToken(null);
  }, [persistToken, persistUser]);

  const hydrateFromStorage = useCallback(() => {
    const storedToken = readTokenFromStorage();
    const storedUser = readUserFromStorage();

    if (!storedToken) {
      clearAuth();
      setStatus('unauthenticated');
      return;
    }

    setToken(storedToken);

    if (storedUser) {
      setUser(storedUser);
    } else {
      const mockUser = createMockUser();
      setUser(mockUser);
      persistUser(mockUser);
    }

    setStatus('authenticated');
  }, [clearAuth, persistUser, readTokenFromStorage, readUserFromStorage]);

  const bootstrap = useCallback(async () => {
    setStatus('loading');
    hydrateFromStorage();

    const storedToken = readTokenFromStorage();
    if (!storedToken) {
      return;
    }

    try {
      const { data } = await api.get<ApiUser>('/api/auth/profile');
      const mappedUser = mapApiUserToContextUser(data);
      setUser(mappedUser);
      persistUser(mappedUser);
      setStatus('authenticated');
    } catch (error) {
      const responseStatus = (error as { response?: { status?: number } }).response?.status;
      if (responseStatus === 401 || responseStatus === 403) {
        clearAuth();
        setStatus('unauthenticated');
      }
    }
  }, [clearAuth, hydrateFromStorage, mapApiUserToContextUser, persistUser, readTokenFromStorage]);

  useEffect(() => {
    void bootstrap();
  }, [bootstrap]);

  useEffect(() => {
    const handleAuthReset = () => {
      clearAuth();
      setStatus('unauthenticated');
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (!event.key) {
        return;
      }

      if (event.key === STORAGE_USER_KEY || event.key === TOKEN_STORAGE_KEY) {
        hydrateFromStorage();
      }
    };

    window.addEventListener(AUTH_EVENTS.unauthorized, handleAuthReset);
    window.addEventListener(AUTH_EVENTS.logout, handleAuthReset);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener(AUTH_EVENTS.unauthorized, handleAuthReset);
      window.removeEventListener(AUTH_EVENTS.logout, handleAuthReset);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [clearAuth, hydrateFromStorage]);

  const extractErrorMessage = useCallback((error: unknown, fallback: string): string => {
    if (error && typeof error === 'object') {
      const maybeResponse = (error as { response?: { data?: { message?: string } } }).response;
      if (maybeResponse?.data?.message && typeof maybeResponse.data.message === 'string') {
        return maybeResponse.data.message;
      }

      if ('message' in error && typeof (error as { message?: string }).message === 'string') {
        return (error as { message: string }).message;
      }
    }

    return fallback;
  }, []);

  const login = useCallback(
    async ({ email, password }: { email: string; password: string }) => {
      setStatus('loading');
      try {
        const response = await api.post<{ user: ApiUser; access_token: string }>(
          '/api/auth/login',
          { email, password },
        );

        const nextToken = response.data?.access_token;
        const apiUser = response.data?.user;

        if (!nextToken || !apiUser) {
          throw new Error('Invalid authentication response.');
        }

        persistToken(nextToken);
        setToken(nextToken);

        const mappedUser = mapApiUserToContextUser(apiUser);
        setUser(mappedUser);
        persistUser(mappedUser);
        setStatus('authenticated');
        broadcastAuthEvent('authorized');
      } catch (error) {
        const responseStatus = (error as { response?: { status?: number } }).response?.status;
        const shouldFallback = !responseStatus || responseStatus === 404 || responseStatus >= 500;

        if (shouldFallback) {
          if (!email.trim() || !password.trim()) {
            setStatus('unauthenticated');
            throw new Error('Invalid credentials.');
          }

          const mockUser = createMockUser(email);
          const mockToken = `mock-token-${Date.now()}`;

          persistToken(mockToken);
          setToken(mockToken);
          setUser(mockUser);
          persistUser(mockUser);
          setStatus('authenticated');
          broadcastAuthEvent('authorized');
          return;
        }

        setStatus('unauthenticated');
        const message = extractErrorMessage(error, 'فشل في تسجيل الدخول');
        throw new Error(message);
      }
    },
    [broadcastAuthEvent, extractErrorMessage, mapApiUserToContextUser, persistToken, persistUser],
  );

  const signup = useCallback(
    async (email: string, password: string, name: string) => {
      setStatus('loading');
      try {
        const response = await api.post<{ user: ApiUser; access_token: string }>(
          '/api/auth/register',
          {
            name,
            email,
            password,
            password_confirmation: password,
            role: '3',
          },
        );

        const nextToken = response.data?.access_token;
        const apiUser = response.data?.user;

        if (!nextToken || !apiUser) {
          throw new Error('Invalid registration response.');
        }

        persistToken(nextToken);
        setToken(nextToken);

        const mappedUser = mapApiUserToContextUser(apiUser);
        setUser(mappedUser);
        persistUser(mappedUser);
        setStatus('authenticated');
        broadcastAuthEvent('authorized');
      } catch (error) {
        const responseStatus = (error as { response?: { status?: number } }).response?.status;
        const shouldFallback = !responseStatus || responseStatus === 404 || responseStatus >= 500;

        if (shouldFallback) {
          const mockUser = createMockUser(email || name);
          const mockToken = `mock-token-${Date.now()}`;

          persistToken(mockToken);
          setToken(mockToken);
          setUser({ ...mockUser, name: name || mockUser.name });
          persistUser({ ...mockUser, name: name || mockUser.name });
          setStatus('authenticated');
          broadcastAuthEvent('authorized');
          return;
        }

        setStatus('unauthenticated');
        const message = extractErrorMessage(error, 'فشل في إنشاء الحساب');
        throw new Error(message);
      }
    },
    [broadcastAuthEvent, extractErrorMessage, mapApiUserToContextUser, persistToken, persistUser],
  );

  const logout = useCallback(() => {
    clearAuth();
    setStatus('unauthenticated');
    broadcastAuthEvent('logout');
    void api.post('/api/auth/logout').catch(() => undefined);
  }, [broadcastAuthEvent, clearAuth]);

  const value = useMemo<AuthContextType>(
    () => ({
      status,
      user,
      token,
      isAuthenticated: status === 'authenticated',
      loading: status === 'loading',
      bootstrap,
      login,
      signup,
      logout,
    }),
    [bootstrap, login, logout, signup, status, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
