import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: 'en' | 'ar';
  /** Set the current language explicitly */
  changeLanguage: (lang: 'en' | 'ar') => void;
  /** Convenience toggle between Arabic and English */
  toggleLanguage: () => void;
  /** Whether the current language is RTL */
  isRTL: boolean;
  /** Available languages for the switcher */
  languages: { code: 'en' | 'ar'; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  /** Change the interface language and persist the choice */
  const changeLanguage = (lang: 'en' | 'ar') => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
    localStorage.setItem('avocat_language', lang);
  };

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  useEffect(() => {
    const saved = localStorage.getItem('avocat_language') as 'en' | 'ar' | null;
    const lang = saved === 'ar' || saved === 'en' ? saved : (i18n.language as 'en' | 'ar');
    changeLanguage(lang);
  }, [i18n]);

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [isRTL, language]);

  return (
    <LanguageContext.Provider value={{
      language,
      changeLanguage,
      toggleLanguage,
      isRTL,
      languages: [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'ar', name: 'العربية', flag: '🇸🇦' },
      ],
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
