import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@/context';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'full' | 'icon';
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className }) => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { t } = useTranslation();

  const isDark = theme === 'dark';
  const isArabic = language === 'ar';

  let src: string;
  if (variant === 'icon') {
    src = isDark ? '/images/logo-icon-dark.png' : '/images/logo-icon-light.png';
  } else {
    if (isArabic) {
      src = isDark ? '/images/logo-arabic-dark.png' : '/images/logo-arabic-light.png';
    } else {
      src = '/images/logo-full.png';
    }
  }

  return <img src={src} alt={t('brand.name')} className={cn('h-auto w-auto', className)} />;
};

export default BrandLogo;
