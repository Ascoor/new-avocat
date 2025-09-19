import React from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import { useTheme } from '@/contexts/ThemeContext';

// icons
import logoIconLight from '@/assets/brand/icons/logo-icon-light.png';
import logoIconDark from '@/assets/brand/icons/logo-icon-dark.png';

// text
import logoTextArLight from '@/assets/brand/text/logo-text-ar-light.png';
import logoTextArDark from '@/assets/brand/text/logo-text-ar-dark.png';
import logoTextEnLight from '@/assets/brand/text/logo-text-en-light.png';
import logoTextEnDark from '@/assets/brand/text/logo-text-en-dark.png';

// full
import logoFullArLight from '@/assets/brand/full/logo-full-arabic-light.png';
import logoFullArDark from '@/assets/brand/full/logo-full-arabic-dark.png';
import logoFullEnLight from '@/assets/brand/full/logo-full-en-light.png';
import logoFullEnDark from '@/assets/brand/full/logo-full-en-dark.png';

export type LogoVariant = "icon" | "text" | "full";

interface BrandLogoProps {
  variant?: LogoVariant;       // icon | text | full
  className?: string;
  lang?: "ar" | "en";          // force language if needed
  dark?: boolean;              // force light/dark mode if needed
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  className,
  lang,
  dark,
}) => {
  const { i18n } = useTranslation();
  const { theme } = useTheme();

  // 🌍 detect language automatically unless overridden
  const currentLang: "ar" | "en" =
    lang ?? (i18n.language?.startsWith("ar") ? "ar" : "en");

  // 🌑 detect theme mode
  const isDark = typeof dark === "boolean" ? dark : theme === "dark";
  const mode = isDark ? "dark" : "light";

  // 🎨 available logos
  const logos = {
    icon: {
      light: logoIconLight,
      dark: logoIconDark,
    },
    text: {
      ar: { light: logoTextArLight, dark: logoTextArDark },
      en: { light: logoTextEnLight, dark: logoTextEnDark },
    },
    full: {
      ar: { light: logoFullArLight, dark: logoFullArDark },
      en: { light: logoFullEnLight, dark: logoFullEnDark },
    },
  };

  // ✅ resolve src
  const getSrc = () => {
    if (variant === "icon") return logos.icon[mode];
    if (variant === "text") return logos.text[currentLang][mode];
    return logos.full[currentLang][mode];
  };

  // ✅ alt text for accessibility
  const getAltText = (): string => {
    if (variant === "icon") return "Avocat Icon";
    if (variant === "text")
      return currentLang === "ar" ? "أفوكات" : "Avocat";
    return currentLang === "ar"
      ? "شعار أفوكات الكامل"
      : "Avocat Full Logo";
  };

  return (
    <img
      src={getSrc()}
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
