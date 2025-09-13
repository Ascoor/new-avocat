import React from 'react';
import { useTranslation } from 'react-i18next';
import { useUi } from '@/contexts';
import { useLanguage } from '@/contexts/LanguageContext';  // تأكد من الاستيراد بشكل صحيح
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  variant?: 'full' | 'icon';  // 'full' for logo with text, 'icon' for only the icon
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ variant = 'full', className }) => {
  const { theme } = useUi();
  const { language } = useLanguage();  // استخدام `useLanguage` هنا
  const { t } = useTranslation();

  const isDark = theme === 'dark';  // تحقق من ما إذا كان الوضع الداكن مفعلًا
  const isArabic = language === 'ar';  // تحقق من ما إذا كانت اللغة هي العربية

  let src: string;
  if (variant === 'icon') {
    // عند تصغير الشريط الجانبي، عرض الأيقونة فقط
    src = isDark ? '/images/logo-icon-dark.png' : '/images/logo-icon-light.png';
  } else {
    // عند توسيع الشريط الجانبي، عرض الشعار كاملًا
    if (isArabic) {
      // إذا كانت اللغة عربية
      src = isDark ? '/images/logo-full-arabic-dark.png' : '/images/logo-full-arabic-light.png';
    } else {
      // إذا كانت اللغة إنجليزية
      src = isDark ? '/images/logo-full-en-dark.png' : '/images/logo-full-en-light.png';
    }
  }

  return <img src={src} alt={t('brand.name')} className={cn('h-auto w-auto', className)} />;
};

export default BrandLogo;
