import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type LogoVariant = "full" | "icon" | "static"; 

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = "full", className }) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';
  const isDark = theme === 'dark';

  const getLogoSrc = (): string => {
    switch (variant) {
      case 'icon':
        return isDark ? '/images/logo-icon-dark.png' : '/images/logo-icon-light.png';

      case 'static':
        // شعار ثابت، يتغير فقط حسب اللغة (بدون تأثير الوضع)
        return isArabic ? '/images/logo-arabic-light.png' : '/images/logo-full-en-light.png';

      case 'full':
      default:
        // شعار متأثر بالوضع واللغة
        if (isArabic) {
          return isDark ? '/images/logo-full-arabic-dark.png' : '/images/logo-full-arabic-light.png';
        }
        return isDark ? '/images/logo-full-en-dark.png' : '/images/logo-full-en-light.png';
    }
  };

  const getAltText = (): string => {
    return isArabic ? 'أفوكات' : 'Avocat';
  };

  return (
    <img
      src={getLogoSrc()}
      alt={getAltText()}
      className={cn('object-contain', className)}
      onError={(e) => {
        // Fallback لو الصورة مش موجودة
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
