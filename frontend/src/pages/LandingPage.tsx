import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@/context/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { BrandLogo } from '@/components/common/BrandLogo';
import {
  Scale,
  Users,
  Building,
  Monitor,
  GraduationCap,
  Shield,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import heroImage from '@/assets/hero-legal.jpg';

const LandingPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();

  const services = [
    {
      icon: Scale,
      title: t('landing.services.items.0.title'),
      description: t('landing.services.items.0.description'),
    },
    {
      icon: Users,
      title: t('landing.services.items.1.title'),
      description: t('landing.services.items.1.description'),
    },
    {
      icon: Building,
      title: t('landing.services.items.2.title'),
      description: t('landing.services.items.2.description'),
    },
    {
      icon: Monitor,
      title: t('landing.services.items.3.title'),
      description: t('landing.services.items.3.description'),
    },
    {
      icon: GraduationCap,
      title: t('landing.services.items.4.title'),
      description: t('landing.services.items.4.description'),
    },
    {
      icon: Shield,
      title: t('landing.services.items.5.title'),
      description: t('landing.services.items.5.description'),
    },
  ];

  return ( 
      <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <BrandLogo variant="full" className="h-10 w-auto" />
              </div>
            </div>
            
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <LanguageToggle />
              <Link to="/login">
                <Button variant="ghost" className="hover:bg-white/10">
                  {t('landing.nav.login')}
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-primary hover:bg-primary/90 glow-effect">
                  {t('landing.nav.register')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in">
            <BrandLogo variant="full" className="mx-auto mb-8 h-24 w-auto" />
            <h1 className="heading-xl mb-6">
              {t('landing.hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
              {t('landing.hero.subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-80 font-medium">
              {t('landing.brand.slogan')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="min-w-[200px] bg-white/10 text-white border-white/30 hover:bg-white/20 backdrop-blur-sm transition-smooth"
                >
                  {t('landing.hero.cta_login')}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
              <Link to="/register">
                <Button 
                  size="lg"
                  className="min-w-[200px] bg-accent hover:bg-accent/90 text-accent-foreground font-semibold glow-effect animate-glow-pulse"
                >
                  {t('landing.hero.cta_register')}
                  <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="heading-lg mb-4 text-foreground">
              {t('landing.services.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('landing.services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card 
                  key={index} 
                  className="glass-card hover:shadow-elegant transition-smooth hover:scale-105"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-lg w-fit">
                      <IconComponent className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white animate-fade-in">
            <h2 className="heading-lg mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join Avocat today and experience the future of legal services management.
            </p>
            <Link to="/register">
                <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold min-w-[250px] glow-effect"
              >
                {t('landing.hero.cta_register')}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180' : ''}`} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <BrandLogo variant="full" className="h-10 w-auto mb-4" />
              <p className="text-sm opacity-80 max-w-md mb-4">
                {t('landing.brand.slogan')}
              </p>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">contact@avocat.com</span>
                </div>
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1-800-AVOCAT</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('landing.nav.services')}</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.services.items.0.title')}</a></li>
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.services.items.1.title')}</a></li>
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.services.items.2.title')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.footer.privacy')}</a></li>
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.footer.terms')}</a></li>
                <li><a href="#" className="hover:opacity-100 transition-smooth">{t('landing.footer.contact')}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8">
            <p className="text-center text-sm opacity-60">
              {t('landing.footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
