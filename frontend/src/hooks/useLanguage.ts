import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const isRTL = currentLanguage === 'ar';

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

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
