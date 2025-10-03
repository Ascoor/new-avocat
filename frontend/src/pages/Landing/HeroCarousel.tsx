import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import type { Locale, Localized } from '@/types/website';
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  Play,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { smoothScrollToElement } from '@/utils/smoothScroll';
import { resolveAssetUrl } from '@/utils/asset';

import heroLegal1 from '@/assets/slides/hero-legal-1.png';
import heroDigital2 from '@/assets/slides/hero-digital-2.png';
import heroPartnership3 from '@/assets/slides/hero-partnership-3.png';
import heroTeam from '@/assets/slides/hero-team-4.png';

interface HeroSlide {
  id: number;
  badge: string;
  title: string;
  subtitle: string;
  bullets: string[];
  image?: string;
  overlay: string;
}

const overlayClasses = [
  'bg-gradient-to-r from-black/80 via-slate-900/60 to-transparent',
  'bg-gradient-to-r from-black/75 via-slate-900/55 to-transparent',
  'bg-gradient-to-r from-black/85 via-slate-900/55 to-transparent',
  'bg-gradient-to-r from-black/80 via-slate-900/60 to-transparent',
];

const fallbackSlides: Array<{
  id: number;
  overlay: string;
  image: string;
  badge: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
  bullets: Localized<string[]>;
}> = [
  {
    id: 1,
    overlay: overlayClasses[0],
    image: heroLegal1,
    badge: {
      en: 'Flagship Litigation Unit',
      ar: 'وحدة التقاضي الرئيسية',
    },
    title: {
      en: 'Elite trial counsel for high-stakes mandates',
      ar: 'محامون نخبة للقضايا المصيرية',
    },
    subtitle: {
      en: 'Seasoned advocates and digital workflows protect your interests across MENA courts.',
      ar: 'محامون مخضرمون وسير عمل رقمية تحمي مصالحك عبر محاكم المنطقة.',
    },
    bullets: {
      en: [
        'Strategic command of commercial, administrative, and criminal disputes.',
        'Secure evidence rooms and filings orchestrated with military precision.',
        '24/7 bilingual crisis desk for urgent injunctions and enforcement.',
      ],
      ar: [
        'إدارة استراتيجية للنزاعات التجارية والإدارية والجنائية.',
        'غرف أدلة مؤمنة وإيداعات منظمة بدقة عالية.',
        'مكتب طوارئ ثنائي اللغة على مدار الساعة للأوامر العاجلة والتنفيذ.',
      ],
    },
  },
  {
    id: 2,
    overlay: overlayClasses[1],
    image: heroDigital2,
    badge: {
      en: 'Digital Transformation',
      ar: 'التحول الرقمي',
    },
    title: {
      en: 'Operate your firm on a unified digital backbone',
      ar: 'شغّل مكتبك على بنية رقمية موحدة',
    },
    subtitle: {
      en: 'AI-enabled matter management delivers clarity, compliance, and profitability.',
      ar: 'إدارة القضايا بالذكاء الاصطناعي تمنحك الوضوح والامتثال والربحية.',
    },
    bullets: {
      en: [
        'Predictive analytics score risk, value, and timelines before filing.',
        'Client dashboards report progress, fees, and key metrics in real time.',
        'Automated document assembly executes compliant contracts instantly.',
      ],
      ar: [
        'تحليلات تنبؤية تقيم المخاطر والقيمة والزمن قبل التقديم.',
        'لوحات عملاء تعرض التقدم والرسوم والمؤشرات لحظة بلحظة.',
        'تجميع عقود آلي ينفذ مستندات متوافقة فوراً.',
      ],
    },
  },
  {
    id: 3,
    overlay: overlayClasses[2],
    image: heroPartnership3,
    badge: {
      en: 'Trusted Cross-Border Partner',
      ar: 'شريك عبر الحدود',
    },
    title: {
      en: 'Partnerships that scale across jurisdictions',
      ar: 'شراكات تتمدد عبر الولايات القضائية',
    },
    subtitle: {
      en: 'Collaborative models align your teams with regulators, investors, and clients.',
      ar: 'نماذج تعاونية تنسق فرقك مع الجهات التنظيمية والمستثمرين والعملاء.',
    },
    bullets: {
      en: [
        'Integrated GCC and EU counsel network for seamless cross-border execution.',
        'Cybersecure collaboration rooms keep regulators and stakeholders in sync.',
        'Tailored playbooks align governance, compliance, and dispute strategies.',
      ],
      ar: [
        'شبكة مستشارين في الخليج وأوروبا لتنفيذ عابر للحدود بلا انقطاع.',
        'غرف تعاون مؤمنة تحافظ على تزامن الجهات الرقابية وأصحاب المصلحة.',
        'دليل تشغيلي مصمم ينسق الحوكمة والامتثال واستراتيجيات النزاع.',
      ],
    },
  },
  {
    id: 4,
    overlay: overlayClasses[3],
    image: heroTeam,
    badge: {
      en: 'Elite Advisory Collective',
      ar: 'فريق الخبراء',
    },
    title: {
      en: 'Secure. Scalable. Simply Extraordinary.',
      ar: 'آمن. قابل للتوسع. استثنائي ببساطة.',
    },
    subtitle: {
      en: 'Dedicated expert pods blend legal mastery with bank-grade security for your most strategic matters.',
      ar: 'فرق خبراء متخصصة تجمع التميز القانوني مع أمان بمستوى البنوك لأهم قضاياك الاستراتيجية.',
    },
    bullets: {
      en: [
        'Specialized task forces align litigators, consultants, and technologists for every mandate.',
        'Real-time collaboration hubs keep clients, regulators, and partners perfectly synchronized.',
        'Proven transformation playbooks accelerate adoption across regional and global operations.',
      ],
      ar: [
        'فرق عمل متخصصة توحد المحامين والاستشاريين والخبراء التقنيين لكل تفويض قانوني.',
        'مراكز تعاون لحظية تبقي العملاء والجهات التنظيمية والشركاء في انسجام تام.',
        'أدلة تحول مجربة تسرّع الاعتماد عبر العمليات الإقليمية والعالمية.',
      ],
    },
  },
];

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { language } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === 'ar';
  const { loading, contentBlocks, getLocalizedValue, getValueForLocale } = useWebsiteContent('hero');

  const getString = useCallback(
    (key: string, fallback = ''): string => getValueForLocale<string>(key, locale) ?? fallback,
    [getValueForLocale, locale]
  );

  const slideNumbers = useMemo(() => {
    const numbers = new Set<number>();

    contentBlocks.forEach((block) => {
      const match = block.key.match(/^hero_slide_(\d+)_/);
      if (match) {
        numbers.add(Number(match[1]));
      }
    });

    if (numbers.size === 0) {
      fallbackSlides.forEach((slide) => numbers.add(slide.id));
    }

    return Array.from(numbers).sort((a, b) => a - b);
  }, [contentBlocks]);

  const slides: HeroSlide[] = useMemo(() => {
    return slideNumbers.map((id, index) => {
      const fallback = fallbackSlides.find((slide) => slide.id === id);

      const localizedImage = getLocalizedValue<string>('hero_slide_' + id + '_image');
      const localizedBullets = getLocalizedValue<string[]>('hero_slide_' + id + '_bullets', fallback?.bullets);

      const fallbackImage = fallback?.image ?? heroLegal1;
      const resolvedImage =
        resolveAssetUrl(localizedImage[locale] ?? localizedImage.en ?? undefined) ?? fallbackImage;
      const bullets = (
        localizedBullets[locale] ?? localizedBullets.en ?? fallback?.bullets?.en ?? []
      ).filter(Boolean);

      const badge =
        getValueForLocale<string>(
          `hero_slide_${id}_badge`,
          locale,
          fallback?.badge?.[locale] ?? fallback?.badge?.en ?? ''
        ) ?? (fallback?.badge?.[locale] ?? fallback?.badge?.en ?? '');

      const title =
        getValueForLocale<string>(
          `hero_slide_${id}_title`,
          locale,
          fallback?.title?.[locale] ?? fallback?.title?.en ?? ''
        ) ?? (fallback?.title?.[locale] ?? fallback?.title?.en ?? '');

      const subtitle =
        getValueForLocale<string>(
          `hero_slide_${id}_subtitle`,
          locale,
          fallback?.subtitle?.[locale] ?? fallback?.subtitle?.en ?? ''
        ) ?? (fallback?.subtitle?.[locale] ?? fallback?.subtitle?.en ?? '');

      return {
        id,
        badge,
        title,
        subtitle,
        bullets,
        image: resolvedImage,
        overlay: fallback?.overlay ?? overlayClasses[index % overlayClasses.length],
      };
    });
  }, [getLocalizedValue, getString, locale, slideNumbers]);

  const slidesCount = slides.length;

  useEffect(() => {
    if (!autoPlay || slidesCount <= 1) {
      return;
    }

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesCount);
    }, 6000);

    return () => clearInterval(timer);
  }, [autoPlay, slidesCount]);

  const handlePrev = () => {
    if (!slidesCount) return;
    setCurrent((prev) => (prev - 1 + slidesCount) % slidesCount);
  };

  const handleNext = () => {
    if (!slidesCount) return;
    setCurrent((prev) => (prev + 1) % slidesCount);
  };

  const demoCta = getString('hero_cta_demo_label');
  const contactCta = getString('hero_cta_contact_label');

  const scrollToSection = (selector: string) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      smoothScrollToElement(element, { offset: 90, duration: 900 });
    }
  };

  if (loading && !slidesCount) {
    return (
      <section id="home" className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
        <div className="flex h-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!slidesCount) {
    return null;
  }

  const activeSlide = slides[current];

  return (
    <section id="home" className="relative h-[80vh] min-h-[600px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-900" />

      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {slide.image ? (
              <img
                src={slide.image}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
            )}
            <div className={`absolute inset-0 ${slide.overlay}`} />
          </div>
        ))}
      </div>

      <div className="relative z-10 h-full">
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-6 py-16 lg:px-10">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-white/80">
            <Sparkles className="h-4 w-4" />
            <span>{activeSlide.badge}</span>
          </div>

          <div className="space-y-6 "dir={isArabic ? 'rtl' : 'ltr'}>
            <h1 className="text-4xl font-display font-extrabold text-white drop-shadow-lg lg:text-6xl">
              {activeSlide.title}
            </h1>
            <p className="max-w-3xl text-lg text-white/80 lg:text-xl">{activeSlide.subtitle}</p>

            <ul className="grid gap-3 text-sm text-white/80 lg:max-w-2xl">
              {activeSlide.bullets.map((bullet, idx) => (
                <li key={`${activeSlide.id}-bullet-${idx}`} className="flex items-start gap-3">
                  <ShieldCheck className="mt-0.5 h-5 w-5 text-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4 " dir={isArabic ? 'ltr' : 'rtl'}>
            <Button
              size="lg"
              className="btn-gold flex items-center gap-3 px-8 py-3 text-base shadow-gold"
              onClick={() => scrollToSection('#capabilities')}
            >
              <Play className="h-5 w-5" />
              <span>{demoCta}</span>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white/40 bg-white/10 px-8 py-3 text-base text-white backdrop-blur hover:bg-white/20"
              onClick={() => scrollToSection('#contact')}
            >
              <Mail className="h-5 w-5" />
              <span>{contactCta}</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-20 flex items-center justify-center gap-4">
        <div className="pointer-events-auto flex gap-2">
          <button
            type="button"
            onClick={handleNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:border-white/60 hover:bg-black/60"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={handlePrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur transition hover:border-white/60 hover:bg-black/60"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setCurrent(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={() => setAutoPlay((prev) => !prev)}
          className="pointer-events-auto ml-4 rounded-full border border-white/30 bg-black/30 px-4 py-1 text-xs uppercase tracking-widest text-white/70 backdrop-blur hover:border-white/50 hover:text-white"
        >
          {autoPlay ? 'Pause' : 'Play'}
        </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
