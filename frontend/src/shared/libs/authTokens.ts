// Helper functions for HTTP-only cookie authentication
// Note: Actual token storage is handled server-side via HTTP-only cookies

export interface AuthTokens {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  tokens: AuthTokens;
}

/**
 * Get access token from server API (not from client storage)
 * This ensures tokens are handled securely via HTTP-only cookies
 */
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const response = await fetch('/api/auth/token', {
      credentials: 'include' // Include HTTP-only cookies
    });

    if (response.ok) {
      const data = await response.json();
      return data.access_token || null;
    }
    
    return null;
  } catch (error) {
    console.warn('Failed to get access token:', error);
    return null;
  }
};

/**
 * Refresh access token using HTTP-only refresh token
 */
export const refreshAccessToken = async (): Promise<AuthTokens | null> => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include'
    });

    if (response.ok) {
      const data = await response.json();
      return data.tokens || null;
    }
    
    return null;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return null;
  }
};

/**
 * Check if user is authenticated by verifying token validity
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const response = await fetch('/api/auth/verify', {
      credentials: 'include'
    });
    
    return response.ok;
  } catch (error) {
    return false;
  }
};

/**
 * Logout and clear all authentication tokens
 */
export const logout = async (): Promise<void> => {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
  } catch (error) {
    console.warn('Logout request failed:', error);
  }
};