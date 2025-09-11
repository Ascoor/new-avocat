import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  useSidebar,
} from '@/components/ui/sidebar';
import Topbar from './Topbar';
import { useAuth } from '@/features/auth/hooks';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';
import { Home, Users, FileText, Scale } from 'lucide-react';

const navigation = [
  { to: '/dashboard', icon: Home, label: 'sidebar.dashboard' },
  { to: '/clients', icon: Users, label: 'sidebar.clients' },
  { to: '/cases', icon: FileText, label: 'sidebar.cases' },
];

function AppShell() {
  const { user, isLoading } = useAuth();
  const { t } = useTranslation();
  const { toggleSidebar } = useSidebar();
  const { isRTL } = useLanguage();
  const location = useLocation();

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Scale className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      <Sidebar side={isRTL ? 'right' : 'left'} collapsible="icon">
        <SidebarHeader className="h-16 flex items-center px-4">
          <span className="font-bold text-lg">Avocat</span>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton asChild isActive={location.pathname === item.to}>
                  <NavLink to={item.to} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{t(item.label)}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
      <SidebarInset>
        <Topbar onToggleSidebar={toggleSidebar} />
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}

export default function Layout() {
  return (
    <SidebarProvider>
      <AppShell />
    </SidebarProvider>
  );
}
