import React, { useState } from 'react'
import { menuItems } from '@/config/sidebar'
import SidebarMenu from './SidebarMenu'
import { useTranslation } from 'react-i18next'
import BrandLogo from '../common/BrandLogo'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Sidebar = () => {
  const { t, i18n } = useTranslation()
  const [collapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => setCollapsed((c) => !c)

  return (
    <aside
      className={cn(
        'h-full bg-sidebar text-sidebar-foreground transition-all duration-300',
        collapsed ? 'w-20' : 'w-64'
      )}
      dir={i18n.dir()}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">


        {/* Sidebar Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-sidebar-accent text-sidebar-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
                <div className={cn('flex items-center gap-2')}>
          {collapsed ? (
            <BrandLogo variant="icon" className="text-primary-foreground h-8 w-8" />
          ) : (
            <BrandLogo variant="full" className="text-primary-foreground ml-2 h-8 w-auto" />
          )}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-lg font-semibold">{t('sidebar.dashboard')}</h2>
      </div>
      <SidebarMenu items={menuItems} collapsed={collapsed} />
    </aside>
  )
}

export default Sidebar
