// src/app/router/index.tsx
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import BrandedLoader from '@/components/common/BrandedLoader';
import Layout from '@/components/layout/Layout';
import { ProtectedRoute, PublicRoute } from '@/features/auth/guards';

// Public pages
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import ForgotPassword from '@/pages/auth/ForgotPassword';
import ResetPassword from '@/pages/auth/ResetPassword';

// Protected pages
const DashboardPage = React.lazy(() => import('@/features/dashboard/DashboardPage'));

const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <BrandedLoader />
  </div>
);

const AppRouter: React.FC = () => (
  <Suspense fallback={<PageLoader />}>
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* 404 page */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-xl font-bold">
            404 - Page Not Found
          </div>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRouter;
