import React, { createContext, useContext, useEffect, useState } from 'react';

interface SidebarContextType {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  toggleCollapsed: () => void;
  toggleMobile: () => void;
  closeMobile: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

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