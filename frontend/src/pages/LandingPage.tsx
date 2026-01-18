import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Building2,
  ChartNoAxesCombined,
  ChevronLeft,
  ChevronRight,
  LineChart,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { LandingNavbar } from '@/components/landing/LandingNavbar';
import { BrandLogo } from '@/components/common/BrandLogo';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { blurVariants, revealVariants, staggerVariants } from '@/components/landing/landing-motion';
import { useCountUp } from '@/components/landing/useCountUp';

const LandingPage = () => {
  const { language, direction, toggleLanguage } = useLanguage();
  const reduceMotion = useReducedMotion();

  const copy = useMemo(
    () => ({
      en: {
        heroHeadline: 'Legal Digital Transformation',
        heroSubheadline:
          'AVOCAT unites legal precision with intelligent platforms to accelerate compliance, streamline contracts, and elevate client trust.',
        ctaPrimary: 'Book a Consultation',
        ctaSecondary: 'View Services',
        trustBadges: ['Regulated Expertise', 'Enterprise Ready', 'Global Compliance', 'Secure by Design'],
        stats: [
          { value: 97, label: 'Client satisfaction rate' },
          { value: 420, label: 'Cases optimized annually' },
          { value: 18, label: 'Countries under coverage' },
        ],
        aboutTitle: 'Designed for modern legal operations',
        aboutStory:
          'We combine litigation heritage with legal-tech acceleration, turning complex workflows into elegant digital journeys.',
        aboutMission:
          'Our mission is to help law firms and in-house teams protect, scale, and innovate with confidence.',
        features: [
          { icon: ShieldCheck, title: 'Risk Intelligence', text: 'Continuous monitoring with proactive compliance insights.' },
          { icon: LineChart, title: 'Performance Signals', text: 'Dashboards that translate legal outcomes into business metrics.' },
          { icon: Sparkles, title: 'Premium Client Experience', text: 'Personalized portals that elevate trust and retention.' },
        ],
        servicesTitle: 'Signature services',
        services: [
          {
            title: 'Contract Lifecycle Command',
            summary: 'Automated drafting, negotiation, and renewal workflows.',
            details: 'Smart clauses, stakeholder alerts, and audit-ready version history in a unified hub.',
          },
          {
            title: 'Regulatory Horizon',
            summary: 'Global compliance intelligence tailored to your jurisdiction.',
            details: 'Real-time updates, impact mapping, and executive-ready compliance reports.',
          },
          {
            title: 'Litigation Strategy Studio',
            summary: 'Evidence orchestration and scenario modeling.',
            details: 'AI-assisted brief assembly, timeline management, and predictive insights.',
          },
          {
            title: 'Corporate Governance Vault',
            summary: 'Board-ready governance workflows.',
            details: 'Meeting packs, approval trails, and policy tracking with controlled access.',
          },
          {
            title: 'Privacy & Security Lab',
            summary: 'Data protection frameworks that scale.',
            details: 'Risk mapping, DPIA automation, and breach response playbooks.',
          },
          {
            title: 'Client Success Layer',
            summary: 'Premium portals and concierge reporting.',
            details: 'Unified visibility into matter progress, budgets, and outcomes.',
          },
        ],
        achievementsTitle: 'Momentum & recognition',
        timeline: [
          { year: '2016', text: 'Founded with a mission to modernize legal service delivery.' },
          { year: '2019', text: 'Launched the Legal Aurora platform for enterprise clients.' },
          { year: '2022', text: 'Expanded to GCC and EU jurisdictions with bilingual support.' },
          { year: '2024', text: 'Recognized for excellence in legal-tech innovation.' },
        ],
        teamTitle: 'The AVOCAT collective',
        team: [
          { name: 'Leila Navarro', role: 'Managing Partner', specialty: 'Corporate Strategy' },
          { name: 'Omar Khoury', role: 'Head of Legal Tech', specialty: 'Automation & AI' },
          { name: 'Sara Miles', role: 'Client Success Lead', specialty: 'Premium Advisory' },
          { name: 'Nadia Karim', role: 'Compliance Director', specialty: 'Regulatory Affairs' },
        ],
        testimonialsTitle: 'Voices from our clients',
        testimonials: [
          {
            quote:
              'AVOCAT delivered a digital command center that transformed our contracting speed and governance clarity.',
            name: 'Natalie Brooks',
            role: 'General Counsel, Horizon Ventures',
          },
          {
            quote: 'Their bilingual team bridged jurisdictions seamlessly while keeping our board aligned.',
            name: 'Khalid Mansour',
            role: 'Chief Legal Officer, Atlas Holdings',
          },
          {
            quote: 'The Legal Aurora stack brought measurable ROI and a premium client experience.',
            name: 'Victoria Liu',
            role: 'VP Legal Ops, NovaPay',
          },
        ],
        contactTitle: 'Let’s architect your legal future',
        contactSubtitle: 'Share your goals and we will curate a tailored roadmap.',
        form: {
          name: 'Full name',
          email: 'Email address',
          message: 'Tell us about your objectives',
          submit: 'Send Request',
        },
        footerTitle: 'Legal Aurora by AVOCAT',
      },
      ar: {
        heroHeadline: 'التحول الرقمي القانوني',
        heroSubheadline:
          'أفوكات تمزج الدقة القانونية مع منصات ذكية لتسريع الامتثال وتبسيط العقود وتعزيز ثقة العملاء.',
        ctaPrimary: 'احجز استشارة',
        ctaSecondary: 'استعرض الخدمات',
        trustBadges: ['خبرة تنظيمية موثوقة', 'جاهزية مؤسسية', 'امتثال عالمي', 'أمان بمعايير عالية'],
        stats: [
          { value: 97, label: 'نسبة رضا العملاء' },
          { value: 420, label: 'قضية محسّنة سنويًا' },
          { value: 18, label: 'دولة ضمن نطاق العمل' },
        ],
        aboutTitle: 'تصميم يواكب عمليات القانون الحديثة',
        aboutStory:
          'نجمع إرث التقاضي مع تسارع التكنولوجيا القانونية لتحويل المسارات المعقدة إلى تجارب رقمية راقية.',
        aboutMission: 'مهمتنا تمكين الفرق القانونية من الحماية والتوسع والابتكار بثقة كاملة.',
        features: [
          { icon: ShieldCheck, title: 'ذكاء المخاطر', text: 'مراقبة مستمرة مع رؤى امتثال استباقية.' },
          { icon: LineChart, title: 'إشارات الأداء', text: 'لوحات تحوّل النتائج القانونية إلى مؤشرات أعمال.' },
          { icon: Sparkles, title: 'تجربة عميل فاخرة', text: 'بوابات مخصصة تعزز الثقة والاحتفاظ.' },
        ],
        servicesTitle: 'خدماتنا المميزة',
        services: [
          {
            title: 'قيادة دورة حياة العقود',
            summary: 'أتمتة الصياغة والتفاوض والتجديد.',
            details: 'بنود ذكية وتنبيهات أصحاب المصلحة وتاريخ نسخ جاهز للتدقيق.',
          },
          {
            title: 'أفق الامتثال التنظيمي',
            summary: 'ذكاء امتثال عالمي حسب الولاية القضائية.',
            details: 'تحديثات لحظية وتقييم تأثير وتقارير جاهزة للإدارة.',
          },
          {
            title: 'استوديو استراتيجية التقاضي',
            summary: 'تنظيم الأدلة ونمذجة السيناريوهات.',
            details: 'تجميع مذكرات مدعومة بالذكاء الاصطناعي وإدارة الجداول الزمنية.',
          },
          {
            title: 'خزينة الحوكمة المؤسسية',
            summary: 'سير عمل حوكمة جاهز للمجالس.',
            details: 'حزم اجتماعات ومسارات موافقات وتتبع سياسات بصلاحيات دقيقة.',
          },
          {
            title: 'مختبر الخصوصية والأمن',
            summary: 'أطر حماية بيانات قابلة للتوسع.',
            details: 'خرائط مخاطر وأتمتة تقييمات الأثر وخطط الاستجابة.',
          },
          {
            title: 'طبقة نجاح العملاء',
            summary: 'بوابات وتقارير راقية مخصصة.',
            details: 'رؤية موحدة لتقدم القضايا والميزانيات والنتائج.',
          },
        ],
        achievementsTitle: 'زخمنا وتميّزنا',
        timeline: [
          { year: '2016', text: 'انطلاقة برسالة تحديث تقديم الخدمات القانونية.' },
          { year: '2019', text: 'إطلاق منصة Legal Aurora للعملاء المؤسسيين.' },
          { year: '2022', text: 'توسعة إلى الخليج وأوروبا مع دعم ثنائي اللغة.' },
          { year: '2024', text: 'تكريم للابتكار في التكنولوجيا القانونية.' },
        ],
        teamTitle: 'فريق أفوكات',
        team: [
          { name: 'ليلى نافارو', role: 'الشريك الإداري', specialty: 'استراتيجية الشركات' },
          { name: 'عمر خوري', role: 'رئيس التقنية القانونية', specialty: 'الأتمتة والذكاء الاصطناعي' },
          { name: 'سارة مايلز', role: 'قائدة نجاح العملاء', specialty: 'استشارات مميزة' },
          { name: 'نادية كريم', role: 'مديرة الامتثال', specialty: 'الشؤون التنظيمية' },
        ],
        testimonialsTitle: 'أصوات من عملائنا',
        testimonials: [
          {
            quote: 'قدمت أفوكات مركز قيادة رقمي غيّر سرعة العقود ووضوح الحوكمة.',
            name: 'ناتالي بروكس',
            role: 'المستشارة العامة، Horizon Ventures',
          },
          {
            quote: 'فريقهم الثنائي اللغة جسر الأنظمة بسلاسة مع إبقاء مجلس الإدارة متوافقًا.',
            name: 'خالد منصور',
            role: 'كبير المسؤولين القانونيين، Atlas Holdings',
          },
          {
            quote: 'حزمة Legal Aurora جلبت عائدًا ملموسًا وتجربة عميل راقية.',
            name: 'فيكتوريا ليو',
            role: 'نائبة عمليات الشؤون القانونية، NovaPay',
          },
        ],
        contactTitle: 'دعنا نبني مستقبلك القانوني',
        contactSubtitle: 'شارك أهدافك لنصمم خارطة طريق مخصصة.',
        form: {
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          message: 'حدثنا عن أهدافك',
          submit: 'إرسال الطلب',
        },
        footerTitle: 'أورورا القانونية من أفوكات',
      },
    }),
    [],
  );

  const t = copy[language];

  const [expandedService, setExpandedService] = useState<number | null>(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});

  const { ref: statOneRef, value: statOne } = useCountUp(t.stats[0].value);
  const { ref: statTwoRef, value: statTwo } = useCountUp(t.stats[1].value);
  const { ref: statThreeRef, value: statThree } = useCountUp(t.stats[2].value);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % t.testimonials.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, t.testimonials.length]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const errors: typeof formErrors = {};

    if (!formValues.name.trim()) {
      errors.name = language === 'ar' ? 'الاسم مطلوب.' : 'Name is required.';
    }
    if (!formValues.email.trim()) {
      errors.email = language === 'ar' ? 'البريد مطلوب.' : 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formValues.email)) {
      errors.email = language === 'ar' ? 'صيغة البريد غير صحيحة.' : 'Enter a valid email.';
    }
    if (!formValues.message.trim()) {
      errors.message = language === 'ar' ? 'الرسالة مطلوبة.' : 'Message is required.';
    }

    setFormErrors(errors);
  };

  const testimonial = t.testimonials[testimonialIndex];

  return (
    <div dir={direction} className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <LandingNavbar />

      <main className="pt-24">
        <section id="home" className="relative overflow-hidden pb-20 pt-16">
          <div className="absolute inset-0 gradient-aurora" />
          <div className="absolute inset-0 noise-overlay opacity-60" />
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 lg:flex-row lg:items-center">
            <motion.div
              variants={staggerVariants}
              initial="hidden"
              animate="visible"
              className={cn('flex-1 space-y-6', direction === 'rtl' && 'text-right')}
            >
              <motion.span
                variants={revealVariants}
                className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.12)] px-4 py-2 text-xs uppercase tracking-[0.2em] text-[hsl(var(--primary-foreground))]"
              >
                <BadgeCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                Legal Aurora
              </motion.span>
              <motion.h1
                variants={revealVariants}
                className="text-4xl font-semibold leading-tight text-[hsl(var(--primary-foreground))] sm:text-5xl"
              >
                {t.heroHeadline}
              </motion.h1>
              <motion.p
                variants={revealVariants}
                className="max-w-xl text-base leading-relaxed text-[hsl(var(--primary-foreground)/0.8)]"
              >
                {t.heroSubheadline}
              </motion.p>
              <motion.div variants={revealVariants} className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] shadow-[var(--shadow-gold)]"
                >
                  {t.ctaPrimary}
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.2)] text-[hsl(var(--primary-foreground))]"
                >
                  {t.ctaSecondary}
                </Button>
              </motion.div>
            </motion.div>
            <motion.div
              variants={blurVariants}
              initial="hidden"
              animate="visible"
              className="relative flex-1"
            >
              <div className="absolute -top-8 right-6 h-24 w-24 rounded-full bg-[hsl(var(--neon)/0.25)] blur-3xl" />
              <div className="glass-hero relative overflow-hidden rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--primary-foreground)/0.7)]">
                      {language === 'ar' ? 'لوحة الأداء' : 'Command Deck'}
                    </p>
                    <p className="text-lg font-semibold text-[hsl(var(--primary-foreground))]">
                      {language === 'ar' ? 'تحليلات الامتثال' : 'Compliance Intelligence'}
                    </p>
                  </div>
                  <ChartNoAxesCombined className="h-5 w-5 text-[hsl(var(--gold))]" />
                </div>
                <div className="mt-6 space-y-4">
                  {[1, 2, 3].map((item) => (
                    <motion.div
                      key={item}
                      animate={reduceMotion ? {} : { opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: item * 0.4 }}
                      className="h-3 w-full rounded-full bg-[linear-gradient(90deg,hsl(var(--gold)/0.1),hsl(var(--gold)/0.45),hsl(var(--gold)/0.1))]"
                    />
                  ))}
                </div>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {[
                    { label: language === 'ar' ? 'العقود النشطة' : 'Active contracts', value: '128' },
                    { label: language === 'ar' ? 'تنبيهات المخاطر' : 'Risk alerts', value: '12' },
                    { label: language === 'ar' ? 'مؤشر الثقة' : 'Trust index', value: '94%' },
                    { label: language === 'ar' ? 'الأتمتة' : 'Automation', value: '82%' },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card)/0.2)] p-3"
                    >
                      <p className="text-xs text-[hsl(var(--primary-foreground)/0.7)]">{stat.label}</p>
                      <p className="text-lg font-semibold text-[hsl(var(--primary-foreground))]">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative -mt-10 pb-16">
          <div className="mx-auto grid w-full max-w-6xl gap-6 px-6">
            <div className="glass-panel flex flex-wrap items-center justify-between gap-4 rounded-3xl px-6 py-5">
              <div className="flex flex-wrap gap-3">
                {t.trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-1 text-xs font-medium text-[hsl(var(--foreground))]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-6 text-sm text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                  ISO 27001
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
                  GDPR Ready
                </div>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { ref: statOneRef, value: statOne, label: t.stats[0].label },
                { ref: statTwoRef, value: statTwo, label: t.stats[1].label },
                { ref: statThreeRef, value: statThree, label: t.stats[2].label },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-3xl px-6 py-6">
                  <p ref={stat.ref} className="text-3xl font-semibold text-[hsl(var(--gold))]">
                    {stat.value}+
                  </p>
                  <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          id="about"
          variants={revealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mx-auto w-full max-w-6xl px-6 py-16"
        >
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr]">
            <div className={cn('space-y-4', direction === 'rtl' && 'text-right')}>
              <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                {language === 'ar' ? 'قصتنا' : 'Our Story'}
              </p>
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.aboutTitle}</h2>
              <p className="text-base text-[hsl(var(--muted-foreground))]">{t.aboutStory}</p>
              <p className="text-base text-[hsl(var(--muted-foreground))]">{t.aboutMission}</p>
            </div>
            <div className="grid gap-4">
              {t.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={reduceMotion ? {} : { y: -4, scale: 1.01 }}
                  className="glass-panel rounded-3xl px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[hsl(var(--accent-soft))]">
                      <feature.icon className="h-5 w-5 text-[hsl(var(--accent-foreground))]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[hsl(var(--foreground))]">{feature.title}</p>
                      <p className="text-xs text-[hsl(var(--muted-foreground))]">{feature.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <section id="services" className="bg-[hsl(var(--card))] py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className={cn('mb-10 space-y-3', direction === 'rtl' && 'text-right')}>
              <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                {language === 'ar' ? 'الخدمات' : 'Services'}
              </p>
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.servicesTitle}</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {t.services.map((service, index) => (
                <motion.button
                  key={service.title}
                  whileHover={reduceMotion ? {} : { scale: 1.01 }}
                  onClick={() => setExpandedService(index === expandedService ? null : index)}
                  className={cn(
                    'glass-panel flex w-full flex-col gap-3 rounded-3xl px-6 py-5 text-left',
                    direction === 'rtl' && 'text-right',
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-[hsl(var(--foreground))]">{service.title}</p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{service.summary}</p>
                    </div>
                    <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
                      {expandedService === index
                        ? language === 'ar'
                          ? 'إخفاء'
                          : 'Hide'
                        : language === 'ar'
                          ? 'تفاصيل'
                          : 'Details'}
                    </span>
                  </div>
                  <AnimatePresence>
                    {expandedService === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.35, ease: 'easeOut' }}
                        className="text-sm text-[hsl(var(--muted-foreground))]"
                      >
                        {service.details}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="achievements" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className={cn('mb-10 space-y-3', direction === 'rtl' && 'text-right')}>
            <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
              {language === 'ar' ? 'الإنجازات' : 'Achievements'}
            </p>
            <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.achievementsTitle}</h2>
          </div>
          <div className="grid gap-6">
            {t.timeline.map((item) => (
              <motion.div
                key={item.year}
                whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.4 }}
                className="glass-panel flex flex-col gap-2 rounded-3xl px-6 py-5 sm:flex-row sm:items-center"
              >
                <span className="text-lg font-semibold text-[hsl(var(--gold))]">{item.year}</span>
                <span className="text-sm text-[hsl(var(--muted-foreground))]">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="team" className="bg-[hsl(var(--card))] py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className={cn('mb-10 space-y-3', direction === 'rtl' && 'text-right')}>
              <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                {language === 'ar' ? 'الفريق' : 'Team'}
              </p>
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.teamTitle}</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {t.team.map((member) => (
                <motion.div
                  key={member.name}
                  whileHover={reduceMotion ? {} : { y: -6 }}
                  className="group glass-panel relative overflow-hidden rounded-3xl px-5 py-6"
                >
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[hsl(var(--accent-soft))]">
                    <Users className="h-6 w-6 text-[hsl(var(--accent-foreground))]" />
                  </div>
                  <p className="text-base font-semibold text-[hsl(var(--foreground))]">{member.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{member.role}</p>
                  <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">{member.specialty}</p>
                  <div className="mt-4 flex gap-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-[10px] text-[hsl(var(--muted-foreground))]">
                      LinkedIn
                    </span>
                    <span className="rounded-full border border-[hsl(var(--border))] px-3 py-1 text-[10px] text-[hsl(var(--muted-foreground))]">
                      Email
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="testimonials" className="mx-auto w-full max-w-6xl px-6 py-16">
          <div className={cn('mb-10 space-y-3', direction === 'rtl' && 'text-right')}>
            <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
              {language === 'ar' ? 'الآراء' : 'Testimonials'}
            </p>
            <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.testimonialsTitle}</h2>
          </div>
          <div className="glass-panel relative overflow-hidden rounded-3xl px-8 py-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: reduceMotion ? 0 : 0.4 }}
                className={cn('space-y-4', direction === 'rtl' && 'text-right')}
              >
                <p className="text-lg text-[hsl(var(--foreground))]">“{testimonial.quote}”</p>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--gold))]">{testimonial.name}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{testimonial.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex items-center gap-3">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() =>
                  setTestimonialIndex((prev) => (prev - 1 + t.testimonials.length) % t.testimonials.length)
                }
                className="border-[hsl(var(--border))]"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => setTestimonialIndex((prev) => (prev + 1) % t.testimonials.length)}
                className="border-[hsl(var(--border))]"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-[hsl(var(--card))] py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className={cn('mb-10 space-y-3', direction === 'rtl' && 'text-right')}>
              <p className="text-sm uppercase tracking-[0.3em] text-[hsl(var(--muted-foreground))]">
                {language === 'ar' ? 'التواصل' : 'Contact'}
              </p>
              <h2 className="text-3xl font-semibold text-[hsl(var(--foreground))]">{t.contactTitle}</h2>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{t.contactSubtitle}</p>
            </div>
            <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
              <form onSubmit={handleSubmit} className="glass-panel space-y-4 rounded-3xl px-6 py-6">
                {(['name', 'email', 'message'] as const).map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor={field}>
                      {t.form[field]}
                    </label>
                    {field === 'message' ? (
                      <textarea
                        id={field}
                        rows={4}
                        value={formValues[field]}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, [field]: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                      />
                    ) : (
                      <input
                        id={field}
                        type={field === 'email' ? 'email' : 'text'}
                        value={formValues[field]}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, [field]: event.target.value }))
                        }
                        className="w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-4 py-3 text-sm text-[hsl(var(--foreground))] focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
                      />
                    )}
                    {formErrors[field] && (
                      <p className="text-xs text-[hsl(var(--gold))]">{formErrors[field]}</p>
                    )}
                  </div>
                ))}
                <Button type="submit" size="lg" className="w-full">
                  {t.form.submit}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
              <div className="space-y-4">
                <div className="glass-panel space-y-3 rounded-3xl px-6 py-6">
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-[hsl(var(--gold))]" />
                    <p className="text-sm">+971 4 555 0284</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-[hsl(var(--gold))]" />
                    <p className="text-sm">hello@avocatlegal.com</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[hsl(var(--gold))]" />
                    <p className="text-sm">DIFC Gate District, Dubai</p>
                  </div>
                </div>
                <div className="glass-panel rounded-3xl px-6 py-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-[hsl(var(--muted-foreground))]">
                    {language === 'ar' ? 'موقع المكتب' : 'Office Map'}
                  </p>
                  <div className="mt-4 flex h-40 items-center justify-center rounded-2xl border border-dashed border-[hsl(var(--border))] bg-[hsl(var(--background))]">
                    <Building2 className="h-6 w-6 text-[hsl(var(--muted-foreground))]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-[hsl(var(--border))] bg-[hsl(var(--background))]">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 lg:flex-row lg:items-center lg:justify-between">
          <div className={cn('space-y-2', direction === 'rtl' && 'text-right')}>
            <BrandLogo lang={language} />
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{t.footerTitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {['home', 'about', 'services', 'contact'].map((id) => (
              <a
                key={id}
                href={`#${id}`}
                className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--gold))]"
              >
                {language === 'ar'
                  ? { home: 'الرئيسية', about: 'عن أفوكات', services: 'الخدمات', contact: 'التواصل' }[id]
                  : { home: 'Home', about: 'About', services: 'Services', contact: 'Contact' }[id]}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle tone="light" />
            <Button
              type="button"
              variant="outline"
              onClick={toggleLanguage}
              className="border-[hsl(var(--border))]"
            >
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>
      </footer>

      {/*
      Example route usage:
      <Route path="/" element={<LandingPage />} />
      */}
    </div>
  );
};

export default LandingPage;
