import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  BarChart3, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '@/contexts/AppContext';

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  { title: 'home', icon: Home, href: '/' },
  { title: 'analytics', icon: BarChart3, href: '/dashboard-1' },
  { title: 'sales', icon: TrendingUp, href: '/dashboard-2' },
  { title: 'ecommerce', icon: ShoppingCart, href: '/dashboard-3' },
  { title: 'social', icon: Users, href: '/dashboard-4' },
  { title: 'finance', icon: BarChart3, href: '/dashboard-5' },
  { title: 'hr', icon: Users, href: '/dashboard-6' },
  { title: 'project', icon: BarChart3, href: '/dashboard-7' },
  { title: 'inventory', icon: ShoppingCart, href: '/dashboard-8' },
  { title: 'support', icon: Users, href: '/dashboard-9' },
  { title: 'marketing', icon: TrendingUp, href: '/dashboard-10' },
];

interface DashboardSidebarProps {
  variant?: 'fixed' | 'collapsible' | 'overlay';
  theme?: 'ocean' | 'forest' | 'sunset' | 'royal' | 'rose';
  className?: string;
}

export function DashboardSidebar({ 
  variant = 'collapsible', 
  theme = 'ocean',
  className 
}: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useTranslation();
  const { direction } = useAppContext();

  const themeClasses = {
    ocean: 'dashboard-1',
    forest: 'dashboard-2',
    sunset: 'dashboard-3',
    royal: 'dashboard-4',
    rose: 'dashboard-5'
  };

  const sidebarWidth = collapsed ? 'w-16' : 'w-64';

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden fixed top-4 left-4 z-50 bg-background/80 backdrop-blur-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          'fixed top-0 left-0 h-full bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300',
          sidebarWidth,
          themeClasses[theme],
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          direction === 'rtl' && 'left-auto right-0',
          className
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-sidebar-border">
            <div className="flex items-center justify-between">
              {!collapsed && (
                <h2 className="text-lg font-semibold text-sidebar-foreground">
                  {t('dashboardGallery')}
                </h2>
              )}
              {variant === 'collapsible' && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-sidebar-foreground hover:bg-sidebar-accent"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) => cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200',
                  'text-sidebar-foreground hover:bg-sidebar-accent',
                  isActive && 'bg-sidebar-primary text-sidebar-primary-foreground',
                  collapsed && 'justify-center'
                )}
                onClick={() => setMobileOpen(false)}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="font-medium">{t(item.title)}</span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <NavLink
              to="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <Settings className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span className="font-medium">{t('settings', 'Settings')}</span>}
            </NavLink>
          </div>
        </div>
      </aside>

      {/* Content Spacer */}
      <div className={cn('hidden md:block transition-all duration-300', sidebarWidth)} />
    </>
  );
}