import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { handleApiError } from './errorHandler';

// Create axios instance with base configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/v1',
  withCredentials: true, // Enable cookies for HTTP-only auth
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
});

// Request interceptor - Add auth token if available
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get access token from API endpoint (not from storage)
      const tokenResponse = await fetch('/api/auth/token', {
        credentials: 'include'
      });
      
      if (tokenResponse.ok) {
        const { access_token } = await tokenResponse.json();
        if (access_token) {
          config.headers.Authorization = `Bearer ${access_token}`;
        }
      }
    } catch (error) {
      console.warn('Failed to get access token:', error);
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle token refresh and errors
let isRefreshing = false;
let refreshSubscribers: Array<(token: string) => void> = [];

const subscribeTokenRefresh = (cb: (token: string) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string) => {
  refreshSubscribers.map(cb => cb(token));
  refreshSubscribers = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for refresh to complete
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Attempt token refresh
        const refreshResponse = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include'
        });

        if (refreshResponse.ok) {
          const { access_token } = await refreshResponse.json();
          
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          
          onRefreshed(access_token);
          isRefreshing = false;
          
          return apiClient(originalRequest);
        } else {
          // Refresh failed - redirect to login
          window.location.href = '/login';
        }
      } catch (refreshError) {
        // Refresh failed - redirect to login
        window.location.href = '/login';
      } finally {
        isRefreshing = false;
      }
    }

    // Handle and format error
    const formattedError = handleApiError(error);
    return Promise.reject(formattedError);
  }
);

export default apiClient;
export { apiClient };