
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { Drawer, DrawerContent } from '../ui/drawer';

export const Layout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { isRTL } = useLanguage();
  const location = useLocation();

  // إغلاق الشريط الجانبي للموبايل عند تغيير الصفحة
  useEffect(() => {
    setMobileSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header with dynamic positioning */}
      <div 
        className={`
          fixed top-0 z-50 transition-all duration-300 ease-in-out
          ${isRTL ? 'right-0' : 'left-0'}
          ${sidebarCollapsed 
            ? 'w-full lg:w-[calc(100%-4rem)]' + (isRTL ? ' lg:right-16' : ' lg:left-16')
            : 'w-full lg:w-[calc(100%-20rem)]' + (isRTL ? ' lg:right-80' : ' lg:left-80')
          }
        `}
      >
        <Header onToggleSidebar={() => setMobileSidebarOpen(true)} />
      </div>
      
      {/* Desktop Sidebar - Always visible as mini or full */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Mobile Sidebar (Drawer) */}
      <div className="lg:hidden">
        <Drawer open={mobileSidebarOpen} onOpenChange={setMobileSidebarOpen}>
          <DrawerContent className="p-0 h-full">
            <div className="h-full overflow-y-auto">
              {/* Header للموبايل */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="text-lg font-bold text-gray-900 dark:text-white">
                  أفوكات - نظام المحاماة
                </div>
                <button 
                  onClick={() => setMobileSidebarOpen(false)}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  ✕
                </button>
              </div>
              
              {/* محتوى الشريط الجانبي للموبايل */}
              <div className="px-4 py-2">
                <Sidebar 
                  collapsed={false} 
                  onToggle={() => setMobileSidebarOpen(false)} 
                  isMobile={true} 
                />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
      
      {/* Main Content with dynamic margin */}
      <main
        className={`
          pt-16 transition-all duration-300 ease-in-out min-h-[calc(100vh-4rem)]
          ${isRTL 
            ? sidebarCollapsed 
              ? 'lg:pr-16' 
              : 'lg:pr-80'
            : sidebarCollapsed 
              ? 'lg:pl-16' 
              : 'lg:pl-80'
          }
        `}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
