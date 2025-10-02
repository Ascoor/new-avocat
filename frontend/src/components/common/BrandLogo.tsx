import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import API_CONFIG from '@/config/config';
import type { Locale, Localized } from '@/types/website';

export type LogoVariant = "icon" | "text" | "full";

interface BrandLogoProps {
  variant?: LogoVariant;       // icon | text | full
  className?: string;
  lang?: "ar" | "en";          // force language if needed
  dark?: boolean;              // force light/dark mode if needed
}

type LogoVariantPaths = { light: string; dark: string };
type LogoContent = Localized<LogoVariantPaths>;

const fallbackLogos: Record<LogoVariant, LogoContent> = {
  icon: {
    en: { light: '/branding/icons/logo-icon-light.png', dark: '/branding/icons/logo-icon-dark.png' },
    ar: { light: '/branding/icons/logo-icon-light.png', dark: '/branding/icons/logo-icon-dark.png' },
  },
  text: {
    en: { light: '/branding/text/logo-text-en-light.png', dark: '/branding/text/logo-text-en-dark.png' },
    ar: { light: '/branding/text/logo-text-ar-light.png', dark: '/branding/text/logo-text-ar-dark.png' },
  },
  full: {
    en: { light: '/branding/full/logo-full-en-light.png', dark: '/branding/full/logo-full-en-dark.png' },
    ar: { light: '/branding/full/logo-full-arabic-light.png', dark: '/branding/full/logo-full-arabic-dark.png' },
  },
};

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  className,
  lang,
  dark,
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();
  const { getLocalizedValue } = useWebsiteContent("branding");

  // 🌍 detect language automatically unless overridden
  const currentLang: Locale = lang ?? (i18n.language?.startsWith("ar") ? "ar" : "en");

  // 🌑 detect theme mode
  const isDark = typeof dark === "boolean" ? dark : theme === "dark";
  const mode = isDark ? "dark" : "light";

  const logos = useMemo(() => {
    const icon = getLocalizedValue<LogoVariantPaths>("logo_icon", fallbackLogos.icon);
    const text = getLocalizedValue<LogoVariantPaths>("logo_text", fallbackLogos.text);
    const full = getLocalizedValue<LogoVariantPaths>("logo_full", fallbackLogos.full);

    return { icon, text, full };
  }, [getLocalizedValue]);

  const selectedLogo = logos[variant][currentLang] ?? logos[variant].en ?? fallbackLogos[variant].en;

  const resolveAssetUrl = (path?: string | null): string | undefined => {
    if (!path) return undefined;
    if (/^https?:\/\//.test(path) || path.startsWith('data:')) {
      return path;
    }
    const base = API_CONFIG.baseURL.replace(/\/$/, '');
    const relative = path.replace(/^\//, '');
    return `${base}/${relative}`;
  };

  const src = resolveAssetUrl(selectedLogo?.[mode]) ?? resolveAssetUrl(fallbackLogos[variant][currentLang]?.[mode]);

  // ✅ alt text for accessibility
  const getAltText = (): string => {
    if (variant === "icon") return "Avocat Icon";
    if (variant === "text")
      return currentLang === "ar" ? "أفوكات" : "Avocat";
    return currentLang === "ar"
      ? "شعار أفوكات الكامل"
      : "Avocat Full Logo";
  };

  if (!src) {
    return null;
  }

  return (
    <img
      src={src}
      alt={getAltText()}
      className={cn(
        "object-contain",
        currentLang === "ar" ? "rtl" : "ltr", // 👈 direction aware
        className
      )}
      dir={currentLang === "ar" ? "rtl" : "ltr"} // 👈 HTML dir attribute
    />
  );
};

export default BrandLogo;
