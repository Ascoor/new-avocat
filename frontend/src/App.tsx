import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import ProtectedRoute from "@/auth/guards";
import LandingPage from "@/pages/LandingPage";
import LoginPage from "./pages/LoginPage"; 
import Dashboard from "@/pages/DashboardPage";
import DashboardHome from "@/components/dashboard/DashboardHome";
import Cases from "@/components/dashboard/Cases";
import Clients from "@/components/dashboard/Clients";
import Lawyers from "@/components/dashboard/Lawyers";
import NotFound from "@/pages/NotFound";

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
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} /> 
                
                {/* Protected Dashboard Routes */}
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }>
    
                  <Route path="cases" element={<Cases />} />
                  <Route path="clients" element={<Clients />} />
                  <Route path="lawyers" element={<Lawyers />} />
                  <Route path="customer_service" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Customer Service</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="agents" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Client Agents</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="clients_no_agents" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Clients without Agents</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="reports" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Reports</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="sessions" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Sessions</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="procedures" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Legal Procedures</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="services" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Services</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Settings</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="office_settings" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Office Settings</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="users_roles" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Users & Permissions</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="archive" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Archive</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
                  <Route path="courts_search" element={<div className="p-8 text-center"><h2 className="text-2xl font-bold">Courts Search</h2><p className="text-muted-foreground">Coming Soon</p></div>} />
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