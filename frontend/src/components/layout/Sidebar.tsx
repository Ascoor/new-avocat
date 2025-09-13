import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useUi } from '@/contexts';
import { useLanguage } from '@/contexts/LanguageContext';

export const Sidebar = () => {
  const { t } = useTranslation();
  const { sidebarOpen, closeSidebar } = useUi();
  const { isRTL } = useLanguage();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeSidebar();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeSidebar]);

  return (
    <>
      <aside
        className={cn(
          'fixed top-0 bottom-0 w-64 bg-card shadow-elegant dark:neon-soft transition-transform',
          isRTL ? 'right-0 translate-x-full' : 'left-0 -translate-x-full',
          sidebarOpen && 'translate-x-0'
        )}
        aria-hidden={!sidebarOpen}
      >
        <nav className="p-4 space-y-2">
          <Link
            to="/"
            onClick={closeSidebar}
            className="block text-foreground hover:text-primary"
          >
            {t<string>('common.dashboard')}
          </Link>
        </nav>
      </aside>
      <div
        className={cn(
          'fixed inset-0 bg-black/40 z-40',
          sidebarOpen ? 'block' : 'hidden'
        )}
        onClick={closeSidebar}
        aria-hidden={!sidebarOpen}
      />
    </>
  );
};
