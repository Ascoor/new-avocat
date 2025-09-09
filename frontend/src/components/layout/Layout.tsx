import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Scale } from 'lucide-react';
import { useAuth } from '@/features/auth/hooks';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const { user, isLoading, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');

  // Theme
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Language
  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const toggleLanguage = () => setLanguage(language === 'en' ? 'ar' : 'en');
  const handleLogout = () => {
    logout();
  };

  // Public pages
  if (location.pathname === '/') {
    return <div>{children}</div>;
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Scale className="w-8 h-8 text-blue-600 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen">
          <Sidebar language={language} />
          <main className="flex-1 flex flex-col">
            <Header
              user={user}
              language={language}
              theme={theme}
              toggleTheme={toggleTheme}
              toggleLanguage={toggleLanguage}
              handleLogout={handleLogout}
            />
            <div className="flex-1 overflow-auto">{children}</div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
