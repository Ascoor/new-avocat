import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSidebar } from '@/contexts/SidebarContext';
import { menuItems } from '@/config/sidebar';
import BrandLogo from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MobileDrawer: React.FC = () => {
  const { t, i18n } = useTranslation('common');
  const { isMobileOpen, closeMobile } = useSidebar();
  const location = useLocation();
  const isRTL = i18n.language === 'ar';

  // Close drawer on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileOpen) {
        closeMobile();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileOpen, closeMobile]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-5 w-5" /> : null;
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const regularItems = menuItems.filter(item => !item.bottom);
  const bottomItems = menuItems.filter(item => item.bottom);

  return (
    <AnimatePresence>
      {isMobileOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobile}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ 
              x: isRTL ? '100%' : '-100%',
              opacity: 0 
            }}
            animate={{ 
              x: 0,
              opacity: 1 
            }}
            exit={{ 
              x: isRTL ? '100%' : '-100%',
              opacity: 0 
            }}
            transition={{ 
              type: 'spring',
              damping: 25,
              stiffness: 200 
            }}
            className={cn(
              'fixed top-0 z-50 h-full w-80 max-w-[85vw] glass border border-sidebar-border text-sidebar-foreground md:hidden',
              'flex flex-col shadow-elegant',
              isRTL ? 'right-0 border-l' : 'left-0 border-r'
            )}
            style={{ '--glass-surface': 'var(--gradient-sidebar)' } as React.CSSProperties}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
              <BrandLogo variant="full" className="h-8" />
              <Button
                variant="ghost"
                size="icon"
                onClick={closeMobile}
                className="h-8 w-8"
                aria-label={t('common.close')}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 flex flex-col p-4">
              {/* Regular menu items */}
              <div className="space-y-2">
                {regularItems.map((item) => (
                  <NavLink
                    key={item.key}
                    to={item.to}
                    onClick={closeMobile}
                    className={({ isActive: navIsActive }) => cn(
                      'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                      'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                      navIsActive || isActive(item.to)
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground'
                    )}
                  >
                    {getIcon(item.icon)}
                    <span>{t(item.labelKey)}</span>
                  </NavLink>
                ))}
              </div>

              {/* Spacer */}
              <div className="flex-1" />

              {/* Bottom menu items */}
              {bottomItems.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-sidebar-border">
                  {bottomItems.map((item) => (
                    <NavLink
                      key={item.key}
                      to={item.to}
                      onClick={closeMobile}
                      className={({ isActive: navIsActive }) => cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
                        navIsActive || isActive(item.to)
                          ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                          : 'text-sidebar-foreground'
                      )}
                    >
                      {getIcon(item.icon)}
                      <span>{t(item.labelKey)}</span>
                    </NavLink>
                  ))}
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
