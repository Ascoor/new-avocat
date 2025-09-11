import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/sidebar/Sidebar';
 
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from './Header';

interface AppShellProps {
  children?: ReactNode; // optional, can also render <Outlet />
}

const AppShell = ({ children }: AppShellProps) => {
  const { direction } = useLanguage();  // Use language context to check for RTL
 
  return (
    <div className="flex min-h-screen w-full" dir={direction}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        {/* Header / topbar */}
        <Header />

        {/* Page content */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6 dark:bg-gray-900">
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
};

// Layout wrapper
export default function LayoutWrapper() {
  return <AppShell />;
}
