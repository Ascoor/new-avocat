import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  BarChart3,
  Briefcase,
  Calendar,
  ChevronDown,
  ChevronRight,
  Gavel,
  Menu,
  PanelsTopLeft,
  Scale,
  Search,
  Settings,
  Users,
  UserCheck,
  UserMinus,
  UserX,
  Archive,
  FileText,
  Building,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { cn } from '@/lib/utils';

interface MenuItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
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
        { key: 'clients', icon: Users, path: 'clients' },
        { key: 'unclients', icon: UserMinus, path: 'clients/unclients' },
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
      const sectionPath = `/dashboard/${pathSegments.slice(1).join('/')}`;

      const parentItem = menuItems.find(item =>
        item.children?.some(child => {
          const childPath = `/dashboard/${child.path ?? child.key}`;
          return (
            sectionPath === childPath || sectionPath.startsWith(`${childPath}/`)
          );
        })
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
    const itemPath = `/dashboard/${item.path ?? item.key}`;

    const isCurrentActive =
      location.pathname === itemPath || location.pathname.startsWith(`${itemPath}/`);
    const hasActiveChild = hasChildren &&
      item.children?.some(child => {
        const childPath = `/dashboard/${child.path ?? child.key}`;
        return (
          location.pathname === childPath || location.pathname.startsWith(`${childPath}/`)
        );
      });

    return (
      <div key={item.key} className="w-full">
        {hasChildren ? (
          <button
            onClick={() => !isCollapsed && toggleExpanded(item.key)}
            className={cn(
              "sidebar-link flex w-full items-center rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
              hasActiveChild &&
                "bg-sidebar-accent text-sidebar-accent-foreground sidebar-link-active",
              level > 0 && !isCollapsed && (isRTL ? "mr-4" : "ml-4"),
              isCollapsed ? "justify-center gap-0 px-2 py-2.5" : "gap-3 px-3 py-2.5"
            )}
          >
            <IconComponent
              className={cn(
                "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                isCollapsed && "h-6 w-6"
              )}
            />
            <div
              aria-hidden={isCollapsed}
              className={cn(
                "flex-1 overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-out",
                isCollapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-full translate-x-0 opacity-100",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <span className="block truncate">{t(`nav.${item.key}`)}</span>
            </div>
            {expanded ? (
              <ChevronDown
                className={cn(
                  "h-4 w-4 flex-shrink-0 transition-opacity duration-200",
                  isCollapsed && "hidden"
                )}
              />
            ) : (
              <ChevronRight
                className={cn(
                  "h-4 w-4 flex-shrink-0 transition-opacity duration-200",
                  isRTL && "rotate-180",
                  isCollapsed && "hidden"
                )}
              />
            )}
            {isCollapsed && (
              <span className="sr-only">{t(`nav.${item.key}`)}</span>
            )}
          </button>
        ) : (
          <NavLink
            to={itemPath}
            className={({ isActive }) =>
              cn(
                "sidebar-link flex w-full items-center rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
                isActive &&
                  "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant sidebar-link-active",
                level > 0 && !isCollapsed && (isRTL ? "mr-4" : "ml-4"),
                isCollapsed ? "justify-center gap-0 px-2 py-2.5" : "gap-3 px-3 py-2.5"
              )
            }
          >
            <IconComponent
              className={cn(
                "h-5 w-5 flex-shrink-0 transition-transform duration-300",
                isCollapsed && "h-6 w-6"
              )}
            />
            <div
              aria-hidden={isCollapsed}
              className={cn(
                "flex-1 overflow-hidden transition-[max-width,opacity,transform] duration-300 ease-out",
                isCollapsed
                  ? "max-w-0 translate-x-2 opacity-0"
                  : "max-w-full translate-x-0 opacity-100",
                isRTL ? "text-right" : "text-left"
              )}
            >
              <span className="block truncate">{t(`nav.${item.key}`)}</span>
            </div>
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
      data-collapsed={isCollapsed}
      className={cn(
        "group/sidebar fixed top-16 z-40 hidden h-[calc(100vh-4rem)] flex-col border-sidebar-border/70 text-sidebar-foreground transition-[width,transform] duration-300 ease-out lg:flex",
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
        <div className="flex h-14 items-center justify-center border-b border-sidebar-border/70 px-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleCollapsed}
            className={cn(
              "h-9 w-9 rounded-full border border-transparent transition-all duration-300",
              "hover:border-sidebar-border hover:bg-sidebar-accent/60",
              "dark:hover:bg-sidebar-accent/40"
            )}
            aria-expanded={!isCollapsed}
            aria-label={isCollapsed ? t('nav.expand') : t('nav.collapse')}
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <PanelsTopLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-4 custom-scrollbar">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;