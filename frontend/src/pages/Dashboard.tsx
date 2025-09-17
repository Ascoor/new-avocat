import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const Dashboard: React.FC = () => {
  const { isCollapsed } = useSidebar();
  const { isRTL } = useLanguage();

  const sidebarWidth = isCollapsed ? '4.5rem' : '17rem';

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ '--sidebar-width': sidebarWidth } as React.CSSProperties}
    >
      <Header />
      <Sidebar />
      <div
        className={cn(
          'relative flex min-h-[calc(100vh-4rem)] flex-col transition-[margin] duration-300 ease-out',
          isRTL
            ? 'lg:mr-[var(--sidebar-width)]'
            : 'lg:ml-[var(--sidebar-width)]'
        )}
      >
        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
          <div className="mx-auto w-full max-w-6xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;