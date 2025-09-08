import axios from 'axios';
import apiClient from '../../services/apiClient';

export interface LoginRequest {
  email: string;
  password: string;
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
  name: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  user: User;
}

export interface ForgotPasswordRequest {
  email: string;
}

export interface ResetPasswordRequest {
  token: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    const { data } = await apiClient.post('/auth/login', credentials);
    return data;
  },

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    const payload = {
      name: `${userData.firstName} ${userData.lastName}`.trim(),
      email: userData.email,
      password: userData.password,
      password_confirmation: userData.confirmPassword,
      role: userData.role,
    };
    const { data } = await apiClient.post('/auth/register', payload);
    return data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout');
  },

  async profile(): Promise<User> {
    const { data } = await apiClient.get('/auth/profile');
    return data;
  },

  async verifyAuth(): Promise<{ user: User; authenticated: boolean }> {
    const { data } = await apiClient.get('/auth/verify');
    return data;
  },

  async requestPasswordReset(payload: ForgotPasswordRequest): Promise<void> {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    await apiClient.post('/auth/forgot-password', payload);
  },

  async resetPassword(payload: ResetPasswordRequest): Promise<void> {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
      withCredentials: true,
    });
    const data = {
      token: payload.token,
      email: payload.email,
      password: payload.password,
      password_confirmation: payload.confirmPassword,
    };
    await apiClient.post('/auth/reset-password', data);
  },
};
