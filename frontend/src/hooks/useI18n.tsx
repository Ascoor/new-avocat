// src/contexts/I18nContext.tsx أو hooks/useI18n.ts (حسب مسارك)
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import content from '@/content/site-content.json';

export type Locale = 'ar' | 'en';

type TFunc = <T = string>(path: string) => T;

interface I18nContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: TFunc;                          // ← مفيش unknown بعد كده
  setLocale: (locale: Locale) => void;
  getRaw: <T = unknown>(path: string) => T; // لو عايز ترجع الأصل بدون تعريب
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// helpers
const getByPath = (obj: any, path: string[]) =>
  path.reduce((acc, k) => (acc ? acc[k] : undefined), obj);

const localize = (value: any, locale: Locale): any => {
  if (Array.isArray(value)) return value.map((v) => localize(v, locale));
  if (value && typeof value === 'object') {
    if ('ar' in value || 'en' in value) return localize(value[locale], locale);
    const out: any = {};
    for (const [k, v] of Object.entries(value)) out[k] = localize(v as any, locale);
    return out;
  }
  return value;
};

const pickInitialLocale = (): Locale => {
  const saved = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
  if (saved === 'ar' || saved === 'en') return saved;
  const fromContent = (content as any)?.site?.defaultLocale as Locale | undefined;
  if (fromContent === 'ar' || fromContent === 'en') return fromContent;
  return 'ar';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(pickInitialLocale());
  const dir: 'rtl' | 'ltr' = locale === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.dir = dir;
    document.documentElement.lang = locale;
    localStorage.setItem('locale', locale);
  }, [dir, locale]);

  const t: TFunc = (path) => {
    const raw = getByPath(content, path.split('.'));
    return localize(raw, locale) as any;
  };

  const getRaw = <T,>(path: string): T => getByPath(content, path.split('.')) as T;

  const value = useMemo(() => ({ locale, dir, t, setLocale, getRaw }), [locale, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
};
