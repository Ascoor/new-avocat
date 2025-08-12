import axios, { AxiosInstance, AxiosError } from 'axios';
import { handleApiError } from './errorHandler';
import { getAuthToken, clearAuthToken } from './authTokens';

const apiClient: AxiosInstance = axios.create({
  // Default to Laravel's local dev server
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearAuthToken();
      window.location.href = '/login';
    }

    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;
export { apiClient };

