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
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
    
    // Update document direction
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', newLang);
    
    // Save to localStorage
    localStorage.setItem('avocat_language', newLang);
  };

  useEffect(() => {
    // Check for saved language preference
    const savedLang = localStorage.getItem('avocat_language') as 'en' | 'ar' | null;
    if (savedLang && (savedLang === 'en' || savedLang === 'ar')) {
      setLanguage(savedLang);
      i18n.changeLanguage(savedLang);
      document.documentElement.setAttribute('dir', savedLang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', savedLang);
    }
  }, [i18n]);

  const isRTL = language === 'ar';

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