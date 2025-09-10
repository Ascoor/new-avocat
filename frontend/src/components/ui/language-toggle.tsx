import React from 'react';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from 'react-i18next';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      aria-label={t('header.toggle_language')}
      className="gap-2 transition-smooth"
    >
      <Globe className="h-4 w-4" />
      <span className="hidden md:inline">
        {language === 'en' ? t('language.ar') : t('language.en')}
      </span>
    </Button>
  );
};
