import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/contexts/AuthContext';
import FullScreenLoader from '@/components/common/FullScreenLoader';

interface AuthRouteProps {
  children?: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { status } = useAuth();

  if (status === 'loading') {
    return <FullScreenLoader />;
  }

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />;
  }

  if (children) {
    return <>{children}</>;
  }

  return <Outlet />;
};

export default AuthRoute;
