import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/config/sidebar'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface SidebarLinkProps {
  item: MenuItem
  collapsed?: boolean // property to control collapsed state
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, collapsed = false }) => {
  const location = useLocation()
  const hasChildren = !!item.children && item.children.length > 0
  const isActive = location.pathname.startsWith(item.path)
  const [open, setOpen] = useState(isActive)
  const { t } = useTranslation()

  const toggle = () => setOpen((o) => !o)

  const linkClasses = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all',
    collapsed && 'justify-center',
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-glow'
      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-glow'
  )

  const content = (
    <div className={linkClasses}>
      <item.icon size={20} />
      {!collapsed && <span>{t(`sidebar.${item.key}`)}</span>}
      {!collapsed && hasChildren && (
        <ChevronDown
          size={16}
          className={cn('ml-auto transition-transform', open && 'rotate-180')}
        />
      )}
    </div>
  )

  return (
    <div>
      {hasChildren ? (
        <button onClick={toggle} className="w-full text-left">
          {content}
        </button>
      ) : (
        <Link to={item.path}>{content}</Link>
      )}

      {hasChildren && !collapsed && (
        <div
          className={cn(
            'pl-6 space-y-1 overflow-hidden transition-all',
            open ? 'max-h-96 animate-accordion-down' : 'max-h-0 animate-accordion-up'
          )}
        >
          {item.children?.map((child) => (
            <SidebarLink key={child.key} item={child} collapsed={collapsed} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarLink
