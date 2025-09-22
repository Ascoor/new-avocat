import { type CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { sidebarItems, type SidebarItem } from '@/config/sidebar';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
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
  const { theme } = useTheme();

  type SidebarCSSProperties = CSSProperties & Record<`--${string}`, string>;

  const themeStyles = useMemo<SidebarCSSProperties>(() => {
 
    if (theme === 'dark') {
      return {
        '--sidebar-surface':
          'linear-gradient(165deg, rgba(15, 23, 42, 0.96) 0%, rgba(2, 6, 23, 0.92) 100%)',
        '--sidebar-item-bg': 'rgba(30, 41, 59, 0.55)',
        '--sidebar-hover-highlight': 'rgba(56, 189, 248, 0.16)',
        '--sidebar-active-glow': '0 28px 55px -30px rgba(56, 189, 248, 0.6)',
        '--sidebar-hover-glow': '0 20px 48px -32px rgba(56, 189, 248, 0.45)',
        '--sidebar-ambient-glow': 'rgba(56, 189, 248, 0.35)',
        '--sidebar-border-color': 'rgba(56, 189, 248, 0.18)', 
        '--sidebar-text-muted': 'rgba(226, 232, 240, 0.72)',
        '--sidebar-text-strong': 'rgba(241, 245, 249, 0.96)',
        '--sidebar-hover-foreground': 'rgba(125, 211, 252, 0.96)',
        '--sidebar-icon-muted': 'rgba(148, 163, 184, 0.85)',
        '--sidebar-icon-active': 'rgba(125, 211, 252, 1)',
      } satisfies SidebarCSSProperties;
 
    }

    return {
      '--sidebar-surface':
        'linear-gradient(165deg, rgba(255, 255, 255, 0.92) 0%, rgba(226, 244, 255, 0.96) 100%)',
      '--sidebar-item-bg': 'rgba(255, 255, 255, 0.82)',
      '--sidebar-hover-highlight': 'rgba(14, 165, 233, 0.14)',
      '--sidebar-active-glow': '0 24px 52px -28px rgba(14, 116, 144, 0.42)',
      '--sidebar-hover-glow': '0 18px 40px -26px rgba(14, 116, 144, 0.28)',
      '--sidebar-ambient-glow': 'rgba(14, 165, 233, 0.32)',
      '--sidebar-border-color': 'rgba(14, 165, 233, 0.24)', 
      '--sidebar-text-muted': 'rgba(71, 85, 105, 0.78)',
      '--sidebar-text-strong': 'rgba(30, 41, 59, 0.96)',
      '--sidebar-hover-foreground': 'rgba(14, 116, 144, 0.95)',
      '--sidebar-icon-muted': 'rgba(100, 116, 139, 0.85)',
      '--sidebar-icon-active': 'rgba(14, 116, 144, 0.95)',
    } satisfies SidebarCSSProperties;
 
  }, [theme]);

  const interactiveBaseClasses = useMemo(
    () =>
      cn(
        'group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[var(--sidebar-text-muted)] transition-all duration-300 ease-out',
        'overflow-hidden border border-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring',
        'hover:-translate-y-px hover:scale-[1.01] active:scale-[0.99]',
        "before:absolute before:inset-0 before:-z-10 before:rounded-2xl before:bg-[var(--sidebar-hover-highlight)] before:opacity-0 before:transition-opacity before:duration-300 before:ease-out before:content-[''] group-hover:before:opacity-100",
     'hover:shadow-[var(--sidebar-hover-glow)] group-hover:text-[var(--sidebar-hover-foreground)]',
 
      ),
    [],
  );

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
              interactiveBaseClasses,
              'transition-[background,transform,box-shadow] duration-300',
              indentation,
              isCollapsed &&
                "justify-center px-2 before:opacity-0 before:transition-none hover:scale-100 hover:shadow-none",
              (childActive || itemActive) &&
                 'border-[var(--sidebar-border-color)] bg-[var(--sidebar-item-bg)] text-[var(--sidebar-text-strong)] shadow-[var(--sidebar-active-glow)]',
 
            )}
            style={(childActive || itemActive) && !isCollapsed ? { boxShadow: 'var(--sidebar-active-glow)' } : undefined}
          >
            <Icon
              className={cn(
        'h-5 w-5 flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:rotate-3 group-hover:text-[var(--sidebar-hover-foreground)]',
                isCollapsed && 'h-6 w-6',
                (childActive || itemActive)
                  ? 'text-[var(--sidebar-icon-active)]'
                  : 'text-[var(--sidebar-icon-muted)]',
 
              )}
            />
            {!isCollapsed && (
              <>
                <span
                  className={cn(
                    'flex-1 truncate transition-colors duration-300',
                    isRTL ? 'text-right' : 'text-left',
                   (childActive || itemActive) && 'text-[var(--sidebar-text-strong)]',
 
                  )}
                >
                  {getItemLabel(item.labelKey)}
                </span>
                {expanded ? (
                  <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:-rotate-180" />
                ) : (
                  <ChevronRight
                    className={cn(
                      'h-4 w-4 flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5',
                      isRTL && 'rotate-180',
                    )}
                  />
                )}
              </>
            )}
          </button>

          {expanded && !isCollapsed && (
            <div className="mt-1 space-y-1 animate-accordion-down pl-2">
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
            interactiveBaseClasses,
            'transition-[background,transform,box-shadow] duration-300',
            indentation,
            isCollapsed &&
              "justify-center px-2 before:opacity-0 before:transition-none hover:scale-100 hover:shadow-none",
            (isActive || itemActive) && 
          'border-[var(--sidebar-border-color)] bg-[var(--sidebar-item-bg)] text-[var(--sidebar-text-strong)] shadow-[var(--sidebar-active-glow)]',
          )
        }
        style={!isCollapsed && itemActive ? { boxShadow: 'var(--sidebar-active-glow)' } : undefined}
      >
        <Icon
          className={cn(
            'h-5 w-5 flex-shrink-0 transition-transform duration-300 ease-out group-hover:scale-110 group-hover:-rotate-3 group-hover:text-[var(--sidebar-hover-foreground)]',
            isCollapsed && 'h-6 w-6',
            itemActive ? 'text-[var(--sidebar-icon-active)]' : 'text-[var(--sidebar-icon-muted)]',
 
          )}
        />
        {!isCollapsed && (
          <span
            className={cn(
              'flex-1 truncate transition-colors duration-300',
              isRTL ? 'text-right' : 'text-left',
       itemActive && 'text-[var(--sidebar-text-strong)]',
 
            )}
          >
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
          'relative isolate fixed top-0 z-50 h-full overflow-hidden border-r border-sidebar-border transition-all duration-300',
          'lg:relative lg:translate-x-0',
          isRTL ? 'right-0' : 'left-0',
          isMobile
            ? isCollapsed
              ? 'pointer-events-none w-0 overflow-hidden'
              : 'w-full'
            : isCollapsed
              ? 'w-16'
              : 'w-64',
          isMobile && isCollapsed && (isRTL ? 'translate-x-full' : '-translate-x-full'),
          isMobile && !isCollapsed && 'translate-x-0',
          !isMobile && 'translate-x-0',
          'shadow-[0_20px_60px_-35px_rgba(15,23,42,0.65)]',
        )}
        style={{
          ...themeStyles,
          background: 'var(--sidebar-surface)',
          borderColor: 'var(--sidebar-border-color)',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        data-theme={theme}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,var(--sidebar-ambient-glow)_0%,transparent_55%)] opacity-80"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute -left-10 top-1/3 -z-10 h-64 w-64 rounded-full bg-[radial-gradient(circle,var(--sidebar-ambient-glow)_0%,transparent_70%)] blur-3xl"
        />
        <div className="relative z-10 flex h-full flex-col backdrop-blur-xl">
          <div
            className={cn(
              'flex h-16 items-center border-b border-sidebar-border/50 px-4 backdrop-blur-sm',
              isCollapsed ? 'justify-center' : 'justify-between',
            )}
            style={{ borderColor: 'var(--sidebar-border-col or)' }}
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
              className="h-8 w-8 flex-shrink-0 rounded-full border border-transparent bg-transparent text-sidebar-foreground transition-all duration-300 hover:border-[var(--sidebar-border-color)] hover:bg-[var(--sidebar-item-bg)] hover:shadow-[var(--sidebar-hover-glow)]"
              aria-label={isCollapsed ? t('common.expand') : t('common.collapse')}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          <nav className="custom-scrollbar flex-1 space-y-2.5 overflow-y-auto p-4">
            {sidebarItems.map((item) => renderItem(item))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
