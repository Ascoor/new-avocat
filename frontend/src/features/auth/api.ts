import apiClient from '../../shared/libs/axios';
import { AuthResponse, setAuthToken, clearAuthToken } from '../../shared/libs/authTokens';

export interface LoginRequest {
  email: string;
  password: string;
  remember?: boolean;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  permissions?: string[];
  createdAt: string;
  updatedAt?: string;
}

// Authentication API calls
export const authApi = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/login', credentials);
    setAuthToken(response.data.access_token);
    return response.data;
  },

  /**
   * Register new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
  },

  /**
   * Get current user profile
   */
  async getProfile(): Promise<User> {
    const response = await apiClient.get('/api/auth/profile');
    return response.data;
  },

  /**
   * Update user profile
   */
  async updateProfile(updates: Partial<User>): Promise<User> {
    const response = await apiClient.put('/api/auth/profile', updates);
    return response.data;
  },

  /**
   * Change password
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }): Promise<void> {
    await apiClient.post('/api/auth/change-password', data);
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<void> {
    await apiClient.post('/api/auth/forgot-password', { email });
  },

  /**
   * Reset password with token
   */
  async resetPassword(data: {
    token: string;
    password: string;
    confirmPassword: string;
  }): Promise<void> {
    await apiClient.post('/api/auth/reset-password', data);
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await apiClient.post('/api/auth/logout');
    clearAuthToken();
  },

  /**
   * Verify authentication status
   */
  async verifyAuth(): Promise<{ user: User; authenticated: boolean }> {
    const response = await apiClient.get('/api/auth/verify');
    return response.data;
  }
};