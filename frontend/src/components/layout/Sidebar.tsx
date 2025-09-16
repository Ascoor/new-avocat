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
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/common/BrandLogo';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

interface MenuItem {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  children?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { t, isRTL, language } = useLanguage();
  const location = useLocation();
  const isMobile = useIsMobile();
  const { user } = useAuth();
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
  }, [location.pathname]);

  // Handle mobile sidebar state
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      // Auto-collapse on mobile when route changes
      const timer = setTimeout(() => {
        onToggle();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

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

    const currentPath = location.pathname;
    const isCurrentActive = currentPath === `/dashboard/${item.key}`;
    const hasActiveChild = hasChildren && item.children?.some(
      child => currentPath === `/dashboard/${child.key}`
    );
    const isActive = isCurrentActive || hasActiveChild;

    const nestedSpacing =
      level > 0 && !isCollapsed
        ? isRTL
          ? 'mr-3 pr-2'
          : 'ml-3 pl-2'
        : undefined;

    const labelSize = level > 0 ? 'text-[13px]' : 'text-sm';

    if (hasChildren) {
      return (
        <div key={item.key} className="w-full">
          <button
            type="button"
            onClick={() => !isCollapsed && toggleExpanded(item.key)}
            aria-expanded={expanded}
            className={cn(
              'group relative flex w-full items-center rounded-xl px-3 py-2.5 transition-all duration-200',
              isCollapsed ? 'justify-center px-2.5' : 'gap-3',
              nestedSpacing
            )}
          >
            <span
              className={cn(
                'pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sidebar-accent/0 via-sidebar-primary/0 to-sidebar-accent/0 opacity-0 transition-all duration-300',
                'group-hover:opacity-100 group-hover:from-sidebar-accent/12 group-hover:via-sidebar-primary/20 group-hover:to-sidebar-accent/12',
                (expanded || hasActiveChild) &&
                  'opacity-100 from-sidebar-primary/55 via-sidebar-primary/75 to-sidebar-accent/55'
              )}
            />
            <span
              className={cn(
                'pointer-events-none absolute inset-y-2 w-1 rounded-full bg-white/25 transition-all duration-300',
                isRTL ? 'right-1' : 'left-1',
                expanded || hasActiveChild
                  ? 'scale-y-100 opacity-100'
                  : 'scale-y-50 opacity-0 group-hover:scale-y-95 group-hover:opacity-60'
              )}
            />
            <IconComponent
              className={cn(
                'relative z-10 h-5 w-5 flex-shrink-0 transition-transform duration-300',
                isCollapsed && 'h-6 w-6',
                isActive ? 'text-white drop-shadow-md' : 'text-sidebar-foreground/70',
                'group-hover:scale-110'
              )}
            />
            {!isCollapsed && (
              <>
                <span
                  className={cn(
                    'relative z-10 flex-1 truncate transition-colors duration-300',
                    isRTL ? 'text-right' : 'text-left',
                    labelSize,
                    isActive ? 'text-white' : 'text-sidebar-foreground/85'
                  )}
                >
                  {t(`nav.${item.key}`)}
                </span>
                <span
                  className={cn(
                    'relative z-10 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-transform duration-200',
                    expanded ? 'rotate-180' : ''
                  )}
                >
                  {expanded ? (
                    <ChevronDown className="h-3.5 w-3.5" />
                  ) : (
                    <ChevronRight className={cn('h-3.5 w-3.5', isRTL && 'rotate-180')} />
                  )}
                </span>
              </>
            )}
          </button>

          {hasChildren && expanded && !isCollapsed && (
            <div
              className={cn(
                'mt-1 space-y-1 border-l border-white/10 pl-3',
                isRTL && 'border-l-0 border-r pr-3'
              )}
            >
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <div key={item.key} className="w-full">
        <NavLink
          to={`/dashboard/${item.key}`}
          className={cn(
            'group relative flex items-center overflow-hidden rounded-xl px-3 py-2.5 transition-all duration-200',
            isCollapsed ? 'justify-center px-2.5' : 'gap-3',
            !isCollapsed && (isRTL ? 'flex-row-reverse' : 'flex-row'),
            nestedSpacing
          )}
        >
          {({ isActive }) => (
            <>
              <span
                className={cn(
                  'pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-sidebar-accent/0 via-sidebar-primary/0 to-sidebar-accent/0 opacity-0 transition-all duration-300',
                  'group-hover:opacity-100 group-hover:from-sidebar-accent/12 group-hover:via-sidebar-primary/20 group-hover:to-sidebar-accent/12',
                  isActive && 'opacity-100 from-sidebar-primary/70 via-sidebar-primary to-sidebar-accent/70 shadow-elegant'
                )}
              />
              <span
                className={cn(
                  'pointer-events-none absolute inset-y-2 w-1 rounded-full bg-white/25 transition-all duration-300',
                  isRTL ? 'right-1' : 'left-1',
                  isActive
                    ? 'scale-y-100 opacity-100'
                    : 'scale-y-50 opacity-0 group-hover:scale-y-95 group-hover:opacity-60'
                )}
              />
              <IconComponent
                className={cn(
                  'relative z-10 h-5 w-5 flex-shrink-0 transition-transform duration-300',
                  isCollapsed && 'h-6 w-6',
                  isActive ? 'text-white drop-shadow-md' : 'text-sidebar-foreground/70',
                  'group-hover:scale-110'
                )}
              />
              {!isCollapsed && (
                <span
                  className={cn(
                    'relative z-10 flex-1 truncate transition-colors duration-300',
                    isRTL ? 'text-right' : 'text-left',
                    labelSize,
                    isActive ? 'text-white' : 'text-sidebar-foreground/85'
                  )}
                >
                  {t(`nav.${item.key}`)}
                </span>
              )}
            </>
          )}
        </NavLink>
      </div>
    );
  };

  return (
    <>
      {isMobile && !isCollapsed && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'glass fixed top-0 z-50 h-full overflow-hidden border-r border-white/10 text-sidebar-foreground transition-all duration-300',
          'lg:relative lg:translate-x-0',
          isRTL ? 'right-0' : 'left-0',
          isCollapsed ? 'w-16' : 'w-72',
          isMobile && isCollapsed && (isRTL ? 'translate-x-full' : '-translate-x-full'),
          (isMobile && !isCollapsed) || !isMobile ? 'translate-x-0' : null
        )}
        style={{
          direction: isRTL ? 'rtl' : 'ltr',
          '--glass-surface': 'var(--gradient-sidebar)'
        } as React.CSSProperties}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-sidebar-primary/25 blur-3xl" />
          <div className="absolute right-[-48px] bottom-[-48px] h-72 w-72 rounded-full bg-sidebar-accent/20 blur-3xl" />
        </div>

        <div className="relative flex h-full flex-col">
          <div
            className={cn(
              'flex h-16 items-center border-b border-white/10 px-4',
              isCollapsed ? 'justify-center' : 'justify-between'
            )}
          >
            <div
              className={cn(
                'flex items-center gap-3',
                isCollapsed ? 'justify-center' : isRTL ? 'flex-row-reverse' : 'flex-row'
              )}
            >
              <div
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-2xl border border-white/15 bg-white/10',
                  isCollapsed ? 'p-0' : 'p-1.5'
                )}
              >
                <BrandLogo
                  variant={isCollapsed ? 'icon' : 'full'}
                  className={isCollapsed ? 'h-6 w-6' : 'h-9'}
                  lang={language}
                />
              </div>
              {!isCollapsed && (
                <div className={cn('flex flex-col', isRTL ? 'items-end text-right' : 'items-start text-left')}>
                  <span className="text-sm font-semibold leading-tight text-white">
                    {t('nav.dashboard')}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.35em] text-white/60">
                    {t('common.menu')}
                  </span>
                </div>
              )}
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label={isCollapsed ? t('nav.expand') : t('nav.collapse')}
            >
              {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
            </Button>
          </div>

          {!isCollapsed && (
            <div className="px-4 pt-4">
              <Badge className="border-white/15 bg-white/10 text-[11px] uppercase tracking-[0.3em] text-white/70">
                {t('common.menu')}
              </Badge>
            </div>
          )}

          <nav
            className={cn(
              'relative flex-1 space-y-2 overflow-y-auto pb-4 pt-4 custom-scrollbar',
              isCollapsed ? 'px-2' : 'px-4'
            )}
          >
            <div className="relative space-y-2">
              {menuItems.map(item => renderMenuItem(item))}
            </div>
          </nav>

          {!isCollapsed && user && (
            <div className="relative mt-auto px-4 pb-6">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white shadow-[0_20px_40px_-28px_rgba(15,23,42,0.65)]">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10 border border-white/20">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="bg-gradient-primary text-white">
                      {user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                    <p className="truncate text-xs text-white/70">{user.email}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-[11px] uppercase tracking-[0.3em] text-white/60">
                  <span>{t('dashboard.status.label')}</span>
                  <span className="flex items-center gap-1 text-white">
                    <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                    {t('dashboard.status.healthy')}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;