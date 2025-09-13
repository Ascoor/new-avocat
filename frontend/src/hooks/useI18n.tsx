// src/contexts/I18nContext.tsx أو hooks/useI18n.ts (حسب مسارك)
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import content from '@/content/site-content.json';

export type Locale = 'ar' | 'en';

interface I18nContextValue {
  locale: Locale;
  dir: 'rtl' | 'ltr';
  t: <T = string>(path: string) => T;
  setLocale: (locale: Locale) => void;
  getRaw: <T = unknown>(path: string) => T;
}

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

// helpers
const getByPath = (obj: unknown, path: string[]): unknown =>
  path.reduce<unknown>((acc, k) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);

const localize = (value: unknown, locale: Locale): unknown => {
  if (Array.isArray(value)) return value.map((v) => localize(v, locale));
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    if ('ar' in record || 'en' in record) return localize(record[locale], locale);
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(record)) out[k] = localize(v, locale);
    return out;
  }
  return value;
};

const pickInitialLocale = (): Locale => {
  const saved = (typeof window !== 'undefined' && localStorage.getItem('locale')) as Locale | null;
  if (saved === 'ar' || saved === 'en') return saved;
  const fromContent = (content as { site?: { defaultLocale?: Locale } }).site?.defaultLocale;
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

  const t = <T = string>(path: string): T => {
    const raw = getByPath(content, path.split('.'));
    return localize(raw, locale) as T;
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
