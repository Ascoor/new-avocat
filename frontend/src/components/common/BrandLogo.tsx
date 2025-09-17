import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type LogoVariant = "full" | "icon" | "static";

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  lang?: 'ar' | 'en';   // 👈 force Arabic/English
  dark?: boolean;       // 👈 force dark/light regardless of theme
}

const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = "full",
  className,
  lang,
  dark,
}) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();

  // ✅ stable overrides
  const currentLang: 'ar' | 'en' = lang ?? (i18n.language === 'ar' ? 'ar' : 'en');
  const isDark = dark !== undefined ? dark : theme === 'dark';

  const getLogoSrc = (): string => {
    switch (variant) {
      case 'icon':
        return isDark
          ? '/images/logo-icon-dark.png'
          : '/images/logo-icon-light.png';

      case 'static':
        // شعار ثابت، يتأثر فقط باللغة
        return currentLang === 'ar'
          ? '/images/logo-arabic-light.png'
          : '/images/logo-full-en-light.png';

      case 'full':
      default:
        if (currentLang === 'ar') {
          return isDark
            ? '/images/logo-full-arabic-dark.png'
            : '/images/logo-full-arabic-light.png';
        }
        return isDark
          ? '/images/logo-full-en-dark.png'
          : '/images/logo-full-en-light.png';
    }
  };

  const getAltText = (): string => {
    return currentLang === 'ar' ? 'أفوكات' : 'Avocat';
  };

  return (
    <img
      src={getLogoSrc()}
      alt={getAltText()}
      className={cn('object-contain', className)}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.textContent = getAltText();
        fallback.className = cn('font-bold text-primary', className);
        target.parentNode?.insertBefore(fallback, target);
      }}
    />
  );
};

export default BrandLogo;
