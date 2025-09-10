import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  Home, 
  Users, 
  Scale, 
  Calendar, 
  Building, 
  FileText, 
  DollarSign, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useSidebar } from '../hooks/useSidebar';
import { useAuth } from '../../features/auth/hooks';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { BrandLogo } from '@/components/common/BrandLogo';

const navigationItems = [
  { key: 'dashboard', href: '/dashboard', icon: Home },
  { key: 'clients', href: '/clients', icon: Users },
  { key: 'cases', href: '/legal-cases', icon: Scale },
  { key: 'sessions', href: '/sessions', icon: Calendar },
  { key: 'courts', href: '/courts', icon: Building },
  { key: 'reports', href: '/reports', icon: FileText },
  { key: 'financial', href: '/financial', icon: DollarSign, roles: ['admin', 'lawyer'] },
  { key: 'settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

export const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebar();
  const { user } = useAuth();
  const { t } = useTranslation();

  const filteredItems = navigationItems.filter(item => {
    if (!item.roles) return true;
    return item.roles.includes(user?.role || '');
  });

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-card border-r border-border z-50 transition-all duration-300
        ${isOpen ? 'w-64' : 'w-16'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <BrandLogo variant={isOpen ? 'full' : 'icon'} className={isOpen ? 'h-8' : 'h-8 mx-auto'} />
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {isOpen && <LanguageToggle />}
            {isOpen && <ThemeToggle />}
            <button
              onClick={toggle}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {filteredItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) => `
                    flex items-center px-3 py-2 rounded-lg transition-colors
                    ${isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    }
                  `}
                >
                  <item.icon size={20} />
                  {isOpen && (
                    <span className="ml-3 font-medium">{t(`sidebar.${item.key}`)}</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* User info */}
        {isOpen && user && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border">
            <div className="text-sm">
              <p className="font-medium text-foreground">{user.firstName} {user.lastName}</p>
              <p className="text-muted-foreground">{user.role}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};