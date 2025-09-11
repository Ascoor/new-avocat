import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/config/sidebar';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

interface SidebarLinkProps {
  item: MenuItem;
  collapsed?: boolean;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, collapsed = false }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const content = (
    <>
      <item.icon size={20} />
      {!collapsed && <span className="flex-1">{t(`sidebar.${item.key}`)}</span>}
      {hasChildren && !collapsed && (
        <ChevronDown
          size={16}
          className={cn('transition-transform', open ? 'rotate-180' : 'rotate-0')}
        />
      )}
    </>
  );

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className={cn(
            'flex w-full items-center gap-3 px-3 py-2.5 text-left rounded-md transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
            collapsed && 'justify-center'
          )}
        >
          {content}
        </button>
        {!collapsed && open && (
          <div className="pl-6 space-y-1">
            {item.children!.map((child) => (
              <SidebarLink key={child.key} item={child} collapsed={collapsed} />
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      to={item.path}
      className={cn(
        'flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        collapsed && 'justify-center'
      )}
    >
      {content}
    </Link>
  );
};

export default SidebarLink;
