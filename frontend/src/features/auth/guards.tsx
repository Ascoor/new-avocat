import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth, useRole } from './hooks';
import BrandedLoader from '../../shared/components/BrandedLoader';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const location = useLocation();

  if (!isInitialized || isLoading) {
    return <BrandedLoader full />;
  }

  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return <Outlet />;
};

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();

  if (!isInitialized || isLoading) {
    return <BrandedLoader full />;
  }

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: string | string[];
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ children, allowedRoles, fallback }) => {
  const { hasRole } = useRole();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <BrandedLoader full />;
  }

  if (!hasRole(allowedRoles)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};

interface PermissionGuardProps {
  children: React.ReactNode;
  permission: string;
  fallback?: React.ReactNode;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({ children, permission, fallback }) => {
  const { hasPermission } = useRole();
  const { isLoading } = useAuth();

  if (isLoading) {
    return <BrandedLoader full />;
  }

  if (!hasPermission(permission)) {
    return (
      fallback || (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-destructive mb-4">Permission Required</h1>
            <p className="text-muted-foreground">You need the "{permission}" permission to access this feature.</p>
          </div>
        </div>
      )
    );
  }

  return <>{children}</>;
};
