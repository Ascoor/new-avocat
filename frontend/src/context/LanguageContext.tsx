import React, { createContext, useContext, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageContextType {
  language: 'en' | 'ar';
  toggleLanguage: () => void;
  isRTL: boolean;
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

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
    localStorage.setItem('avocat_language', newLang);
  };

  useEffect(() => {
    const saved = localStorage.getItem('avocat_language') as 'en' | 'ar' | null;
    const lang = saved === 'ar' || saved === 'en' ? saved : (i18n.language as 'en' | 'ar');
    setLanguage(lang);
    i18n.changeLanguage(lang);
  }, [i18n]);

  const isRTL = language === 'ar';

  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage,
      isRTL
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
