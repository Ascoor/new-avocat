import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight,
  Gavel,
  Users,
  FileText,
  BarChart3,
  Shield,
  Globe,
  Handshake,
  Layers,
  Headset,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  GlassCard,
  GlassCardContent,
  GlassCardDescription,
  GlassCardHeader,
  GlassCardTitle
} from '@/components/ui/glass-card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import LanguageToggle from '@/components/ui/language-toggle';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const SLIDE_INTERVAL = 8000;

const Landing: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const slides = useMemo(
    () =>
      ['slide1', 'slide2', 'slide3'].map((key) => ({
        key,
        title: t(`landing.hero.slides.${key}.title`),
        description: t(`landing.hero.slides.${key}.description`),
        cta: t(`landing.hero.slides.${key}.cta`)
      })),
    [t]
  );

  const anchorLinks = useMemo(
    () => [
      { key: 'home', href: '#home', label: t('landing.nav.home') },
      { key: 'features', href: '#features', label: t('landing.nav.features') },
      { key: 'services', href: '#services', label: t('landing.nav.services') },
      { key: 'about', href: '#about', label: t('landing.nav.about') },
      { key: 'contact', href: '#contact', label: t('landing.nav.contact') }
    ],
    [t]
  );

  const featureItems = useMemo(
    () => [
      { icon: Gavel, key: 'caseManagement' },
      { icon: Users, key: 'clientManagement' },
      { icon: FileText, key: 'documentAutomation' },
      { icon: BarChart3, key: 'analytics' },
      { icon: Shield, key: 'security' },
      { icon: Globe, key: 'cloudAccess' }
    ],
    []
  );

  const serviceItems = useMemo(
    () => [
      { icon: Handshake, key: 'onboarding' },
      { icon: Layers, key: 'customization' },
      { icon: Headset, key: 'support' }
    ],
    []
  );

  const aboutHighlights = useMemo(
    () => [
      { key: 'experience' },
      { key: 'compliance' },
      { key: 'delivery' }
    ],
    []
  );

  const [currentSlide, setCurrentSlide] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    setNavOpen(false);
  }, [isRTL]);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: t('common.error'),
        description: t('auth.validation.required')
      });
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      toast({
        title: t('common.success'),
        description: t('landing.contact.form.success')
      });
      setSubmitting(false);
      setContactForm({ name: '', email: '', phone: '', message: '' });
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" id="home">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="section-shell flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2 text-lg font-semibold gradient-text">
            {t('brand.name')}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {anchorLinks.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-sm font-medium text-text-soft transition-colors hover:text-primary"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageToggle />
            <Button asChild variant="ghost" size="sm" className="text-sm font-medium">
              <Link to="/login">{t('landing.nav.login')}</Link>
            </Button>
            <Button asChild variant="hero" size="sm" className="font-semibold">
              <Link to="/signup">
                {t('landing.nav.signup')}
                <ArrowRight className={cn('ml-2 h-4 w-4', isRTL && 'rotate-180')} />
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => setNavOpen((prev) => !prev)}
              aria-expanded={navOpen}
              aria-label={navOpen ? t('common.close') : t('common.menu')}
            >
              {navOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {navOpen && (
          <div className="md:hidden">
            <div className="section-shell space-y-4 pb-6">
              <nav className="flex flex-col gap-3" aria-label="Mobile">
                {anchorLinks.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setNavOpen(false)}
                    className="text-base font-medium text-text-soft transition-colors hover:text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline">
                  <Link to="/login" onClick={() => setNavOpen(false)}>
                    {t('landing.nav.login')}
                  </Link>
                </Button>
                <Button asChild variant="hero">
                  <Link to="/signup" onClick={() => setNavOpen(false)}>
                    {t('landing.nav.signup')}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-hero py-24 sm:py-32" id="hero">
          <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>
          <div className="section-shell relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div className="space-y-6 text-white">
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">
                  {t('brand.name')}
                </p>
                <div className="relative overflow-hidden">
                  {slides.map((slide, index) => (
                    <div
                      key={slide.key}
                      className={cn(
                        'transition-all duration-700',
                        index === currentSlide ? 'opacity-100 translate-y-0' : 'pointer-events-none -translate-y-4 opacity-0'
                      )}
                      aria-hidden={index !== currentSlide}
                    >
                      <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
                        {slide.title}
                      </h1>
                      <p className="mt-6 max-w-3xl text-lg text-white/85 sm:text-xl">
                        {slide.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start gap-4 sm:flex-row">
                <Button asChild variant="hero" size="lg" className="shadow-glow">
                  <Link to="/signup">
                    {t('landing.hero.ctaPrimary')}
                    <ArrowRight className={cn('ml-2 h-5 w-5', isRTL && 'rotate-180')} />
                  </Link>
                </Button>
                <Button asChild variant="glass" size="lg" className="bg-white/15 text-white hover:bg-white/25">
                  <Link to="#contact">{t('landing.hero.ctaSecondary')}</Link>
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.key}
                    type="button"
                    onClick={() => setCurrentSlide(index)}
                    className={cn(
                      'h-2.5 w-6 rounded-full transition-all duration-300',
                      index === currentSlide ? 'bg-white' : 'bg-white/30 hover:bg-white/55'
                    )}
                    aria-label={slide.title}
                    aria-pressed={index === currentSlide}
                  />
                ))}
              </div>
            </div>

            <GlassCard variant="primary" hover="glow" className="relative overflow-hidden text-white">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent"></div>
              <GlassCardHeader className="relative space-y-3">
                <GlassCardTitle className="text-2xl font-semibold">
                  {t('landing.features.title')}
                </GlassCardTitle>
                <GlassCardDescription className="text-sm text-white/80">
                  {t('landing.features.subtitle')}
                </GlassCardDescription>
              </GlassCardHeader>
              <GlassCardContent className="relative">
                <ul className="space-y-3 text-sm text-white/85">
                  {featureItems.slice(0, 4).map((item) => (
                    <li key={item.key} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4" />
                      <span>{t(`landing.features.items.${item.key}.title`)}</span>
                    </li>
                  ))}
                </ul>
              </GlassCardContent>
            </GlassCard>
          </div>
        </section>

        <section className="relative bg-surface-100 py-20 sm:py-24" id="features">
          <div className="pattern-overlay absolute inset-0 opacity-60"></div>
          <div className="section-shell relative">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-display-xl font-semibold text-text-strong">
                {t('landing.features.title')}
              </h2>
              <p className="mx-auto max-w-3xl text-base text-text-muted sm:text-lg">
                {t('landing.features.subtitle')}
              </p>
            </div>
            <div className="responsive-stack">
              {featureItems.map((feature, index) => (
                <GlassCard
                  key={feature.key}
                  variant="primary"
                  hover="lift"
                  className="h-full bg-card/70"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <GlassCardHeader>
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white">
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <GlassCardTitle className="text-xl font-semibold text-text-strong">
                      {t(`landing.features.items.${feature.key}.title`)}
                    </GlassCardTitle>
                  </GlassCardHeader>
                  <GlassCardContent>
                    <GlassCardDescription className="text-base leading-relaxed text-text-muted">
                      {t(`landing.features.items.${feature.key}.description`)}
                    </GlassCardDescription>
                  </GlassCardContent>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20 sm:py-24" id="services">
          <div className="mb-12 text-center">
            <h2 className="text-display-xl font-semibold text-text-strong">
              {t('landing.services.title')}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-text-muted sm:text-lg">
              {t('landing.services.subtitle')}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {serviceItems.map((service) => (
              <GlassCard key={service.key} variant="primary" hover="glow" className="bg-gradient-card">
                <GlassCardHeader className="space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-primary text-white">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <GlassCardTitle className="text-xl font-semibold text-text-strong">
                    {t(`landing.services.items.${service.key}.title`)}
                  </GlassCardTitle>
                </GlassCardHeader>
                <GlassCardContent>
                  <GlassCardDescription className="text-base leading-relaxed text-text-muted">
                    {t(`landing.services.items.${service.key}.description`)}
                  </GlassCardDescription>
                </GlassCardContent>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-primary py-20 sm:py-24">
          <div className="absolute inset-0 bg-grid-pattern opacity-25"></div>
          <div className="section-shell relative z-10 text-center text-white">
            <h2 className="text-display-xl font-semibold">
              {t('landing.secondaryCta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
              {t('landing.secondaryCta.subtitle')}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild variant="glass" size="lg" className="bg-white/20 text-white hover:bg-white/30">
                <Link to="/signup">
                  {t('landing.secondaryCta.button')}
                  <ArrowRight className={cn('ml-2 h-5 w-5', isRTL && 'rotate-180')} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="section-shell grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]" id="about">
          <div className="space-y-6">
            <h2 className="text-display-xl font-semibold text-text-strong">
              {t('landing.about.title')}
            </h2>
            <p className="text-lg text-text-muted">
              {t('landing.about.subtitle')}
            </p>
            <p className="text-base text-text-muted">
              {t('landing.about.mission')}
            </p>
            <ul className="space-y-3 text-base text-text-strong">
              {aboutHighlights.map((item) => (
                <li key={item.key} className="flex items-start gap-2 text-text-strong">
                  <CheckCircle2 className="mt-1 h-5 w-5 text-primary" />
                  <span>{t(`landing.about.highlights.${item.key}`)}</span>
                </li>
              ))}
            </ul>
          </div>

          <GlassCard variant="primary" hover="lift" className="bg-gradient-card">
            <GlassCardHeader>
              <GlassCardTitle className="text-2xl font-semibold text-text-strong">
                {t('landing.contact.title')}
              </GlassCardTitle>
              <GlassCardDescription className="text-base text-text-muted">
                {t('landing.contact.subtitle')}
              </GlassCardDescription>
            </GlassCardHeader>
            <GlassCardContent>
              <div className="space-y-4 text-sm text-text-muted">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>{t('landing.contact.details.email')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>{t('landing.contact.details.phone')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{t('landing.contact.details.address')}</span>
                </div>
              </div>
            </GlassCardContent>
          </GlassCard>
        </section>

        <section className="bg-surface-100 py-20 sm:py-24" id="contact">
          <div className="section-shell grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-display-lg font-semibold text-text-strong">
                {t('landing.contact.title')}
              </h2>
              <p className="text-base text-text-muted sm:text-lg">
                {t('landing.contact.subtitle')}
              </p>
              <div className="space-y-4 text-text-muted">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-strong">{t('landing.contact.info.emailLabel')}</p>
                    <p>{t('landing.contact.details.email')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-strong">{t('landing.contact.info.phoneLabel')}</p>
                    <p>{t('landing.contact.details.phone')}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-text-strong">{t('landing.contact.info.addressLabel')}</p>
                    <p>{t('landing.contact.details.address')}</p>
                  </div>
                </div>
              </div>
            </div>

            <GlassCard variant="default" className="bg-card/80">
              <form className="space-y-5" onSubmit={handleContactSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">{t('landing.contact.form.name')}</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, name: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">{t('landing.contact.form.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactForm.email}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, email: event.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{t('landing.contact.form.phone')}</Label>
                  <Input
                    id="phone"
                    value={contactForm.phone}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{t('landing.contact.form.message')}</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    value={contactForm.message}
                    onChange={(event) => setContactForm((prev) => ({ ...prev, message: event.target.value }))}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={submitting}>
                  {submitting ? t('common.loading') : t('landing.contact.form.submit')}
                </Button>
              </form>
            </GlassCard>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="section-shell grid gap-10 py-16 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold gradient-text">{t('brand.name')}</h3>
            <p className="max-w-md text-sm text-text-muted">{t('landing.footer.tagline')}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-strong">
              {t('landing.footer.servicesTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>{t('landing.footer.services.caseManagement')}</li>
              <li>{t('landing.footer.services.clientManagement')}</li>
              <li>{t('landing.footer.services.reports')}</li>
              <li>{t('landing.footer.services.archive')}</li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-strong">
              {t('landing.footer.quickLinksTitle')}
            </h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>{t('landing.footer.quickLinks.privacy')}</li>
              <li>{t('landing.footer.quickLinks.terms')}</li>
              <li>{t('landing.footer.quickLinks.support')}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/70 py-6">
          <div className="section-shell flex flex-col gap-4 text-sm text-text-muted md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <p>{t('landing.footer.contact.email')}</p>
              <p>{t('landing.footer.contact.phone')}</p>
              <p>{t('landing.footer.contact.address')}</p>
            </div>
            <p className="text-center md:text-right">&copy; 2024 {t('brand.name')}. {t('landing.footer.rights')}.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
