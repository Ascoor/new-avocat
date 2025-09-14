import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { MenuItem } from '@/config/menuItems'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface SidebarLinkProps {
  item: MenuItem
  collapsed?: boolean // property to control collapsed state
  onSelect?: () => void
}

const SidebarLink: React.FC<SidebarLinkProps> = ({ item, collapsed = false, onSelect }) => {
  const location = useLocation()
  const hasChildren = !!item.children && item.children.length > 0

  // Mark active if the item path matches or any child path matches
  const isActive = useMemo(() => {
    const selfActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/') || location.pathname.startsWith(item.path)
    if (selfActive) return true
    if (!item.children) return false
    return item.children.some((child) =>
      location.pathname === child.path || location.pathname.startsWith(child.path + '/') || location.pathname.startsWith(child.path)
    )
  }, [location.pathname, item])

  const [open, setOpen] = useState(isActive)
  const { t, i18n } = useTranslation()
  const dir = i18n.dir()

  const toggle = () => setOpen((o) => !o)

  const linkClasses = cn(
    'flex items-center gap-3 px-3 py-2.5 rounded-md w-full transition-all outline-none focus-visible:ring-2 ring-sidebar-ring',
    collapsed && 'justify-center',
    isActive
      ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-glow'
      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-glow'
  )

  const content = (
    <div className={linkClasses}>
      <item.icon size={20} />
      {!collapsed && <span className="text-sm font-medium">{t(`sidebar.${item.key}`)}</span>}
      {!collapsed && hasChildren && (
        <ChevronDown
          size={16}
          className={cn(dir === 'rtl' ? 'mr-auto' : 'ml-auto', 'transition-transform', open && 'rotate-180')}
        />
      )}
    </div>
  )

  return (
    <div>
      {collapsed ? (
        // Collapsed mode: show tooltip with the label for better UX
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {hasChildren ? (
                <button onClick={toggle} className="w-full text-left" aria-expanded={open} aria-haspopup={true}>
                  {content}
                </button>
              ) : (
                <Link to={item.path} onClick={onSelect} aria-current={isActive ? 'page' : undefined}>{content}</Link>
              )}
            </TooltipTrigger>
            <TooltipContent side="right" align="center" className="glass-card py-1.5 px-2 text-xs">
              {t(`sidebar.${item.key}`)}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : hasChildren ? (
        <button onClick={toggle} className="w-full text-left" aria-expanded={open} aria-haspopup={true}>
          {content}
        </button>
      ) : (
        <Link to={item.path} onClick={onSelect} aria-current={isActive ? 'page' : undefined}>{content}</Link>
      )}

      {hasChildren && !collapsed && (
        <div
          className={cn(
            'space-y-1 overflow-hidden transition-all',
            dir === 'rtl' ? 'pr-6' : 'pl-6',
            open ? 'max-h-96 animate-accordion-down' : 'max-h-0 animate-accordion-up'
          )}
        >
          {item.children?.map((child) => (
            <SidebarLink key={child.key} item={child} collapsed={collapsed} onSelect={onSelect} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarLink
