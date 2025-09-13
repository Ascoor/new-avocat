import React from 'react';
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-law-firm.jpg";
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

  
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-hero overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="hero-title mb-6 fade-in-up">
            {t('heroTitle')}
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 leading-relaxed fade-in-up delay-1">
            {t('heroSubtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up delay-2">
            <Button 
              onClick={scrollToContact}
              className="btn-hero shadow-gold"
            >
              {t('scheduleFree')}
            </Button>
            <Button 
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-outline-gold"
            >
              {t('exploreServices')}
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;