import React from 'react';
import SidebarLink from './SidebarLink';
import type { MenuItem } from '@/config/sidebar';

interface SidebarMenuProps {
  items: MenuItem[];
  collapsed?: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, collapsed = false }) => {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <SidebarLink key={item.key} item={item} collapsed={collapsed} />
      ))}
    </div>
  );
};

export default SidebarMenu;
