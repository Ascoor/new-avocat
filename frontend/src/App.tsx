import type { FC } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import AdminRoute from '@/components/AdminRoute';
import { useLanguage } from '@/contexts/LanguageContext';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import DashboardHome from '@/pages/dashboard/DashboardAfterAuth';
import LegalCasesPage from '@/pages/LegalCasesPage';
import LegalCaseDetails from '@/components/legalCases/Details/LegalCaseDetails';
import ClientsPage from '@/pages/ClientsPage';
import UnClientsPage from '@/pages/UnClientsPage';
import { LawyersList, LawyerDetails } from '@/pages/LawyersPage';
import ServicesPage from '@/pages/ServicesPage';
import ServiceDetails from '@/components/services/ServiceDetails';
import OfficeSettingsPage from '@/pages/OfficeSettingsPage';
import NotFound from '@/pages/NotFound';
import AdminWebsitePage from '@/pages/admin/Website/AdminWebsitePage';
import WebsiteReportPage from '@/pages/admin/Website/WebsiteReportPage';
import WorkflowBoardPage from '@/pages/admin/Website/WorkflowBoardPage';
import ActivityLogPage from '@/pages/admin/Website/ActivityLogPage';
import NotificationsPage from '@/pages/admin/Website/NotificationsPage';
import { shellContainer } from '@/components/layout/layout-classes';
import { cn } from '@/lib/utils';

// 🌀 نوع الأقسام المستقبلية
type DashboardSectionKey =
  | 'sessions'
  | 'procedures'
  | 'reports'
  | 'settings'
  | 'office_settings'
  | 'users_roles'
  | 'archive'
  | 'courts_search';

// 📌 Placeholder للأقسام تحت التطوير
const DashboardPlaceholder: FC<{ sectionKey: DashboardSectionKey }> = ({ sectionKey }) => {
  const { t } = useLanguage();
  return (
    <div className={cn(shellContainer, "px-4 sm:px-6 lg:px-10")}>
      <div className="flex min-h-[65vh] items-center justify-center py-10">
        <div className="w-full max-w-2xl rounded-2xl border border-border/80 bg-surface-raised/80 p-10 text-center shadow-card">
          <h2 className="text-2xl font-semibold text-foreground">
            {t(`dashboard.sections.${sectionKey}`)}
          </h2>
          <p className="mt-3 text-base text-muted-foreground">{t("dashboard.coming_soon")}</p>
        </div>
      </div>
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      {/* 🌍 Public */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* 🔒 Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* 🏠 Main */}
        <Route index element={<DashboardHome />} />

        {/* ⚖️ Legal Cases */}
        <Route path="cases" element={<LegalCasesPage />} />
        <Route path="cases/:id" element={<LegalCaseDetails />} />

        {/* 👥 Clients */}
        <Route path="clients" element={<ClientsPage />} />
        <Route path="unClients" element={<UnClientsPage />} />

        {/* ⚖️ Lawyers */}
        <Route path="lawyers" element={<LawyersList />} />
        <Route path="lawyers/:id" element={<LawyerDetails />} />

        {/* 🛠️ Services & Settings */}
        <Route path="services" element={<ServicesPage />} />
        <Route path="services/:id" element={<ServiceDetails />} />
        <Route path="office_settings" element={<OfficeSettingsPage />} />

        {/* 🌐 Website Management */}
        <Route path="website" element={<AdminRoute />}>
          <Route index element={<Navigate to="pages" replace />} />
          <Route path="report" element={<WebsiteReportPage />} />
          <Route path="workflow" element={<WorkflowBoardPage />} />
          <Route path="activity" element={<ActivityLogPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path=":section" element={<AdminWebsitePage />} />
        </Route>

        {/* ⏳ Coming Soon */}
        <Route path="sessions" element={<DashboardPlaceholder sectionKey="sessions" />} />
        <Route path="procedures" element={<DashboardPlaceholder sectionKey="procedures" />} />
        <Route path="reports" element={<DashboardPlaceholder sectionKey="reports" />} />
        <Route path="settings" element={<DashboardPlaceholder sectionKey="settings" />} />
        <Route path="users_roles" element={<DashboardPlaceholder sectionKey="users_roles" />} />
        <Route path="archive" element={<DashboardPlaceholder sectionKey="archive" />} />
        <Route path="courts_search" element={<DashboardPlaceholder sectionKey="courts_search" />} />
      </Route>

      {/* ❌ 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>,
  ),
  {
    future: { 
      v7_relativeSplatPath: false,
    },
  },
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
