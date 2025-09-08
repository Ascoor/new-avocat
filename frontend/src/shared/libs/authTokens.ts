// Utility helpers for managing auth tokens in localStorage and axios

import apiClient from './axios';

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
}

// Persist token and attach to axios default headers
export const setAuthToken = (token: string): void => {
  localStorage.setItem('token', token);
  apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Remove token from storage and axios defaults
export const clearAuthToken = (): void => {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers.common.Authorization;
};

