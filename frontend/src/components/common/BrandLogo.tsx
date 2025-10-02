import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { resolveAssetUrl } from '@/utils/asset';
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
    en: { light: 'storage/brand/icons/logo-icon-light.png', dark: 'storage/brand/icons/logo-icon-dark.png' },
    ar: { light: 'storage/brand/icons/logo-icon-light.png', dark: 'storage/brand/icons/logo-icon-dark.png' },
  },
  text: {
    en: { light: 'storage/brand/text/logo-text-en-light.png', dark: 'storage/brand/text/logo-text-en-dark.png' },
    ar: { light: 'storage/brand/text/logo-text-ar-light.png', dark: 'storage/brand/text/logo-text-ar-dark.png' },
  },
  full: {
    en: { light: 'storage/brand/full/logo-full-en-light.png', dark: 'storage/brand/full/logo-full-en-dark.png' },
    ar: { light: 'storage/brand/full/logo-full-arabic-light.png', dark: 'storage/brand/full/logo-full-arabic-dark.png' },
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
  const { getLocalizedValue } = useWebsiteContent('settings');

  // 🌍 detect language automatically unless overridden
  const currentLang: Locale = lang ?? (i18n.language?.startsWith("ar") ? "ar" : "en");

  // 🌑 detect theme mode
  const isDark = typeof dark === "boolean" ? dark : theme === "dark";
  const mode = isDark ? "dark" : "light";

  const iconLogos = useMemo(
    () => getLocalizedValue<LogoVariantPaths>('logo_icon', fallbackLogos.icon),
    [getLocalizedValue]
  );
  const textLogos = useMemo(
    () => getLocalizedValue<LogoVariantPaths>('logo_text', fallbackLogos.text),
    [getLocalizedValue]
  );
  const fullLogos = useMemo(
    () => getLocalizedValue<LogoVariantPaths>('logo_full', fallbackLogos.full),
    [getLocalizedValue]
  );
  const siteLogo = useMemo(
    () => getLocalizedValue<string>('site_logo', {
      ar: fallbackLogos.full.ar.light,
      en: fallbackLogos.full.en.light,
    }),
    [getLocalizedValue]
  );

  const logos: Record<LogoVariant, Localized<LogoVariantPaths>> = {
    icon: iconLogos,
    text: textLogos,
    full: fullLogos,
  };

  const selectedLogo = logos[variant][currentLang] ?? logos[variant].en ?? fallbackLogos[variant].en;
  const siteLogoPath = siteLogo[currentLang] ?? siteLogo.en;

  const fallbackLocaleLogo = fallbackLogos[variant][currentLang] ?? fallbackLogos[variant].en;
  const src = resolveAssetUrl(
    typeof selectedLogo === 'string' ? selectedLogo : selectedLogo?.[mode]
  ) ?? resolveAssetUrl(siteLogoPath)
    ?? resolveAssetUrl(
      typeof fallbackLocaleLogo === 'string' ? fallbackLocaleLogo : fallbackLocaleLogo?.[mode]
    );

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
