import React from 'react';
import { NavLink } from 'react-router-dom';
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

const navigationItems = [
  { name: 'Dashboard', href: '/dashboard', icon: Home },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Legal Cases', href: '/legal-cases', icon: Scale },
  { name: 'Sessions', href: '/sessions', icon: Calendar },
  { name: 'Courts', href: '/courts', icon: Building },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Financial', href: '/financial', icon: DollarSign, roles: ['admin', 'lawyer'] },
  { name: 'Settings', href: '/settings', icon: Settings, roles: ['admin'] },
];

export const Sidebar: React.FC = () => {
  const { isOpen, toggle } = useSidebar();
  const { user } = useAuth();

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
          {isOpen && (
            <h1 className="font-bold text-lg text-foreground">Legal System</h1>
          )}
          <button
            onClick={toggle}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {filteredItems.map((item) => (
              <li key={item.name}>
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
                    <span className="ml-3 font-medium">{item.name}</span>
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