import React from 'react'
import SidebarLink from './SidebarLink'
import type { MenuItem } from '@/config/sidebar'

interface SidebarMenuProps {
  items: MenuItem[]
  collapsed?: boolean
  onItemClick?: () => void
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, collapsed = false, onItemClick }) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <SidebarLink key={item.key} item={item} collapsed={collapsed} onSelect={onItemClick} />
      ))}
    </div>
  )
}

export default SidebarMenu
