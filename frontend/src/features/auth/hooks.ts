import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '../../app/store';
import { verifyAuth, loginUser, registerUser, logoutUser } from './slice';
import { LoginRequest, RegisterRequest } from './api';

/**
 * Main auth hook for managing authentication state
 */
export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector((state: RootState) => state.auth);

  const login = async (credentials: LoginRequest) => {
    const result = await dispatch(loginUser(credentials));
    return result.type === 'auth/login/fulfilled';
  };

  const register = async (userData: RegisterRequest) => {
    const result = await dispatch(registerUser(userData));
    return result.type === 'auth/register/fulfilled';
  };

  const logout = async () => {
    await dispatch(logoutUser());
  };

  const checkAuth = async () => {
    await dispatch(verifyAuth());
  };

  return {
    ...auth,
    login,
    register,
    logout,
    checkAuth
  };
};

/**
 * Hook for components that require authentication
 * Automatically redirects to login if not authenticated
 */
export const useRequireAuth = (redirectTo = '/login') => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (auth.isInitialized && !auth.isAuthenticated) {
      const nextUrl = encodeURIComponent(location.pathname + location.search);
      navigate(`${redirectTo}?next=${nextUrl}`, { replace: true });
    }
  }, [auth.isAuthenticated, auth.isInitialized, navigate, redirectTo, location]);

  return auth;
};

/**
 * Hook for role-based access control
 */
export const useRole = () => {
  const { user } = useAuth();

  const hasRole = (requiredRole: string | string[]) => {
    if (!user) return false;

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(user.role);
  };

  const hasPermission = (permission: string) => {
    if (!user || !user.permissions) return false;
    return user.permissions.includes(permission);
  };

  const isAdmin = () => hasRole('admin');
  const isLawyer = () => hasRole(['admin', 'lawyer']);
  const isAssistant = () => hasRole(['admin', 'lawyer', 'assistant']);

  return {
    user,
    hasRole,
    hasPermission,
    isAdmin,
    isLawyer,
    isAssistant
  };
};

/**
 * Hook for authentication initialization
 * Should be called in the app root to verify auth status on load
 */
export const useAuthInit = () => {
  const { checkAuth, isInitialized } = useAuth();

  useEffect(() => {
    if (!isInitialized) {
      checkAuth();
    }
  }, [checkAuth, isInitialized]);

  return { isInitialized };
};