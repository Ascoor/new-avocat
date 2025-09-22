import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';

const Dashboard: React.FC = () => {
  const { isCollapsed, toggleCollapsed, isMobileOpen, toggleMobile } = useSidebar();
  const isMobile = useIsMobile();

  const sidebarCollapsed = isMobile ? !isMobileOpen : isCollapsed;
  const handleSidebarToggle = isMobile ? toggleMobile : toggleCollapsed;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;