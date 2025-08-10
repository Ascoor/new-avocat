import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute, PublicRoute, RoleGuard } from '../../features/auth/guards';
import BrandedLoader from '../../shared/components/BrandedLoader';
import Layout from '../../shared/components/Layout';

// Public pages
import LandingPage from '../../pages/LandingPage';
import LoginPage from '../../pages/LoginPage';
import RegisterPage from '../../pages/RegisterPage';

// Protected pages
const Dashboard = React.lazy(() => import('../../pages/Dashboard'));
const ClientsPage = React.lazy(() => import('../../features/clients/containers/ClientsPage'));
const LegalCasesPage = React.lazy(() => import('../../pages/Cases'));
const LegalCaseDetails = React.lazy(() => import('../../pages/CaseDashboard'));
const SessionsPage = React.lazy(() => import('../../pages/Sessions'));
const CourtsPage = React.lazy(() => import('../../pages/Courts'));
const ReportsPage = React.lazy(() => import('../../pages/Reports'));
const FinancialPage = React.lazy(() => import('../../pages/Financial'));
const SettingsPage = React.lazy(() => import('../../pages/Settings'));

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
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/legal-cases" element={<LegalCasesPage />} />
          <Route path="/legal-cases/:id" element={<LegalCaseDetails />} />
          <Route path="/sessions" element={<SessionsPage />} />
          <Route path="/courts" element={<CourtsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/financial" element={<RoleGuard allowedRoles={['admin', 'lawyer']}><FinancialPage /></RoleGuard>} />
          <Route path="/settings" element={<RoleGuard allowedRoles="admin"><SettingsPage /></RoleGuard>} />
        </Route>
      </Route>

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
              <p className="text-muted-foreground mb-4">Page not found</p>
              <a href="/" className="text-primary hover:underline">Go back home</a>
            </div>
          </div>
        }
      />
    </Routes>
  </Suspense>
);

export default AppRouter;
