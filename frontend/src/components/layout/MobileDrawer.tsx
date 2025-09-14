import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { menuItems } from '@/config/menuItems';
import BrandLogo from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileDrawer: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { isMobileOpen, closeMobile } = useSidebar();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) closeMobile();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, closeMobile]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const regularItems = menuItems.filter(item => !item.bottom);
  const bottomItems = menuItems.filter(item => item.bottom);

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          />

          <motion.aside
            initial={{ x: isRTL ? '100%' : '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: isRTL ? '100%' : '-100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className={cn(
              'fixed top-0 z-50 h-full w-80 max-w-[85vw] bg-sidebar border-border md:hidden',
              'flex flex-col shadow-lg',
              isRTL ? 'right-0 border-l' : 'left-0 border-r'
            )}
          >
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <BrandLogo variant="full" className="h-8" />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <nav className="flex-1 flex flex-col p-4">
              <div className="space-y-2">
                {regularItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.key}
                      to={item.path}
                      onClick={closeMobile}
                      className={({ isActive }) => cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        isActive
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground'
                      )}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{t(item.labelKey || item.key)}</span>
                    </NavLink>
                  );
                })}
              </div>

              <div className="flex-1" />

              {bottomItems.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-sidebar-border">
                  {bottomItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.key}
                        to={item.path}
                        onClick={closeMobile}
                        className={({ isActive }) => cn(
                          'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          isActive
                            ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                            : 'text-sidebar-foreground'
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{t(item.labelKey || item.key)}</span>
                      </NavLink>
                    );
                  })}
                </div>
              )}
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
