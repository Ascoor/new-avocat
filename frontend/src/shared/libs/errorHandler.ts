import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  fields?: Record<string, string[]>;
}

export const handleApiError = (error: AxiosError): ApiError => {
  // Network error
  if (!error.response) {
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
      code: 'NETWORK_ERROR'
    };
  }

  const { status, data } = error.response;

  // Handle different status codes
  switch (status) {
    case 400:
      return {
        message: (data as any)?.message || 'Bad request. Please check your input.',
        status,
        code: 'BAD_REQUEST',
        fields: (data as any)?.errors
      };

    case 401:
      return {
        message: 'Authentication required. Please log in.',
        status,
        code: 'UNAUTHORIZED'
      };

    case 403:
      return {
        message: 'Access denied. You do not have permission to perform this action.',
        status,
        code: 'FORBIDDEN'
      };

    case 404:
      return {
        message: 'The requested resource was not found.',
        status,
        code: 'NOT_FOUND'
      };

    case 422:
      return {
        message: 'Validation failed. Please check your input.',
        status,
        code: 'VALIDATION_ERROR',
        fields: (data as any)?.errors
      };

    case 429:
      return {
        message: 'Too many requests. Please try again later.',
        status,
        code: 'RATE_LIMIT'
      };

    case 500:
      return {
        message: 'Internal server error. Please try again later.',
        status,
        code: 'SERVER_ERROR'
      };

    default:
      return {
        message: (data as any)?.message || 'An unexpected error occurred.',
        status,
        code: 'UNKNOWN_ERROR'
      };
  }
};

export const isApiError = (error: any): error is ApiError => {
  return error && typeof error.message === 'string';
};