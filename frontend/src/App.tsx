import type { FC } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider, useLanguage } from "./contexts/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import DashboardHome from "./pages/dashboard/DashboardHome";
import LegalCases from "@/pages/LegalCasesPage";
import LegalCaseDetails from "@/components/legalCases/Details/LegalCaseDetails";
import Clients from "./pages/dashboard/StatsCards";
import { LawyersList, LawyerDetails } from "@/pages/LawyersPage";
import NotFound from "./pages/NotFound";
import ServicesPage from "./pages/ServicesPage";
import ClientPage from "./pages/ClientsPage";
import UnClientPage from "./pages/UnClientsPage";

type DashboardSectionKey =
 
  | 'reports'
 
  | 'settings'
  | 'office_settings'
  | 'users_roles'
  | 'archive'
  | 'courts_search';

const DashboardPlaceholder: FC<{ sectionKey: DashboardSectionKey }> = ({ sectionKey }) => {
  const { t } = useLanguage();

  return (
    <div className="p-8 text-center space-y-2">
      <h2 className="text-2xl font-bold text-foreground">{t(`dashboard.sections.${sectionKey}`)}</h2>
      <p className="text-muted-foreground">{t('dashboard.coming_soon')}</p>
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>
                  <Route index element={<DashboardHome />} />
                  <Route path="cases" element={<LegalCases />} />
                  <Route path="cases/:id" element={<LegalCaseDetails />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="lawyers" element={<LawyersList />} />
                  <Route path="lawyers/:id" element={<LawyerDetails />} />
                    <Route path="clients" element={<ClientPage />} />
                  <Route path="unClients" element={<UnClientPage  />} />
                  <Route path="reports" element={<DashboardPlaceholder sectionKey="reports" />} />
  <Route path="services" element={<ServicesPage />} />
                  <Route path="settings" element={<DashboardPlaceholder sectionKey="settings" />} />
                  <Route path="office_settings" element={<DashboardPlaceholder sectionKey="office_settings" />} />
                  <Route path="users_roles" element={<DashboardPlaceholder sectionKey="users_roles" />} />
                  <Route path="archive" element={<DashboardPlaceholder sectionKey="archive" />} />
                  <Route path="courts_search" element={<DashboardPlaceholder sectionKey="courts_search" />} />
                </Route>

                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
