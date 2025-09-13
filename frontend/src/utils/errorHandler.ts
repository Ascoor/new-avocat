import { AxiosError } from 'axios';

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  fields?: Record<string, string[]>;
}

interface ErrorData {
  message?: string;
  errors?: Record<string, string[]>;
  [key: string]: unknown;
}

export const handleApiError = (error: AxiosError<ErrorData>): ApiError => {
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
        message: data?.message || 'Bad request. Please check your input.',
        status,
        code: 'BAD_REQUEST',
        fields: data?.errors
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
        fields: data?.errors
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
        message: data?.message || 'An unexpected error occurred.',
        status,
        code: 'UNKNOWN_ERROR'
      };
  }
};

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message: unknown }).message === 'string'
  );
};