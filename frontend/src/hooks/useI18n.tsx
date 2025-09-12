import React, { createContext, useContext, useState } from 'react';
import content from '@/content/site-content.json';

export type Locale = 'ar' | 'en';

interface I18nContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: (path: string) => unknown;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

const isLocaleObject = (value: unknown): value is Record<Locale, unknown> =>
  !!value && typeof value === 'object' && ('ar' in value || 'en' in value);

const resolvePath = (obj: unknown, path: string[], locale: Locale): unknown => {
  if (!obj) return undefined;
  if (path.length === 0) return obj;
  const [key, ...rest] = path;
  let next = (obj as Record<string, unknown>)[key];
  if (Array.isArray(next)) {
    next = next.map((item) => (isLocaleObject(item) ? item[locale] : item));
  } else if (isLocaleObject(next)) {
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
