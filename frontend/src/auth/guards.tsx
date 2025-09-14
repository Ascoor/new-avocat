import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BrandedLoader from "@/components/common/BrandedLoader";

interface ProtectedRouteProps {
  children?: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <BrandedLoader full />;
  }

  if (!isAuthenticated) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  // لو فيه children يستخدمه، لو مفيش يعرض Outlet
  return <>{children || <Outlet />}</>;
};

// PublicRoute: blocks access to auth-only pages when authenticated
export const PublicRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <BrandedLoader full />;
  }

  if (isAuthenticated) {
    // If already logged in, redirect away from public auth pages
    const next = new URLSearchParams(location.search).get('next') || '/dashboard';
    return <Navigate to={next} replace />;
  }

  return <>{children || <Outlet />}</>;
};
