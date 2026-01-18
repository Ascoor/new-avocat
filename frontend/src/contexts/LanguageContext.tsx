import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

type TranslateFn = <T = string>(key: string) => T;

interface LanguageContextType {
  language: Language;
  direction: Direction;
  isRTL: boolean;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  t: TranslateFn;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);
const STORAGE_KEY = 'lang';

const getInitialLanguage = (): Language => {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  const resolved: Language = stored === 'ar' || stored === 'en'
    ? stored
    : window.navigator.language?.startsWith('ar')
      ? 'ar'
      : 'en';

  const root = window.document.documentElement;
  root.lang = resolved;
  root.dir = resolved === 'ar' ? 'rtl' : 'ltr';

  return resolved;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage());

  useEffect(() => {
    const root = document.documentElement;
    root.lang = language;
    root.dir = language === 'ar' ? 'rtl' : 'ltr';
    window.localStorage.setItem(STORAGE_KEY, language);
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage((prev) => (prev === 'ar' ? 'en' : 'ar'));
  }, []);

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const t = useCallback(<T = string,>(key: string) => key as T, []);

  const value = useMemo(
    () => ({
      language,
      direction,
      isRTL: direction === 'rtl',
      setLanguage,
      toggleLanguage,
      t,
    }),
    [language, direction, setLanguage, toggleLanguage, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
