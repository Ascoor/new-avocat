import React, { createContext, useContext } from 'react';
import { useAuthState } from '@/auth/hooks';

// Context type is derived from the auth hook return type
export type AuthContextType = ReturnType<typeof useAuthState>;

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthState();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

