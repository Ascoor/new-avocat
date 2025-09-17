import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Gavel,
  Users,
  UserCheck,
  UserX,
  Scale,
  FileText,
  Calendar,
  Briefcase,
  Settings,
  Building,
  Shield,
  Archive,
  Search,
  BarChart3,
  Menu,
  PanelsTopLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface MenuItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
      key: 'cases',
      icon: Gavel,
    },
    {
      key: 'customer_service',
      icon: Users,
      children: [
        { key: 'clients', icon: Users },
        { key: 'agents', icon: UserCheck },
        { key: 'clients_no_agents', icon: UserX },
      ],
    },
    {
      key: 'lawyers',
      icon: Scale,
    },
    {
      key: 'reports',
      icon: BarChart3,
      children: [
        { key: 'sessions', icon: Calendar },
        { key: 'procedures', icon: FileText },
        { key: 'services', icon: Briefcase },
      ],
    },
    {
      key: 'settings',
      icon: Settings,
      children: [
        { key: 'office_settings', icon: Building },
        { key: 'users_roles', icon: Shield },
      ],
    },
    {
      key: 'archive',
      icon: Archive,
    },
    {
      key: 'courts_search',
      icon: Search,
    },
  ];

const Sidebar: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const { isCollapsed, toggleCollapsed } = useSidebar();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  // Auto-expand parent items based on current route
  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length >= 2) {
      const section = pathSegments[1]; // /dashboard/[section]

      // Find parent menu item for current route
      const parentItem = menuItems.find(item =>
        item.children?.some(child => String(child.key) === section)
      );

      if (parentItem && !expandedItems.includes(parentItem.key)) {
        setExpandedItems(prev => [...prev, parentItem.key]);
      }
    }
  }, [location.pathname, expandedItems]);

  const toggleExpanded = (key: string) => {
    setExpandedItems(prev =>
      prev.includes(key)
        ? prev.filter(item => item !== key)
        : [...prev, key]
    );
  };

  const isExpanded = (key: string) => expandedItems.includes(key);

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const expanded = isExpanded(item.key);
    const IconComponent = item.icon;

    // Check if current item or any child is active
    const isCurrentActive = location.pathname === `/dashboard/${item.key}`;
    const hasActiveChild = hasChildren && item.children?.some(
      child => location.pathname === `/dashboard/${child.key}`
    );

    return (
      <div key={item.key} className="w-full">
        {hasChildren ? (
          <button
            onClick={() => !isCollapsed && toggleExpanded(item.key)}
            className={cn(
              "sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
              hasActiveChild &&
                "bg-sidebar-accent text-sidebar-accent-foreground sidebar-link-active",
              level > 0 && !isCollapsed && (isRTL ? "mr-4" : "ml-4"),
              isCollapsed && "justify-center px-2"
            )}
          >
            <IconComponent className={cn(
              "h-5 w-5 flex-shrink-0",
              isCollapsed && "h-6 w-6"
            )} />
            {!isCollapsed && (
              <>
                <span className={cn(
                  "flex-1 truncate",
                  isRTL ? "text-right" : "text-left"
                )}>
                  {t(`nav.${item.key}`)}
                </span>
                {expanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className={cn(
                    "h-4 w-4 flex-shrink-0",
                    isRTL && "rotate-180"
                  )} />
                )}
              </>
            )}
            {isCollapsed && (
              <span className="sr-only">{t(`nav.${item.key}`)}</span>
            )}
          </button>
        ) : (
          <NavLink
            to={`/dashboard/${item.key}`}
            className={({ isActive }) =>
              cn(
                "sidebar-link w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
                isActive &&
                  "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant sidebar-link-active",
                level > 0 && !isCollapsed && (isRTL ? "mr-4" : "ml-4"),
                isCollapsed && "justify-center px-2"
              )
            }
          >
            <IconComponent className={cn(
              "h-5 w-5 flex-shrink-0",
              isCollapsed && "h-6 w-6"
            )} />
            {!isCollapsed && (
              <span className={cn(
                "flex-1 truncate",
                isRTL ? "text-right" : "text-left"
              )}>
                {t(`nav.${item.key}`)}
              </span>
            )}
            {isCollapsed && (
              <span className="sr-only">{t(`nav.${item.key}`)}</span>
            )}
          </NavLink>
        )}

        {hasChildren && expanded && !isCollapsed && (
          <div className="mt-1 space-y-1 animate-accordion-down">
            {item.children?.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "fixed top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-sidebar-border/70 text-sidebar-foreground transition-all duration-300 ease-out lg:flex",
        "glass shadow-elegant backdrop-blur-xl",
        "bg-[hsl(var(--sidebar-background)/0.92)] dark:bg-[hsl(var(--sidebar-background)/0.85)]",
        isCollapsed ? "w-[4.5rem]" : "w-[17rem]",
        isRTL ? "right-0 border-l" : "left-0 border-r"
      )}
      style={{
        direction: isRTL ? 'rtl' : 'ltr',
        '--glass-surface': 'var(--gradient-sidebar)'
      } as React.CSSProperties}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex h-14 items-center border-b border-sidebar-border/70 px-3",
            isCollapsed ? "justify-center" : "justify-between"
          )}
        >
          {!isCollapsed && (
            <h2 className="text-base font-semibold tracking-wide text-sidebar-foreground/90">
              {t('nav.dashboard')}
            </h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn(
              "h-8 w-8 rounded-full border border-transparent transition-colors",
              "hover:border-sidebar-border hover:bg-sidebar-accent/60",
              "dark:hover:bg-sidebar-accent/40"
            )}
            aria-label={isCollapsed ? t('nav.expand') : t('nav.collapse')}
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <PanelsTopLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-2 custom-scrollbar">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;