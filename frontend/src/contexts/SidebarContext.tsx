import React, { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

const DESKTOP_SIDEBAR_WIDTH = '280px';
const TABLET_SIDEBAR_WIDTH = '220px';
const MOBILE_SIDEBAR_WIDTH = '100%';
const ICON_SIDEBAR_WIDTH = '88px';

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    const saved = window.localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    root.style.setProperty('--sidebar-width-icon', ICON_SIDEBAR_WIDTH);

    const applyResponsiveWidth = () => {
      if (typeof window === 'undefined') return;
      const viewportWidth = window.innerWidth;

      if (viewportWidth < 640) {
        root.style.setProperty('--sidebar-width', MOBILE_SIDEBAR_WIDTH);
      } else if (viewportWidth < 1024) {
        root.style.setProperty('--sidebar-width', TABLET_SIDEBAR_WIDTH);
      } else {
        root.style.setProperty('--sidebar-width', DESKTOP_SIDEBAR_WIDTH);
      }
    };

    applyResponsiveWidth();
    window.addEventListener('resize', applyResponsiveWidth);

    return () => {
      window.removeEventListener('resize', applyResponsiveWidth);
    };
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('sidebar-collapsed', JSON.stringify(isCollapsed));
    }
  }, [isCollapsed]);

  const toggleCollapsed = () => {
    setIsCollapsed(prev => !prev);
  };

  const toggleMobile = () => {
    setIsMobileOpen(prev => !prev);
  };

  const closeMobile = () => {
    setIsMobileOpen(false);
  };

  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileOpen]);

  const value = {
    isCollapsed,
    isMobileOpen,
    toggleCollapsed,
    toggleMobile,
    closeMobile
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};