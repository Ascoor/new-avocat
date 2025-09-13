import React from 'react';
import { useI18n, I18nProvider } from '@/hooks/useI18n';
import ContentGuard from '@/utils/contentGuard';
import LandingHeader from '@/components/landing/LandingHeader';
import Hero from '@/components/landing/HeroSection';
import { ServicesSection } from '@/components/lawfirm/ServicesSection';
import { AboutSection } from '@/components/lawfirm/AboutSection';
import { ContactSection } from '@/components/lawfirm/ContactSection';
import FooterSection from '@/components/landing/FooterSection';
import ScrollToTop from '@/components/landing/ScrollToTop';

ContentGuard();

const LandingContent: React.FC = () => {
  const { t, dir, locale, setLocale } = useI18n(); 

  return ( 
         <div dir={dir} className="font-cairomin-h-screen bg-background">
      <LandingHeader />
      <main>
        <Hero />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <FooterSection />
      <ScrollToTop />
    </div>
  );
};

const LandingPage: React.FC = () => (
  <I18nProvider>
    <LandingContent />
  </I18nProvider>
);

export default LandingPage;
