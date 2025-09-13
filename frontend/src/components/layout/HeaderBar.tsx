import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUi } from '@/contexts';
import { cn } from '@/lib/utils';

export const HeaderBar = () => {
  const { t } = useTranslation();
  const { toggleLanguage, language, isRTL } = useLanguage();
  const { toggleSidebar } = useUi();

  return (
      <header className="fixed top-0 inset-x-0 z-50 gradient-hero backdrop-blur-sm shadow-elegant dark:neon-soft">
        <div className={cn('h-14 flex items-center justify-between px-4', isRTL && 'flex-row-reverse')}>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={t<string>('header.toggle_sidebar')}
            className="hover-lift"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="font-semibold text-primary">
            {t<string>('brand.name')}
          </Link>
        </div>
          <div className={cn('flex items-center gap-2', isRTL && 'flex-row-reverse')}>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleLanguage}
            aria-label={t<string>('header.toggle_language')}
            className="hover-lift"
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </Button>
          <ThemeToggle />
          <Link to="/login" className="text-sm text-primary hover:underline">
            {t<string>('common.login')}
          </Link>
          <Link to="/register" className="text-sm text-accent hover:underline">
            {t<string>('common.register')}
          </Link>
        </div>
      </div>
    </header>
  );
};
