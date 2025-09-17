import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
// icons
import logoIconLight from '@/assets/brand/icons/logo-icon-light.png';
import logoIconDark from '@/assets/brand/icons/logo-icon-dark.png';

// text
import logoTextArLight from '@/assets/brand/text/logo-text-ar-light.png';
import logoTextArDark from '@/assets/brand/text/logo-text-ar-dark.png';

// full
import logoFullArLight from '@/assets/brand/full/logo-full-arabic-light.png';
import logoFullArDark from '@/assets/brand/full/logo-full-arabic-dark.png';
import logoFullEnLight from '@/assets/brand/full/logo-full-en-light.png';
import logoFullEnDark from '@/assets/brand/full/logo-full-en-dark.png';

export type LogoVariant = "icon" | "text" | "full";

interface BrandLogoProps {
  variant?: LogoVariant;   // 👈 icon | text | full
  className?: string;
  lang?: 'ar' | 'en';      // 👈 عربي أو إنجليزي (للنص أو الشعار الكامل)
  dark?: boolean;          // 👈 اختيار نسخة Light أو Dark
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  className,
  lang,
  dark = false,   // ✅ افتراضي Light
}) => {
  const { i18n } = useTranslation();

  // اللغة الحالية
  const currentLang: 'ar' | 'en' = lang ?? (i18n.language === 'ar' ? 'ar' : 'en');
  const mode = dark ? 'dark' : 'light';

  // ✅ مسارات الشعارات
const logos = {
  icon: {
    light: logoIconLight,
    dark: logoIconDark,
  },
  text: {
    ar: {
      light: logoTextArLight,
      dark: logoTextArDark,
    },
    en: {
      // ⚠️ مفيش عندك نص إنجليزي → fallback على العربي
      light: logoTextArLight,
      dark: logoTextArDark,
    },
  },
  full: {
    ar: {
      light: logoFullArLight,
      dark: logoFullArDark,
    },
    en: {
      light: logoFullEnLight,
      dark: logoFullEnDark,
    },
  },
};


  const getSrc = () => {
    if (variant === "icon") {
      return logos.icon[mode];
    }
    if (variant === "text") {
      return logos.text[currentLang][mode];
    }
    return logos.full[currentLang][mode];
  };

  const getAltText = (): string => {
    if (variant === "icon") return "Avocat Icon";
    if (variant === "text") return currentLang === "ar" ? "أفوكات" : "Avocat";
    return currentLang === "ar" ? "شعار أفوكات الكامل" : "Avocat Full Logo";
  };

  return (
    <img
      src={getSrc()}
      alt={getAltText()}
      className={cn('object-contain', className)}
    />
  );
};

export default BrandLogo;
