import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';

import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from './Header';
import { cn } from '@/lib/utils';

interface AppShellProps {
  children?: ReactNode; // optional, can also render <Outlet />
}

const AppShell = ({ children }: AppShellProps) => {
  const { isRTL, direction } = useLanguage();

  return (
    <div className={cn('flex min-h-screen w-full', isRTL ? 'flex-row-reverse' : '')} dir={direction}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header / topbar */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-background p-6">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

// Layout wrapper
export default function LayoutWrapper() {
  return <AppShell />;
}
