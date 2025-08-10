import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import { LanguageSwitcher } from '@/components/common/LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur z-50 shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-900 dark:text-blue-200">Avocat</div>
        <ul className={`hidden md:flex gap-6 font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
          <li><a href="#home" className="hover:text-blue-600">{t('lawlanding.nav.home')}</a></li>
          <li><a href="#services" className="hover:text-blue-600">{t('lawlanding.nav.services')}</a></li>
          <li><a href="#about" className="hover:text-blue-600">{t('lawlanding.nav.about')}</a></li>
          <li><a href="#contact" className="hover:text-blue-600">{t('lawlanding.nav.contact')}</a></li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
