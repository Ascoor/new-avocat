// BrandLogo.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/contexts';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'full' | 'icon';  // 'full' for logo with text, 'icon' for only the icon
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const isDark = theme === 'dark';  // Check if dark mode is enabled
  const isArabic = language === 'ar';  // Check if language is Arabic

  let src: string;
  if (variant === 'icon') {
    // For collapsed sidebar, show icon only
    src = isDark ? '/images/logo-icon-dark.png' : '/images/logo-icon-light.png';
  } else {
    // For expanded sidebar, show full logo
    if (isArabic) {
      // For Arabic language
      src = isDark ? '/images/logo-full-arabic-dark.png' : '/images/logo-full-arabic-light.png';
    } else {
      // For English language
      src = isDark ? '/images/logo-full-en-dark.png' : '/images/logo-full-en-light.png'; // Dark or light theme for English logo
    }
  }

  return <img src={src} alt={t('brand.name')} className={cn('h-auto w-auto', className)} />;
};

export default BrandLogo;
