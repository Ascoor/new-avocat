import React from 'react';
import SidebarLink from './SidebarLink';
import type { MenuItem } from '@/config/sidebar';

interface SidebarMenuProps {
  items: MenuItem[];
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map(item => (
        <SidebarLink key={item.key} item={item} />
      ))}
    </div>
  );
};

export default SidebarMenu;
