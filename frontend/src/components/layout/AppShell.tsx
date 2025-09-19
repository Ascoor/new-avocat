import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from './Header';
import Sidebar from './Sidebar';
import MobileDrawer from './MobileDrawer';
import { useSidebar } from '@/contexts/SidebarContext';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const { isCollapsed, toggleCollapsed } = useSidebar();

  const desktopSpacingClass = isRTL
    ? isCollapsed
      ? 'md:pr-16'
      : 'md:pr-64'
    : isCollapsed
      ? 'md:pl-16'
      : 'md:pl-64';

  return (
    <div 
      className="min-h-screen bg-background text-foreground"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* Desktop Layout */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="hidden md:block">
          <Sidebar isCollapsed={isCollapsed} onToggle={toggleCollapsed} />
        </div>

        {/* Main Content */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${desktopSpacingClass}`}>
          {/* Header */}
          <Header title={title} />

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.2,
                ease: 'easeOut'
              }}
              className="p-6"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer />
    </div>
  );
};

export default AppShell;
