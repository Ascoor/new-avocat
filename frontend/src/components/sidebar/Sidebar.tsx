import React, { useState } from 'react';
import SidebarMenu from './SidebarMenu';
import { useTranslation } from 'react-i18next';
import { menuItems } from '@/config/sidebar';
import BrandLogo from '../common/BrandLogo';
import { cn } from '@/lib/utils'; // make sure cn is imported
import { ChevronLeft, ChevronRight } from 'lucide-react'; // import the icons

const Sidebar = () => {
  const { t, i18n } = useTranslation();
  const [collapsed, setCollapsed] = useState(false); // state for sidebar collapse

  const toggleSidebar = () => setCollapsed(!collapsed); // toggle function

  return (
    <aside
      className={cn(
        "h-full bg-gray-800 text-white transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
      dir={i18n.dir()}
    >
      {/* Logo Section */}
      <div className="p-4 flex items-center justify-between">
        <div className={cn("flex items-center gap-2")}>
          {collapsed ? (
            <BrandLogo variant="icon" className="text-primary-foreground h-8 w-8" />
          ) : (
            <BrandLogo variant="full" className="text-primary-foreground ml-2 h-8 w-auto" />
          )}
        </div>

        {/* Sidebar Collapse Toggle */}
        <button
          onClick={toggleSidebar}
          className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors"
        >
          {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Sidebar Menu */}
      <div className="p-2">
        <SidebarMenu items={menuItems} collapsed={collapsed} />
      </div>
    </aside>
  );
};

export default Sidebar;
