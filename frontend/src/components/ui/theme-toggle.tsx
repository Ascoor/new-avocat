import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUi } from '@/contexts';
import { useTranslation } from 'react-i18next';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useUi();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      aria-label={t('header.toggle_theme')}
      className="glass-button hover:shadow-glow transition-colors"
    >
      {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
    </Button>
  );
};
