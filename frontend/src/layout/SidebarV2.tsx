import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { dashboardV2Nav } from '@/layout/navConfig';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

interface SidebarV2Props {
  collapsed: boolean;
  onNavigate?: () => void;
}

const SidebarV2 = ({ collapsed, onNavigate }: SidebarV2Props) => {
  const { isRTL } = useLanguage();

  return (
    <aside
      className={cn(
        'flex h-full flex-col border-border bg-sidebar text-sidebar-foreground shadow-sidebar-shell transition-[width] duration-200',
        collapsed ? 'w-[84px]' : 'w-[280px]',
      )}
    >
      <div className="flex h-16 items-center gap-3 border-b border-sidebar-border px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground shadow-sidebar-item">
          A
        </div>
        {!collapsed && (
          <div>
            <p className="text-sm font-semibold text-sidebar-foreground">Avocat</p>
            <p className="text-xs text-sidebar-text-muted">Dashboard v2</p>
          </div>
        )}
      </div>

      <nav className="flex-1 space-y-2 px-3 py-4">
        {dashboardV2Nav.map((item) => {
          const Icon = item.icon;
          return (
            <Tooltip key={item.path} delayDuration={120}>
              <TooltipTrigger asChild>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'group flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                      'hover:bg-sidebar-item-hover text-sidebar-foreground',
                      isActive && 'bg-sidebar-item-active text-sidebar-foreground shadow-sidebar-item',
                      collapsed && 'justify-center',
                    )
                  }
                >
                  <Icon
                    className={cn(
                      'h-5 w-5 text-sidebar-primary',
                      isRTL && 'rotate-180',
                    )}
                  />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side={isRTL ? 'left' : 'right'}>
                  <span>{item.label}</span>
                </TooltipContent>
              )}
            </Tooltip>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-3 text-xs text-sidebar-text-muted">
        {!collapsed && <span>v2 beta</span>}
      </div>
    </aside>
  );
};

export default SidebarV2;
