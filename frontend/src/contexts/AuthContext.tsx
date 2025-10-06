import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const storedUser = localStorage.getItem('avocat_user');
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser) as User);
          } catch (error) {
            console.warn('Failed to parse stored user payload', error);
            localStorage.removeItem('avocat_user');
          }
        }

        const storedToken = sessionStorage.getItem('token');
        if (storedToken) {
          const parsedToken = JSON.parse(storedToken) as string;
          if (parsedToken) {
            const { data } = await api.get<ApiUser>('/api/auth/profile');
            const mappedUser = mapApiUserToContextUser(data);
            setUser(mappedUser);
            localStorage.setItem('avocat_user', JSON.stringify(mappedUser));
          }
        }
      } catch (error) {
        console.warn('Failed to bootstrap auth state from API', error);
        sessionStorage.removeItem('token');
        localStorage.removeItem('avocat_user');
      } finally {
        setLoading(false);
      }
    };

    void initialize();
  }, []);

  const mapRole = (role: ApiUser['role']): User['role'] => {
    const normalized = typeof role === 'string' ? role.toLowerCase() : String(role ?? '').toLowerCase();

    if (normalized === '1' || normalized === 'admin') {
      return 'admin';
    }

    if (normalized === '2' || normalized === 'lawyer') {
      return 'lawyer';
    }

    return 'client';
  };

  const mapApiUserToContextUser = (payload: ApiUser): User => ({
    id: String(payload.id),
    email: payload.email,
    name: payload.name,
    avatar: payload.avatar ?? undefined,
    role: mapRole(payload.role ?? null),
  });

  const extractErrorMessage = (error: unknown, fallback: string): string => {
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
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.post<{ user: ApiUser; access_token: string }>(
        '/api/auth/login',
        { email, password },
      );

      const token = response.data?.access_token;
      const apiUser = response.data?.user;

      if (!token || !apiUser) {
        throw new Error('Invalid authentication response.');
      }

      sessionStorage.setItem('token', JSON.stringify(token));

      const mappedUser = mapApiUserToContextUser(apiUser);
      setUser(mappedUser);
      localStorage.setItem('avocat_user', JSON.stringify(mappedUser));
    } catch (error) {
      const message = extractErrorMessage(error, 'فشل في تسجيل الدخول');
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
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

      const token = response.data?.access_token;
      const apiUser = response.data?.user;

      if (!token || !apiUser) {
        throw new Error('Invalid registration response.');
      }

      sessionStorage.setItem('token', JSON.stringify(token));

      const mappedUser = mapApiUserToContextUser(apiUser);
      setUser(mappedUser);
      localStorage.setItem('avocat_user', JSON.stringify(mappedUser));
    } catch (error) {
      const message = extractErrorMessage(error, 'فشل في إنشاء الحساب');
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('avocat_user');
    sessionStorage.removeItem('token');
    void api.post('/api/auth/logout').catch(() => undefined);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};