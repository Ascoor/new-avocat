import axios, { AxiosInstance, AxiosError } from 'axios';
import { handleApiError } from './errorHandler';

const apiClient: AxiosInstance = axios.create({
  // Default to Laravel's local dev server
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

const getToken = () => localStorage.getItem('token');
const clearToken = () => {
  localStorage.removeItem('token');
  delete apiClient.defaults.headers.common.Authorization;
};

apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      clearToken();
    }

    return Promise.reject(handleApiError(error));
  }
);

export default apiClient;
export { apiClient };

