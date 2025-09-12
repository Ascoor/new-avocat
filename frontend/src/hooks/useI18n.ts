import React, { createContext, useContext, useState } from 'react';
import content from '@/content/site-content.json';

export type Locale = 'ar' | 'en';

interface I18nContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: (path: string) => any;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const resolvePath = (obj: any, path: string[], locale: Locale): any => {
  if (!obj) return undefined;
  if (path.length === 0) return obj;
  const [key, ...rest] = path;
  let next = obj[key];
  if (Array.isArray(next)) {
    next = next.map((item) => {
      if (item && typeof item === 'object' && ('ar' in item || 'en' in item)) {
        return item[locale];
      }
      return item;
    });
  } else if (next && typeof next === 'object' && ('ar' in next || 'en' in next)) {
    next = next[locale];
  }
  return resolvePath(next, rest, locale);
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>((content.site.defaultLocale as Locale) || 'ar');
  const t = (path: string) => resolvePath(content, path.split('.'), locale);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  return (
    <I18nContext.Provider value={{ locale, dir, t, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
