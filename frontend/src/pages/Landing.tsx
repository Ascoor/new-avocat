import React from 'react';
import { ArrowRight, Shield, Users, FileText, BarChart3, Gavel, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';

const Landing: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const featureItems = [
    { icon: Gavel, key: 'caseManagement' },
    { icon: Users, key: 'clientManagement' },
    { icon: FileText, key: 'documentAutomation' },
    { icon: BarChart3, key: 'analytics' },
    { icon: Shield, key: 'security' },
    { icon: Globe, key: 'cloudAccess' }
  ] as const;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
              {t('landing.hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-scale-in">
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                <Link to="/signup">
                  {t('landing.cta.signup')}
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Link>
              </Button>
              <Button asChild variant="glass" size="lg" className="w-full sm:w-auto">
                <Link to="/login">
                  {t('landing.cta.login')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featureItems.map((feature, index) => (
              <GlassCard
                key={index}
                variant="primary"
                hover="glow"
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <GlassCardHeader>
                  <div className="h-12 w-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <GlassCardTitle className="text-xl font-semibold">
                    {t(`landing.features.items.${feature.key}.title`)}
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription className="text-base leading-relaxed">
                    {t(`landing.features.items.${feature.key}.description`)}
                  </GlassCardDescription>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('landing.secondaryCta.title')}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {t('landing.secondaryCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="glass" size="lg" className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/20">
              <Link to="/signup">
                {t('landing.secondaryCta.button')}
                <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-4">
                {t('brand.name')}
              </h3>
              <p className="text-muted-foreground mb-4">
                {t('landing.footer.tagline')}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.servicesTitle')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t('landing.footer.services.caseManagement')}</li>
                <li>{t('landing.footer.services.clientManagement')}</li>
                <li>{t('landing.footer.services.reports')}</li>
                <li>{t('landing.footer.services.archive')}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.contactTitle')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t('landing.footer.contact.email')}</li>
                <li>{t('landing.footer.contact.phone')}</li>
                <li>{t('landing.footer.contact.address')}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 {t('brand.name')}. {t('landing.footer.rights')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
