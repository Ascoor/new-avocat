import { User, LoginRequest, RegisterRequest } from './api';
import { AuthState } from './slice';
import { AuthResponse, AuthTokens } from '../../shared/libs/authTokens';

// Re-export types for convenience
export type { User, LoginRequest, RegisterRequest };
export type { AuthState };
export type { AuthResponse, AuthTokens };

// Additional auth-related types
export interface Permission {
  id: string;
  name: string;
  description: string;
  resource: string;
  action: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: Permission[];
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<boolean>;
  register: (userData: RegisterRequest) => Promise<boolean>;
  logout: () => Promise<void>;
  hasRole: (role: string | string[]) => boolean;
  hasPermission: (permission: string) => boolean;
}