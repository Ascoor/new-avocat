import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { MenuItem } from '@/config/sidebar';

interface SidebarLinkProps {
  item: MenuItem;
  collapsed?: boolean; // ← أضف هذه الخاصية
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, collapsed = false }) => {
  return (
    <div>
      <Link
        to={item.path}
        className={cn(
          'flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all duration-200 hover:bg-gray-700',
          collapsed && 'justify-center'
        )}
      >
        <item.icon size={20} />
        {!collapsed && <span>{item.key}</span>} {/* أو استخدم t(`sidebar.${item.key}`) */}
      </Link>

      {item.children && !collapsed && (
        <div className="pl-6 space-y-1">
          {item.children.map(child => (
            <SidebarLink key={child.key} item={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SidebarLink;
