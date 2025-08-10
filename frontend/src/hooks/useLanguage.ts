
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';
  
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, isRTL]);
  
  return {
    currentLanguage,
    isRTL,
    changeLanguage,
    languages: [
      { code: 'en', name: 'English', flag: '🇺🇸' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦' }
    ]
  };
};
