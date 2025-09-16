import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import API_CONFIG from '@/config/config';

const api: AxiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Interceptor: Attach token to every request
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = sessionStorage.getItem('token');
    if (token) {
      const parsedToken = JSON.parse(token) as string;
      if (parsedToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${parsedToken}`,
        } as typeof config.headers;
      }
    }
  } catch (err) {
    console.error('Error parsing token from sessionStorage', err);
  }

  return config;
});

export default api;
