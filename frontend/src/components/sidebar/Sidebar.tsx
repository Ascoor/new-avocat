import React, { useEffect, useState } from 'react'
import { menuItems } from '@/config/sidebar'
import SidebarMenu from './SidebarMenu'
import { useTranslation } from 'react-i18next'
import BrandLogo from '../common/BrandLogo'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('app:sidebar-collapsed')
      return saved ? JSON.parse(saved) : false
    } catch {
      return false
    }
  })

  const dir = i18n.dir()

  const toggleSidebar = () => setCollapsed((c) => !c)

  // Persist state
  useEffect(() => {
    try {
      localStorage.setItem('app:sidebar-collapsed', JSON.stringify(collapsed))
    } catch {}
  }, [collapsed])

  return (
    <aside
      className={cn(
        'h-full bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border',
        collapsed ? 'w-20' : 'w-64'
      )}
      dir={dir}
    >
      {/* Logo Section */}
      <div className={cn('p-4 flex items-center justify-between', dir === 'rtl' ? 'flex-row-reverse' : '')}>


        {/* Sidebar Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          aria-label={collapsed ? t('open_sidebar') : t('close_sidebar')}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-all duration-300 hover:shadow-glow focus-visible:ring-2 ring-sidebar-ring outline-none"
        >
          {collapsed
            ? dir === 'rtl'
              ? <ChevronLeft size={14} />
              : <ChevronRight size={14} />
            : dir === 'rtl'
              ? <ChevronRight size={14} />
              : <ChevronLeft size={14} />}
        </button>
                <div className={cn('flex items-center gap-2')}>
          {collapsed ? (
            <BrandLogo variant="icon" className="text-primary-foreground h-8 w-8" />
          ) : (
            <BrandLogo variant="full" className="text-primary-foreground ml-2 h-8 w-auto" />
          )}
        </div>
      </div>
      {!collapsed && (
        <div className="px-4 pb-2">
          <h2 className="text-sm font-semibold text-sidebar-foreground/80 tracking-wide">
            {t('sidebar.dashboard')}
          </h2>
        </div>
      )}
      <SidebarMenu items={menuItems} collapsed={collapsed} />
    </aside>
  )
}

export default Sidebar
