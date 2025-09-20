import React, { useMemo } from 'react';
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  FileText,
  Gavel,
  Globe,
  Mail,
  MapPin,
  Phone,
  Shield,
  Sparkles,
  Users as UsersIcon,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle,
} from '@/components/ui/glass-card';
import { useLanguage } from '@/contexts/LanguageContext';
import LandingNavbar from '@/components/landing/LandingNavbar';
import HeroSlider from '@/components/landing/HeroSlider';
import BrandLogo from '@/components/common/BrandLogo';

const featureIcons = [Gavel, UsersIcon, FileText, BarChart3, Shield, Globe];

const Landing: React.FC = () => {
  const { t, isRTL, language } = useLanguage();

  const features = useMemo(() => {
    const items = t('landing.features.items', { returnObjects: true }) as Record<
      string,
      { title?: string; description?: string }
    >;
    return Object.values(items ?? {});
  }, [t]);

  const services = useMemo(() => {
    const items = t('landing.services.items', { returnObjects: true }) as Record<
      string,
      { title?: string; description?: string }
    >;
    return Object.values(items ?? {});
  }, [t]);

  const footerServices = useMemo(() => {
    const items = t('landing.footer.services', { returnObjects: true }) as Record<string, string>;
    return Object.values(items ?? {});
  }, [t]);

  const contactDetails = t('landing.contact.details', { returnObjects: true }) as Record<string, string>;
  const contactLabels = t('landing.contact.info', { returnObjects: true }) as Record<string, string>;

  return (
    <div className="min-h-screen">
      <LandingNavbar />

      <div id="hero">
        <HeroSlider />
      </div>

      <section id="features" className="relative bg-background py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
              <Sparkles className="h-10 w-10 text-primary" />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                {t('landing.features.title')}
              </span>
            </div>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed text-muted-foreground">
              {t('landing.features.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length];
              return (
                <motion.div
                  key={`${feature.title}-${index}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <GlassCard variant="primary" hover="glow" className="group h-full">
                    <GlassCardHeader>
                      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-primary transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <GlassCardTitle className="mb-2 text-xl font-semibold">
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

      <section id="services" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
              <Briefcase className="h-10 w-10 text-primary" />
              <span>{t('landing.services.title')}</span>
            </div>
            <p className="mx-auto max-w-3xl text-xl text-muted-foreground">
              {t('landing.services.subtitle')}
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {services.map((service, index) => (
              <GlassCard key={`${service.title}-${index}`} className="p-6 text-center">
                <GlassCardHeader>
                  <GlassCardTitle className="mb-2 text-lg font-semibold">
                    {service.title}
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription>{service.description}</GlassCardDescription>
                </GlassCardContent>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-primary py-20">
        <div className="absolute inset-0 opacity-20 bg-grid-pattern" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              {t('landing.secondaryCta.title')}
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-white/90">
              {t('landing.secondaryCta.subtitle')}
            </p>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-semibold text-white bg-white/10 border-white/30 hover:bg-white/20"
            >
              <Link to="/register">
                {t('landing.secondaryCta.button')}
                <ArrowRight className={`ml-2 h-5 w-5 ${isRTL ? 'rotate-180 rtl:mr-2 rtl:ml-0' : ''}`} />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <section id="about" className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-8 flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
                <UsersIcon className="h-10 w-10 text-primary" />
                <span>{t('landing.about.title')}</span>
              </div>
              <div className="prose prose-lg mx-auto text-center">
                <p className="text-xl leading-relaxed text-muted-foreground">
                  {t('landing.about.subtitle')}
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {t('landing.about.mission')}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="contact" className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-4 flex items-center justify-center gap-3 text-4xl font-bold md:text-5xl">
              <Mail className="h-10 w-10 text-primary" />
              <span>{t('landing.contact.title')}</span>
            </div>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              {t('landing.contact.subtitle')}
            </p>
          </motion.div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard className="p-8">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        {t('landing.contact.form.name')}
                      </label>
                      <Input placeholder={t('landing.contact.form.name')} />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        {t('landing.contact.form.phone')}
                      </label>
                      <Input placeholder={t('landing.contact.form.phone')} />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t('landing.contact.form.email')}
                    </label>
                    <Input type="email" placeholder={t('landing.contact.form.email')} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      {t('landing.contact.form.subject')}
                    </label>
                    <Input placeholder={t('landing.contact.form.subject')} />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium">
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

            <motion.div
              initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{contactLabels.emailLabel}</h3>
                    <p className="text-muted-foreground">{contactDetails.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{contactLabels.phoneLabel}</h3>
                    <p className="text-muted-foreground">{contactDetails.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-primary">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-semibold">{contactLabels.addressLabel}</h3>
                    <p className="text-muted-foreground">{contactDetails.address}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-card">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <BrandLogo variant="text" className="h-12" lang={language} />
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 font-semibold">
                <Sparkles className="h-5 w-5 text-primary" />
                {t('landing.footer.servicesTitle')}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                {footerServices.map((service, index) => (
                  <li key={`${service}-${index}`}>{service}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 flex items-center gap-2 font-semibold">
                <Mail className="h-5 w-5 text-primary" />
                {t('landing.footer.contactTitle')}
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>{contactDetails.email}</li>
                <li>{contactDetails.phone}</li>
                <li>{contactDetails.address}</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-8 text-center text-muted-foreground">
            <p>
              &copy; 2024 {t('brand.name')}. {t('landing.footer.rights')}.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
