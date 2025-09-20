import React, { useState, useEffect, useMemo, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  ChevronDown,
  ChevronRight,
  Gavel,
  Users,
  UserCheck,
  UserX,
  Scale,
  Calendar,
  Briefcase,
  Settings,
  Building,
  Shield,
  Archive,
  Search,
  BarChart3,
  Cookie,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const menuItems: MenuItem[] = useMemo(
    () => [
      {
        key: 'cases',
        icon: Gavel,
        path: 'cases',
      },
      {
        key: 'lawyers',
        icon: Scale,
        path: 'lawyers',
      },
      {
        key: 'customer_service',
        icon: Users,
        children: [
          { key: 'clients', path: 'clients', icon: UserCheck },
          { key: 'clients_no_agents', path: 'unClients', icon: UserX },
        ],
      },

      {
        key: 'services',
        icon: Cookie,
        path: 'services',
      },
      {
        key: 'reports',
        icon: BarChart3,
        path: 'reports',
      },
      {
        key: 'settings',
        icon: Settings,
        children: [
          { key: 'office_settings', path: 'office_settings', icon: Building },
          { key: 'users_roles', path: 'users_roles', icon: Shield },
        ],
      },
      {
        key: 'archive',
        icon: Archive,
        path: 'archive',
      },
      {
        key: 'courts_search',
        icon: Search,
        path: 'courts_search',
      },
    ],
    [],
  );

  useEffect(() => {
    const currentPath = location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length >= 2) {
      const section = pathSegments[1];

      const parentItem = menuItems.find((item) =>
        item.children?.some((child) => String(child.path ?? child.key) === section)
      );

      if (parentItem && !expandedItems.includes(parentItem.key)) {
        setExpandedItems(prev => (
          prev.includes(parentItem.key) ? prev : [...prev, parentItem.key]
        ));
      }
    }
  }, [location.pathname, menuItems, expandedItems]);

  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (!isMobile) {
      previousPath.current = location.pathname;
      return;
    }

    if (location.pathname !== previousPath.current && !isCollapsed) {
      onToggle();
    }

    previousPath.current = location.pathname;
  }, [location.pathname, isMobile, isCollapsed, onToggle]);

  const getItemLabel = (key: string) => {
    const navLabel = t(`nav.${key}`);
    if (navLabel !== `nav.${key}`) return navLabel;
    const sectionLabel = t(`dashboard.sections.${key}`);
    if (sectionLabel !== `dashboard.sections.${key}`) return sectionLabel;
    return key;
  };

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
    const itemPath = item.path ?? item.key;
    const isCurrentRoute = location.pathname === `/dashboard/${itemPath}`;
    const hasActiveChild = hasChildren && item.children?.some(
      (child) => location.pathname === `/dashboard/${child.path ?? child.key}`
    );

    return (
      <div key={item.key} className="w-full">
        {hasChildren ? (
          <button
            onClick={() => !isCollapsed && toggleExpanded(item.key)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
              (hasActiveChild || isCurrentRoute) && "bg-sidebar-accent text-sidebar-accent-foreground",
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
                  {getItemLabel(item.key)}
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
          </button>
        ) : (
          <NavLink
            to={`/dashboard/${itemPath}`}
            onClick={() => {
              if (isMobile && !isCollapsed) onToggle();
            }}
            className={({ isActive }) =>
              cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover",
                isActive && "bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant",
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
                {getItemLabel(item.key)}
              </span>
            )}
          </NavLink>
        )}

        {hasChildren && expanded && !isCollapsed && (
          <div className="mt-1 space-y-1 animate-accordion-down">
            {item.children?.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && !isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 z-50 h-full glass border-r border-sidebar-border transition-all duration-300",
          "lg:relative lg:translate-x-0",
          // Positioning based on RTL/LTR
          isRTL ? "right-0" : "left-0",
          // Width and visibility
          isMobile ? "w-full" : isCollapsed ? "w-16" : "w-64",
          // Mobile behavior
          isMobile && isCollapsed && (isRTL ? "translate-x-full" : "-translate-x-full"),
          isMobile && !isCollapsed && "translate-x-0",
          // Desktop behavior
          !isMobile && "translate-x-0"
        )}
        style={{
          direction: isRTL ? 'rtl' : 'ltr'
        }}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className={cn(
            "flex h-16 items-center border-b border-sidebar-border px-4",
            isCollapsed ? "justify-center" : "justify-between"
          )}>
            {!isCollapsed && (
              <NavLink
                to="/dashboard"
                onClick={() => {
                  if (isMobile && !isCollapsed) onToggle();
                }}
                className="text-lg font-semibold bg-gradient-primary bg-clip-text text-transparent truncate hover:opacity-80"
              >
                {t('nav.dashboard')}
              </NavLink>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 hover:bg-sidebar-accent glow-hover flex-shrink-0"
              aria-label={isCollapsed ? t('common.expand') : t('common.collapse')}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
