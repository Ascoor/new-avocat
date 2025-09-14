import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { SidebarProvider } from "@/contexts/SidebarContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ProtectedRoute, PublicRoute } from "@/auth/guards";
import Layout from "@/components/layout/Layout";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "./pages/LoginPage"; 
import Dashboard from "@/pages/DashboardPage";
import DashboardHome from "@/components/dashboard/DashboardHome";
import Cases from "@/components/dashboard/Cases";
import ClientsAndUnclients from "@/pages/ClientsAndUnclients";
import ClientsPage from "@/pages/ClientsPage";
import UnclientsPage from "@/pages/UnclientsPage";
import ClientDetailsPage from "@/pages/ClientDetailsPage";
import Lawyers from "@/components/dashboard/Lawyers";
import NotFound from "@/pages/NotFound";
import { menuItems } from "@/config/menuItems";
import generateDemoRoutes from "@/app/router/generateDemoRoutes";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <SidebarProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public */}
                <Route path="/" element={<LandingPage />} />
                <Route element={<PublicRoute />}>
                  <Route path="/login" element={<LoginPage />} />
                </Route>

                {/* Protected + App Layout (Header + Sidebar) */}
                <Route element={<ProtectedRoute />}>
                  <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardHome />} />
                    <Route path="/cases" element={<Cases />} />
                    <Route path="/clients" element={<ClientsAndUnclients />} >
                      <Route index element={<ClientsPage />} />
                      <Route path="authorized" element={<ClientsPage />} />
                      <Route path="authorized/:id" element={<ClientDetailsPage />} />
                      <Route path="unauthorized" element={<UnclientsPage />} />
                    </Route>
                    <Route path="/lawyers" element={<Lawyers />} />
                    {/* Stubs */}
                    <Route path="/customer_service" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Customer Service</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/agents" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Client Agents</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/clients_no_agents" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Clients without Agents</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/reports" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Reports</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/sessions" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Sessions</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/procedures" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Legal Procedures</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/services" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Services</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Settings</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/office_settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Office Settings</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/users_roles" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Users & Permissions</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/archive" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Archive</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    <Route path="/courts_search" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Courts Search</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                    {generateDemoRoutes(
                      menuItems,
                      new Set([
                        '/dashboard',
                        '/cases',
                        '/clients',
                        '/lawyers',
                        '/customer_service',
                        '/agents',
                        '/clients_no_agents',
                        '/reports',
                        '/sessions',
                        '/procedures',
                        '/services',
                        '/settings',
                        '/office_settings',
                        '/users_roles',
                        '/archive',
                        '/courts_search',
                      ])
                    )}
                  </Route>
                </Route>

                {/* 404 */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
        </SidebarProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
