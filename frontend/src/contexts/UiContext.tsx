import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

interface UiContextValue {
  theme: Theme;
  toggleTheme: () => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

const UiContext = createContext<UiContextValue | undefined>(undefined);

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const [sidebarOpen, setSidebarOpen] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('sidebarOpen') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', String(sidebarOpen));
  }, [sidebarOpen]);

  const toggleTheme = () => setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  const toggleSidebar = () => setSidebarOpen(o => !o);
  const closeSidebar = () => setSidebarOpen(false);

  const value: UiContextValue = { theme, toggleTheme, sidebarOpen, toggleSidebar, closeSidebar };

  return <UiContext.Provider value={value}>{children}</UiContext.Provider>;
};

export const useUi = () => {
  const context = useContext(UiContext);
  if (!context) {
    throw new Error('useUi must be used within a UiProvider');
  }
  return context;
};
