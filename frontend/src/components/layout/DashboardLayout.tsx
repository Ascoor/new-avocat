import React, { useState, useEffect, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, FileText } from 'lucide-react';
import Header from './Header';
import { useTranslation } from 'react-i18next';

interface DashboardLayoutProps {
  children: ReactNode;
}

const menuItems = [
  { to: '/', icon: Home, label: 'sidebar.dashboard' },
  { to: '/clients', icon: Users, label: 'sidebar.clients' },
  { to: '/cases', icon: FileText, label: 'sidebar.cases' },
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { t } = useTranslation();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed');
    setCollapsed(stored === 'true');
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => {
      localStorage.setItem('sidebar-collapsed', String(!prev));
      return !prev;
    });
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
 
        <main className="flex-1 overflow-auto p-4">{children}</main>
 
    </div>
  );
};

export default DashboardLayout;
