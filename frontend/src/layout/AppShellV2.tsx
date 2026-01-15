import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';
import SidebarV2 from '@/layout/SidebarV2';
import TopbarV2 from '@/layout/TopbarV2';

const SIDEBAR_STORAGE_KEY = 'dashboard-v2-sidebar';

const AppShellV2 = () => {
  const isMobile = useIsMobile();
  const { isRTL, direction } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const stored = window.localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored) {
      setCollapsed(stored === 'collapsed');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(SIDEBAR_STORAGE_KEY, collapsed ? 'collapsed' : 'expanded');
  }, [collapsed]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const layoutDirection = useMemo(() => (isRTL ? 'row-reverse' : 'row'), [isRTL]);

  return (
    <div className="flex min-h-screen bg-background" style={{ flexDirection: layoutDirection }} dir={direction}>
      {!isMobile && <SidebarV2 collapsed={collapsed} />}

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side={isRTL ? 'right' : 'left'}
          className="w-[280px] p-0"
        >
          <SidebarV2 collapsed={false} onNavigate={closeMobile} />
        </SheetContent>
      </Sheet>

      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <TopbarV2
          onToggleSidebar={() => setCollapsed((prev) => !prev)}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
          isMobile={isMobile}
        />
        <main className="min-w-0 flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShellV2;
