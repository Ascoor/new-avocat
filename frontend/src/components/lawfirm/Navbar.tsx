import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';

export const Navbar = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  return (
    <nav className="fixed top-0 w-full bg-background/80 backdrop-blur z-50 shadow-elegant border-b border-border/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="font-bold text-xl text-foreground">Avocat</div>
        <ul className={`hidden md:flex gap-6 font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
          <li><a href="#home" className="nav-link">{t('lawlanding.nav.home')}</a></li>
          <li><a href="#services" className="nav-link">{t('lawlanding.nav.services')}</a></li>
          <li><a href="#about" className="nav-link">{t('lawlanding.nav.about')}</a></li>
          <li><a href="#contact" className="nav-link">{t('lawlanding.nav.contact')}</a></li>
        </ul>
        <LanguageSwitcher />
      </div>
    </nav>
  );
};
