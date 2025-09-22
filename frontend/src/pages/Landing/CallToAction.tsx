import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Sparkles, Zap } from 'lucide-react';

const CallToAction: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-glow"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent rounded-full blur-2xl animate-float"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-white rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-accent-glow rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-white rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      {/* Geometric Patterns */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-16 h-16 border-2 border-white rotate-45 animate-spin" style={{ animationDuration: '20s' }}></div>
    <div className="absolute top-32 right-16 w-12 h-12 border-2 border-accent rotate-45 animate-spin-reverse"></div>
    <div className="absolute bottom-16 left-1/4 w-20 h-20 border-2 border-white rotate-45 animate-spin" style={{ animationDuration: '25s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center animate-fade-in">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-8 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center animate-glow">
            <Sparkles className="w-12 h-12 text-accent animate-pulse" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight animate-slide-up">
            {t('ctaTitle')}
          </h2>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '200ms' }}>
            {t('ctaSubtitle')}
          </p>

          {/* Features List */}
          <div className="flex flex-wrap justify-center gap-6 mb-12 animate-slide-up" style={{ animationDelay: '400ms' }}>
            {[
              '✅ Free 30-Day Trial',
              '🚀 Instant Setup',
              '💡 24/7 Expert Support',
              '🔒 Bank-Level Security'
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up ${
            isRTL ? 'sm:flex-row-reverse' : ''
          }`} style={{ animationDelay: '600ms' }}>
            
            <Button 
              size="lg" 
              className="btn-gold text-xl px-12 py-6 h-auto group shadow-gold hover:shadow-xl hover:scale-105 transition-all duration-300"
              onClick={() => window.open('#demo', '_blank')}
            >
              <Play className="w-6 h-6 mr-3 rtl:ml-3 rtl:mr-0 group-hover:scale-110 transition-transform duration-300" />
              <span className="font-semibold">Get Free Demo</span>
              <Zap className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
            
            <Button 
              size="lg" 
              variant="outline"
              className="btn-glass text-xl px-12 py-6 h-auto group hover:bg-white/30 border-2 border-white/50"
              onClick={scrollToContact}
            >
              <span className="font-semibold">Contact Sales</span>
              <ArrowRight className="w-6 h-6 ml-3 rtl:mr-3 rtl:ml-0 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300" />
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-fade-in" style={{ animationDelay: '800ms' }}>
            <p className="text-white/70 text-sm mb-6">Trusted by leading law firms across MENA</p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[
                'Baker McKenzie Style Firm',
                'Regional Legal Leader',
                'International Law Group',
                'Corporate Legal Dept',
                'Government Entity'
              ].map((client, index) => (
                <div 
                  key={index}
                  className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-lg text-white text-sm font-medium hover:bg-white/30 transition-all duration-300"
                >
                  {client}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Message */}
          <div className="mt-12 animate-pulse">
            <p className="text-white/80 text-lg font-medium">
              🌟 Join the Legal Digital Revolution Today!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;