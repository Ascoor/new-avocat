// src/components/layout/Layout.tsx
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Scale } from 'lucide-react';
import Sidebar from './Sidebar';
import  Header  from './Header';
import { useAuth } from '@/features/auth/hooks';

export default function Layout() {
  const { user, isLoading, logout } = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const getInitialLanguage = (): "en" | "ar" => {
  const lang = localStorage.getItem('language');
  return lang === 'ar' ? 'ar' : 'en';
};

const [language, setLanguage] = useState<"en" | "ar">(getInitialLanguage());
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Theme management
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Language management
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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Scale className="w-8 h-8 text-blue-600 animate-pulse" />
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-background ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <SidebarProvider>
        <div className="flex min-h-screen">
<Sidebar 
  language={language}      // <--- add this
  isOpen={sidebarOpen}
  toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
/>



          <main className="flex-1 flex flex-col">
            <Header
              user={user}
              theme={theme}
              toggleTheme={toggleTheme}
              toggleLanguage={toggleLanguage}
              handleLogout={handleLogout}
              onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
            />
            <div className="flex-1 overflow-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </SidebarProvider>
    </div>
  );
}
