import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Scale, Shield, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Hero = () => {
  const { t, isRTL } = useLanguage();

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero"></div>
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-gold rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-glow rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gold-light border border-gold/20 text-gold-muted font-medium text-sm mb-8 animate-fade-in">
            <Shield className="w-4 h-4 mr-2 rtl:ml-2 rtl:mr-0" />
            {isRTL   ? 'خبراء التحول الرقمي المعتمدون' : 'Certified Digital Transformation Experts'}
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-in delay-200">
            <span className="block">{t('heroTitle')}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in delay-400">
            {t('heroSubtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in delay-600">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-muted text-primary font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 shadow-gold"
            >
              {t('getStarted')}
              <ArrowRight className={`w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 ${isRTL  ? 'rotate-180' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-4 text-lg transition-all duration-300 hover:scale-105"
            >
              {t('learnMore')}
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto animate-fade-in delay-800">
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Scale className="w-8 h-8 text-gold" />
              </div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">500+</div>
              <div className="text-primary-foreground/70 text-sm">
                {isRTL  ? 'قضية منجزة' : 'Cases Handled'}
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-gold" />
              </div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">50+</div>
              <div className="text-primary-foreground/70 text-sm">
                {isRTL  ? 'مكتب محاماة' : 'Law Firms'}
              </div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Shield className="w-8 h-8 text-gold" />
              </div>
              <div className="text-3xl font-bold text-primary-foreground mb-1">98%</div>
              <div className="text-primary-foreground/70 text-sm">
                {isRTL  ? 'معدل الرضا' : 'Satisfaction Rate'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;