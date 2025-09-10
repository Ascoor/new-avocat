import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const { t } = useTranslation();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-2">
        {onToggleSidebar && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label={t('header.toggle_sidebar')}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-2xl font-bold gradient-text">
          {t('brand.name', { defaultValue: 'Avocat' })}
        </h1>
      </div>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
