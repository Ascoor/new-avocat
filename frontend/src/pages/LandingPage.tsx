import React from 'react';
import { ArrowRight, Shield, Users, FileText, BarChart3, Gavel, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { useLanguage } from '@/hooks/useLanguage';

const Landing: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const features = [
    {
      icon: Gavel,
      title: isRTL ? 'إدارة القضايا' : 'Case Management',
      description: isRTL ? 'نظام شامل لإدارة ومتابعة جميع القضايا القانونية' : 'Comprehensive system for managing and tracking all legal cases'
    },
    {
      icon: Users,
      title: isRTL ? 'إدارة العملاء' : 'Client Management', 
      description: isRTL ? 'متابعة العملاء والوكلاء مع نظام تنبيهات ذكي' : 'Track clients and agents with smart notification system'
    },
    {
      icon: FileText,
      title: isRTL ? 'الوثائق القانونية' : 'Legal Documents',
      description: isRTL ? 'تنظيم وأرشفة جميع الوثائق والمستندات القانونية' : 'Organize and archive all legal documents and files'
    },
    {
      icon: BarChart3,
      title: isRTL ? 'التقارير التحليلية' : 'Analytics Reports',
      description: isRTL ? 'تقارير مفصلة حول الأداء والإحصائيات' : 'Detailed performance and statistical reports'
    },
    {
      icon: Shield,
      title: isRTL ? 'الأمان المتقدم' : 'Advanced Security',
      description: isRTL ? 'حماية البيانات الحساسة بأعلى معايير الأمان' : 'Protect sensitive data with highest security standards'
    },
    {
      icon: Globe,
      title: isRTL ? 'الوصول السحابي' : 'Cloud Access',
      description: isRTL ? 'وصول آمن من أي مكان وفي أي وقت' : 'Secure access from anywhere, anytime'
    }
  ];

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
              {isRTL ? 'مميزات النظام' : 'System Features'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {isRTL ? 'اكتشف كيف يمكن لنظام Avocat تحويل طريقة إدارة مكتبك القانوني' : 'Discover how Avocat can transform your legal office management'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
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
                    {feature.title}
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription className="text-base leading-relaxed">
                    {feature.description}
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
            {isRTL ? 'ابدأ رحلتك الرقمية اليوم' : 'Start Your Digital Journey Today'}
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            {isRTL ? 'انضم إلى المئات من المكاتب القانونية التي تثق في نظام Avocat' : 'Join hundreds of law firms that trust Avocat system'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild variant="glass" size="lg" className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white border-white/20">
              <Link to="/signup">
                {t('landing.cta.signup')}
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
                Avocat
              </h3>
              <p className="text-muted-foreground mb-4">
                {isRTL ? 'نظام إدارة المكاتب القانونية الأكثر تطوراً في المنطقة' : 'The most advanced legal office management system in the region'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isRTL ? 'الخدمات' : 'Services'}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{isRTL ? 'إدارة القضايا' : 'Case Management'}</li>
                <li>{isRTL ? 'إدارة العملاء' : 'Client Management'}</li>
                <li>{isRTL ? 'التقارير' : 'Reports'}</li>
                <li>{isRTL ? 'الأرشيف' : 'Archive'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{isRTL ? 'التواصل' : 'Contact'}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>info@avocat.com</li>
                <li>+966 11 123 4567</li>
                <li>{isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia'}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Avocat. {isRTL ? 'جميع الحقوق محفوظة' : 'All rights reserved'}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;