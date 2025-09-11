import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { SidebarProvider } from '@/contexts/SidebarContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface AppShellProps {
  children?: ReactNode; // optional, can also render <Outlet />
}

const AppShell = ({ children }: AppShellProps) => {
  const { isRTL } = useLanguage();
  return (
    <div className="flex min-h-screen w-full" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <Sidebar className="flex-shrink-0" />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header / topbar */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

// Layout wrapper with SidebarProvider
export default function LayoutWrapper() {
  return (
    <SidebarProvider>
      <AppShell />
    </SidebarProvider>
  );
}
