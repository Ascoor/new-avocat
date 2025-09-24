import type { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useLanguage } from '@/contexts/LanguageContext';

// Pages
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import Dashboard from '@/pages/Dashboard';
import DashboardHome from '@/pages/dashboard/DashboardHome';
import LegalCasesPage from '@/pages/LegalCasesPage';
import LegalCaseDetails from '@/components/legalCases/Details/LegalCaseDetails';
import ClientsPage from '@/pages/ClientsPage';
import UnClientsPage from '@/pages/UnClientsPage';
import { LawyersList, LawyerDetails } from '@/pages/LawyersPage';
import ServicesPage from '@/pages/ServicesPage';
import OfficeSettingsPage from '@/pages/OfficeSettingsPage';
import NotFound from '@/pages/NotFound';

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
    <div className="p-8 text-center space-y-2">
      <h2 className="text-2xl font-bold text-foreground">
        {t(`dashboard.sections.${sectionKey}`)}
      </h2>
      <p className="text-muted-foreground">{t('dashboard.coming_soon')}</p>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
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
          <Route path="office_settings" element={<OfficeSettingsPage />} />

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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
