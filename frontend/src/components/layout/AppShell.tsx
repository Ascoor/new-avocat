import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Header } from './Header';
import Sidebar from './Sidebar';
import { useSidebar } from '@/contexts/SidebarContext';
import { useIsMobile } from '@/hooks/use-mobile';

interface AppShellProps {
  children: React.ReactNode;
  title?: string;
}

const AppShell: React.FC<AppShellProps> = ({ children, title }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const isMobile = useIsMobile();
  const { isCollapsed, toggleCollapsed, isMobileOpen, toggleMobile } = useSidebar();

  const sidebarCollapsed = isMobile ? !isMobileOpen : isCollapsed;
  const handleSidebarToggle = isMobile ? toggleMobile : toggleCollapsed;

  const desktopSpacingClass = isMobile
    ? ''
    : isRTL
        ? isCollapsed
          ? 'md:pr-16'
          : 'md:pr-64'
        : isCollapsed
          ? 'md:pl-16'
          : 'md:pl-64';

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4"    dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="w-full max-w-md space-y-6">
    
 
        <Sidebar isCollapsed={sidebarCollapsed} onToggle={handleSidebarToggle} />

        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${desktopSpacingClass}`}>
          <Header title={title} />

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
    </div>
  );
};

export default AppShell;
