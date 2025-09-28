import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/AppContext';
import { useTranslation } from 'react-i18next';

export function LanguageToggle() {
  const { language, toggleLanguage } = useAppContext();
  const { t } = useTranslation();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="w-auto h-9 px-3 rounded-lg transition-all duration-300 hover:bg-primary/10 flex items-center gap-2"
      title={t('language')}
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === 'en' ? 'عر' : 'EN'}
      </span>
    </Button>
  );
}