import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type LogoVariant = "full" | "icon" | "static"; 

interface BrandLogoProps {
  variant?: LogoVariant;
  className?: string;
  lang?: 'ar' | 'en';   // لغة محددة لو عايز تفرضها
  showBoth?: boolean;   // لو عايز تعرض AR + EN مع بعض
}

const BrandLogo: React.FC<BrandLogoProps> = ({ variant = "full", className, lang, showBoth = false }) => {
  const { theme } = useTheme();
  const { i18n } = useTranslation();
  const currentLang: 'ar' | 'en' = lang ?? (i18n.language === 'ar' ? 'ar' : 'en');
  const isDark = theme === 'dark';

  const getLogoSrc = (lng: 'ar' | 'en'): string => {
    switch (variant) {
      case 'icon':
        return isDark ? '/images/logo-icon-dark.png' : '/images/logo-icon-light.png';

      case 'static':
        return lng === 'ar' 
          ? '/images/logo-arabic-light.png' 
          : '/images/logo-full-en-light.png';

      case 'full':
      default:
        if (lng === 'ar') {
          return isDark ? '/images/logo-full-arabic-dark.png' : '/images/logo-full-arabic-light.png';
        }
        return isDark ? '/images/logo-full-en-dark.png' : '/images/logo-full-en-light.png';
    }
  };

  const getAltText = (lng: 'ar' | 'en'): string => {
    return lng === 'ar' ? 'أفوكات' : 'Avocat';
  };

  const renderImage = (lng: 'ar' | 'en') => (
    <img
      key={lng}
      src={getLogoSrc(lng)}
      alt={getAltText(lng)}
      className={cn('object-contain', className)}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.style.display = 'none';
        const fallback = document.createElement('div');
        fallback.textContent = getAltText(lng);
        fallback.className = cn('font-bold text-primary', className);
        target.parentNode?.insertBefore(fallback, target);
      }}
    />
  );

  if (showBoth) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        {renderImage('ar')}
        {renderImage('en')}
      </div>
    );
  }

  return renderImage(currentLang);
};

export default BrandLogo;
