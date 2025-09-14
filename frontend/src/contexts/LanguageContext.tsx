import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './LanguageData';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Flattened translations object for backward compatibility
const flatTranslations = {
  ar: {
    // Legacy flat translations for backward compatibility
    ...Object.entries(translations.ar).reduce((acc, [section, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([key, value]) => {
          acc[`${section}.${key}`] = value;
        });
      }
      return acc;
    }, {} as Record<string, string>)
  },
  en: {
    // Legacy flat translations for backward compatibility
    ...Object.entries(translations.en).reduce((acc, [section, values]) => {
      if (typeof values === 'object') {
        Object.entries(values).forEach(([key, value]) => {
          acc[`${section}.${key}`] = value;
        });
      }
      return acc;
    }, {} as Record<string, string>)
  }
};


export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const stored = localStorage.getItem('avocat_language');
    return (stored as Language) || 'ar';
  });

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('avocat_language', language);
  }, [language]);

  const t = (key: string): string => {
    // Try nested access first
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to flat access for backward compatibility
        return flatTranslations[language][key as keyof typeof flatTranslations[typeof language]] || key;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value = {
    language,
    setLanguage,
    t,
    isRTL: language === 'ar'
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};