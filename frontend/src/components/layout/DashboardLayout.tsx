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
      <aside
        className={`transition-all duration-300 bg-sidebar text-sidebar-foreground ${
          collapsed ? 'w-16' : 'w-64'
        }`}
      >
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center gap-3 p-2 rounded hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="h-5 w-5" />
              {!collapsed && <span>{t(item.label)}</span>}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="flex flex-1 flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-auto p-4">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
