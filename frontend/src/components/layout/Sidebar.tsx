import { useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sidebarItems, type SidebarItem } from '@/config/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { t, isRTL } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const isPathActive = (path?: string) => {
    if (!path) return false;
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const hasActiveChild = useMemo(() => {
    const visit = (item: SidebarItem): boolean => {
      if (isPathActive(item.path)) return true;
      return item.children?.some(visit) ?? false;
    };

    return (item: SidebarItem) => item.children?.some(visit) ?? false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  useEffect(() => {
    const activeParentIds = sidebarItems
      .filter((item) => hasActiveChild(item))
      .map((item) => item.id);

    setExpandedItems((prev) => {
      const merged = new Set(prev);
      activeParentIds.forEach((id) => merged.add(id));
      return Array.from(merged);
    });
  }, [hasActiveChild, location.pathname]);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id],
    );
  };

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
  }, [isMobile, isCollapsed, location.pathname, onToggle]);

  const getItemLabel = (labelKey: string) => {
    const label = t(labelKey as never);
    return label === labelKey ? labelKey : label;
  };

  const renderItem = (item: SidebarItem, level = 0) => {
    const hasChildren = !!item.children?.length;
    const expanded = expandedItems.includes(item.id);
    const Icon = item.icon;
    const itemActive = isPathActive(item.path);
    const childActive = hasChildren && hasActiveChild(item);
    const indentation = level > 0 && !isCollapsed ? (isRTL ? 'mr-4' : 'ml-4') : '';

    if (hasChildren) {
      return (
        <div key={item.id} className="w-full">
          <button
            type="button"
            onClick={() => {
              if (!isCollapsed) toggleExpanded(item.id);
            }}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
              'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover',
              (childActive || itemActive) && 'bg-sidebar-accent text-sidebar-accent-foreground',
              indentation,
              isCollapsed && 'justify-center px-2',
            )}
          >
            <Icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed && 'h-6 w-6')} />
            {!isCollapsed && (
              <>
                <span className={cn('flex-1 truncate', isRTL ? 'text-right' : 'text-left')}>
                  {getItemLabel(item.labelKey)}
                </span>
                {expanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ChevronRight
                    className={cn('h-4 w-4 flex-shrink-0 transition-transform', isRTL && 'rotate-180')}
                  />
                )}
              </>
            )}
          </button>

          {expanded && !isCollapsed && (
            <div className="mt-1 space-y-1 animate-accordion-down">
              {item.children?.map((child) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    if (!item.path) {
      return null;
    }

    return (
      <NavLink
        key={item.id}
        to={item.path}
        end={item.path === '/dashboard'}
        onClick={() => {
          if (isMobile && !isCollapsed) onToggle();
        }}
        className={({ isActive }) =>
          cn(
            'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground glow-hover',
            (isActive || itemActive) && 'bg-sidebar-primary text-sidebar-primary-foreground shadow-elegant',
            indentation,
            isCollapsed && 'justify-center px-2',
          )
        }
      >
        <Icon className={cn('h-5 w-5 flex-shrink-0', isCollapsed && 'h-6 w-6')} />
        {!isCollapsed && (
          <span className={cn('flex-1 truncate', isRTL ? 'text-right' : 'text-left')}>
            {getItemLabel(item.labelKey)}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={onToggle}
          role="presentation"
        />
      )}

      <aside
        className={cn(
          'fixed top-0 z-50 h-full glass border-r border-sidebar-border transition-all duration-300',
          'lg:relative lg:translate-x-0',
          isRTL ? 'right-0' : 'left-0',
          isMobile ? 'w-full' : isCollapsed ? 'w-16' : 'w-64',
          isMobile && isCollapsed && (isRTL ? 'translate-x-full' : '-translate-x-full'),
          isMobile && !isCollapsed && 'translate-x-0',
          !isMobile && 'translate-x-0',
        )}
        style={{ direction: isRTL ? 'rtl' : 'ltr' }}
      >
        <div className="flex h-full flex-col">
          <div
            className={cn(
              'flex h-16 items-center border-b border-sidebar-border px-4',
              isCollapsed ? 'justify-center' : 'justify-between',
            )}
          >
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
              className="h-8 w-8 flex-shrink-0 hover:bg-sidebar-accent glow-hover"
              aria-label={isCollapsed ? t('common.expand') : t('common.collapse')}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="custom-scrollbar flex-1 space-y-2 overflow-y-auto p-4">
            {sidebarItems.map((item) => renderItem(item))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
