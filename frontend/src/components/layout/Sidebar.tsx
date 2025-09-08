import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '@/hooks/useLanguage';
import { sidebarItems } from '@/config/sidebar';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

export const Sidebar = ({ collapsed, onToggle, isMobile = false }: SidebarProps) => {
  const { isRTL } = useLanguage();

  const width = collapsed && !isMobile ? 64 : 240;

  return (
    <motion.aside
      initial={false}
      animate={{ width }}
      className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-40 h-screen bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 ${isRTL ? 'border-l' : 'border-r'} overflow-hidden`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed && <span className="font-bold">Avocat</span>}
          <Button variant="ghost" size="icon" onClick={onToggle}>
            {isRTL ? (
              collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />
            ) : (
              collapsed ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map(item => {
            const Icon = item.icon;
            const link = (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-300'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  } ${collapsed && !isMobile ? 'justify-center' : ''}`
                }
              >
                <Icon className="h-5 w-5" />
                {(!collapsed || isMobile) && <span className="font-medium">{item.label}</span>}
              </NavLink>
            );
            return collapsed && !isMobile ? (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>{link}</TooltipTrigger>
                <TooltipContent side={isRTL ? 'left' : 'right'}>{item.label}</TooltipContent>
              </Tooltip>
            ) : (
              link
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
