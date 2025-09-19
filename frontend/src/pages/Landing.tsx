import React ,{useState}from 'react';
import { Shield, Users, FileText, BarChart3, Gavel, Globe, ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { GlassCard, GlassCardContent, GlassCardDescription, GlassCardHeader, GlassCardTitle } from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSlider from '@/components/landing/HeroSlider';

import BrandLogo from '@/components/common/BrandLogo';
import { useTheme } from 'next-themes';
const Landing: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const [isScrolled, setIsScrolled] = useState(false);
 
  const { theme } = useTheme();
  const rawFeatures = t('landing.features.items') as any;
  const features = (Array.isArray(rawFeatures) ? rawFeatures : [
    {
      title: isRTL ? 'إدارة القضايا الذكية' : 'Smart Case Management',
      description: isRTL
        ? 'نظام شامل لإدارة ومتابعة جميع القضايا القانونية مع تنبيهات تلقائية للمواعيد المهمة والجلسات القادمة'
        : 'Comprehensive system for managing and tracking all legal cases with automatic alerts for important dates and upcoming hearings',
    },
    {
      title: isRTL ? 'إدارة العملاء المتقدمة' : 'Advanced Client Management',
      description: isRTL
        ? 'قاعدة بيانات متكاملة لمتابعة العملاء والوكلاء مع نظام تنبيهات ذكي وإدارة الاتصالات والملفات الشخصية'
        : 'Integrated database for tracking clients and agents with smart notifications and profile management',
    },
    {
      title: isRTL ? 'الأرشفة الذكية للوثائق' : 'Smart Document Archiving',
      description: isRTL
        ? 'تنظيم وأرشفة جميع الوثائق والمستندات القانونية مع إمكانية البحث السريع والوصول الآمن من أي مكان'
        : 'Organize and archive all legal documents with fast search and secure access from anywhere',
    },
    {
      title: isRTL ? 'التقارير والتحليلات' : 'Reports and Analytics',
      description: isRTL
        ? 'تقارير تفصيلية ومؤشرات أداء شاملة تساعدك في اتخاذ قرارات مدروسة وتحليل أداء المكتب'
        : 'Detailed reports and comprehensive KPIs to help decision-making and performance analysis',
    },
    {
      title: isRTL ? 'الأمان المتقدم' : 'Advanced Security',
      description: isRTL
        ? 'حماية البيانات الحساسة بأعلى معايير الأمان والتشفير مع نظام صلاحيات متقدم وتسجيل العمليات'
        : 'Protect sensitive data with top encryption, advanced permissions, and audit logs',
    },
    {
      title: isRTL ? 'الوصول السحابي' : 'Cloud Access',
      description: isRTL
        ? 'وصول آمن من أي مكان وفي أي وقت عبر الهاتف أو الحاسوب مع تزامن تلقائي للبيانات'
        : 'Secure access from anywhere on any device with automatic data sync',
    },
  ]) as Array<{ title: string; description: string }>;

  const featureIcons = [Gavel, Users, FileText, BarChart3, Shield, Globe];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <LandingNavbar />

      {/* Hero Section with Slider */}
      <div id="hero">
        <HeroSlider />
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background relative">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              {t('landing.features.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = featureIcons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard
                    variant="primary"
                    hover="glow"
                    className="group h-full"
                  >
                    <GlassCardHeader>
                      <div className="h-14 w-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <GlassCardTitle className="text-xl font-semibold mb-2">
                        {feature.title}
                      </GlassCardTitle>
                    </GlassCardHeader>
                    <GlassCardContent>
                      <GlassCardDescription className="text-base leading-relaxed">
                        {feature.description}
                      </GlassCardDescription>
                    </GlassCardContent>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section (placeholder for future expansion) */}
      <section id="services" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('nav.services')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {isRTL 
                ? 'خدمات شاملة ومتخصصة لإدارة مكتبك القانوني بأعلى معايير الجودة والاحترافية'
                : 'Comprehensive and specialized services for managing your law firm with the highest standards of quality and professionalism'
              }
            </p>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {[
              { title: isRTL ? 'إدارة القضايا' : 'Case Management', desc: isRTL ? 'نظام متكامل لإدارة القضايا' : 'Integrated case management system' },
              { title: isRTL ? 'إدارة العملاء' : 'Client Management', desc: isRTL ? 'متابعة شاملة للعملاء' : 'Comprehensive client tracking' },
              { title: isRTL ? 'الأرشيف الرقمي' : 'Digital Archive', desc: isRTL ? 'أرشفة آمنة للوثائق' : 'Secure document archiving' },
              { title: isRTL ? 'التقارير' : 'Reports', desc: isRTL ? 'تقارير تفصيلية ومؤشرات' : 'Detailed reports and metrics' },
            ].map((service, index) => (
              <GlassCard key={index} className="text-center p-6">
                <GlassCardHeader>
                  <GlassCardTitle className="text-lg font-semibold mb-2">
                    {service.title}
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription>
                    {service.desc}
                  </GlassCardDescription>
                </GlassCardContent>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Secondary CTA Section */}
      <section className="py-20 bg-gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {t('landing.secondaryCta.title')}
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('landing.secondaryCta.subtitle')}
            </p>
            <Button 
              asChild 
              variant="outline" 
              size="lg" 
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 font-semibold text-lg px-8 py-4"
            >
              <Link to="/register">
                {t('landing.secondaryCta.cta')}
                <ArrowRight className={`h-5 w-5 ml-2 ${isRTL ? 'rotate-180 ml-0 mr-2' : ''}`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">
                {t('landing.about.title')}
              </h2>
              <div className="prose prose-lg max-w-none text-center">
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {t('landing.about.content')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('landing.contact.title')}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('landing.contact.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('landing.contact.form.name')}
                      </label>
                      <Input placeholder={t('landing.contact.form.name')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t('landing.contact.form.phone')}
                      </label>
                      <Input placeholder={t('landing.contact.form.phone')} />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('landing.contact.form.email')}
                    </label>
                    <Input type="email" placeholder={t('landing.contact.form.email')} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('landing.contact.form.subject')}
                    </label>
                    <Input placeholder={t('landing.contact.form.subject')} />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('landing.contact.form.message')}
                    </label>
                    <Textarea 
                      placeholder={t('landing.contact.form.message')} 
                      className="min-h-[120px]"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    {t('landing.contact.form.submit')}
                  </Button>
                </form>
              </GlassCard>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {t('landing.contact.form.email')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('landing.contact.info.email')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {t('landing.contact.form.phone')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('landing.contact.info.phone')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">
                      {isRTL ? 'العنوان' : 'Address'}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('landing.contact.info.address')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <BrandLogo
                variant="text"
                className="h-12"
                lang={language}
              />
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.services')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{isRTL ? 'إدارة القضايا' : 'Case Management'}</li>
                <li>{isRTL ? 'إدارة العملاء' : 'Client Management'}</li>
                <li>{isRTL ? 'التقارير' : 'Reports'}</li>
                <li>{isRTL ? 'الأرشيف' : 'Archive'}</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">{t('landing.footer.contact')}</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{t('landing.contact.info.email')}</li>
                <li>{t('landing.contact.info.phone')}</li>
                <li>{t('landing.contact.info.address')}</li>
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
