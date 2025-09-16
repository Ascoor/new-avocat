import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from './LanguageData';
import enCommon from '@/i18n/locales/en/common.json';
import arCommon from '@/i18n/locales/ar/common.json';

export type Language = 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void; // ✅ الإضافة الجديدة
  t: (key: string, vars?: Record<string, string | number>) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Flattened translations object for backward compatibility
const flattenTranslations = (
  source: Record<string, unknown>,
  prefix = '',
  target: Record<string, string> = {},
): Record<string, string> => {
  Object.entries(source).forEach(([key, value]) => {
    const nextKey = prefix ? prefix + '.' + key : key;
    if (typeof value === 'string') {
      target[nextKey] = value;
    } else if (value && typeof value === 'object') {
      flattenTranslations(value as Record<string, unknown>, nextKey, target);
    }
  });
  return target;
};

const extraTranslations: Record<Language, Record<string, unknown>> = {
  ar: arCommon as Record<string, unknown>,
  en: enCommon as Record<string, unknown>,
};

const flatTranslations: Record<Language, Record<string, string>> = {
  ar: {
    ...flattenTranslations(translations.ar),
    ...flattenTranslations(extraTranslations.ar),
  },
  en: {
    ...flattenTranslations(translations.en),
    ...flattenTranslations(extraTranslations.en),
  },
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

  const interpolate = (
    template: string,
    vars?: Record<string, string | number>,
  ) => {
    if (!vars) return template;
    return template.replace(/{{(\w+)}}/g, (match, name) =>
      Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : '',
    );
  };

  const t = (key: string, vars?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: unknown = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in (value as Record<string, unknown>)) {
        value = (value as Record<string, unknown>)[k];
      } else {
        const fallback = flatTranslations[language][key] ?? key;
        return interpolate(fallback, vars);
      }
    }

    if (typeof value === 'string') {
      return interpolate(value, vars);
    }

    const fallback = flatTranslations[language][key] ?? key;
    return interpolate(fallback, vars);
  };

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage, // ✅ إضافة الدالة
    t,
    isRTL: language === 'ar'
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
