import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import type { Locale, Localized } from "@/types/website";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Mail,
  Play,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { smoothScrollToElement } from "@/utils/smoothScroll";

import heroLegal1 from "@/assets/slides/hero-legal-1.png";
import heroDigital2 from "@/assets/slides/hero-digital-2.png";
import heroPartnership3 from "@/assets/slides/hero-partnership-3.png";
import heroTeam from "@/assets/slides/hero-team-4.png";

type HeroSlideDefaults = {
  badge: Localized<string>;
  title: Localized<string>;
  subtitle: Localized<string>;
  bullets: Localized<string[]>;
};

type SlideDefinition = {
  id: number;
  image: string;
  overlay: string;
  defaults: HeroSlideDefaults;
};

const slideDefinitions: SlideDefinition[] = [
  {
    id: 1,
    image: heroLegal1,
    overlay: "bg-gradient-to-r from-black/80 via-slate-900/60 to-transparent",
    defaults: {
      badge: { en: "Flagship Litigation Unit", ar: "وحدة التقاضي الرئيسية" },
      title: {
        en: "Elite trial counsel for high-stakes mandates",
        ar: "محامون نخبة للقضايا المصيرية",
      },
      subtitle: {
        en: "Seasoned advocates and digital workflows protect your interests across MENA courts.",
        ar: "محامون مخضرمون وسير عمل رقمية تحمي مصالحك عبر محاكم المنطقة.",
      },
      bullets: {
        en: [
          "Strategic command of commercial, administrative, and criminal disputes.",
          "Secure evidence rooms and filings orchestrated with military precision.",
          "24/7 bilingual crisis desk for urgent injunctions and enforcement.",
        ],
        ar: [
          "إدارة استراتيجية للنزاعات التجارية والإدارية والجنائية.",
          "غرف أدلة مؤمنة وإيداعات منظمة بدقة عالية.",
          "مكتب طوارئ ثنائي اللغة على مدار الساعة للأوامر العاجلة والتنفيذ.",
        ],
      },
    },
  },
  {
    id: 2,
    image: heroDigital2,
    overlay: "bg-gradient-to-r from-black/75 via-slate-900/55 to-transparent",
    defaults: {
      badge: { en: "Digital Transformation", ar: "التحول الرقمي" },
      title: {
        en: "Operate your firm on a unified digital backbone",
        ar: "شغّل مكتبك على بنية رقمية موحدة",
      },
      subtitle: {
        en: "AI-enabled matter management delivers clarity, compliance, and profitability.",
        ar: "إدارة القضايا بالذكاء الاصطناعي تمنحك الوضوح والامتثال والربحية.",
      },
      bullets: {
        en: [
          "Predictive analytics score risk, value, and timelines before filing.",
          "Client dashboards report progress, fees, and key metrics in real time.",
          "Automated document assembly executes compliant contracts instantly.",
        ],
        ar: [
          "تحليلات تنبؤية تقيم المخاطر والقيمة والزمن قبل التقديم.",
          "لوحات عملاء تعرض التقدم والرسوم والمؤشرات لحظة بلحظة.",
          "تجميع عقود آلي ينفذ مستندات متوافقة فوراً.",
        ],
      },
    },
  },
  {
    id: 3,
    image: heroPartnership3,
    overlay: "bg-gradient-to-r from-black/85 via-slate-900/55 to-transparent",
    defaults: {
      badge: { en: "Trusted Cross-Border Partner", ar: "شريك عبر الحدود" },
      title: {
        en: "Partnerships that scale across jurisdictions",
        ar: "شراكات تتمدد عبر الولايات القضائية",
      },
      subtitle: {
        en: "Collaborative models align your teams with regulators, investors, and clients.",
        ar: "نماذج تعاونية تنسق فرقك مع الجهات التنظيمية والمستثمرين والعملاء.",
      },
      bullets: {
        en: [
          "Integrated GCC and EU counsel network for seamless cross-border execution.",
          "Cybersecure collaboration rooms keep regulators and stakeholders in sync.",
          "Tailored playbooks align governance, compliance, and dispute strategies.",
        ],
        ar: [
          "شبكة مستشارين في الخليج وأوروبا لتنفيذ عابر للحدود بلا انقطاع.",
          "غرف تعاون مؤمنة تحافظ على تزامن الجهات الرقابية وأصحاب المصلحة.",
          "دليل تشغيلي مصمم ينسق الحوكمة والامتثال واستراتيجيات النزاع.",
        ],
      },
    },
  },
  {
    id: 4,
    image: heroTeam,
    overlay: "bg-gradient-to-r from-black/80 via-slate-900/60 to-transparent",
    defaults: {
      badge: { en: "Elite Advisory Collective", ar: "فريق الخبراء" },
      title: {
        en: "Secure. Scalable. Simply Extraordinary.",
        ar: "آمن. قابل للتوسع. استثنائي ببساطة.",
      },
      subtitle: {
        en: "Dedicated expert pods blend legal mastery with bank-grade security for your most strategic matters.",
        ar: "فرق خبراء متخصصة تجمع التميز القانوني مع أمان بمستوى البنوك لأهم قضاياك الاستراتيجية.",
      },
      bullets: {
        en: [
          "Specialized task forces align litigators, consultants, and technologists for every mandate.",
          "Real-time collaboration hubs keep clients, regulators, and partners perfectly synchronized.",
          "Proven transformation playbooks accelerate adoption across regional and global operations.",
        ],
        ar: [
          "فرق عمل متخصصة توحد المحامين والاستشاريين والخبراء التقنيين لكل تفويض قانوني.",
          "مراكز تعاون لحظية تبقي العملاء والجهات التنظيمية والشركاء في انسجام تام.",
          "أدلة تحول مجربة تسرّع الاعتماد عبر العمليات الإقليمية والعالمية.",
        ],
      },
    },
  },
];

const ctaFallbacks: Record<string, Localized<string>> = {
  demo: {
    en: "Request Live Demo",
    ar: "اطلب العرض التفاعلي",
  },
  contact: {
    en: "Speak to Counsel",
    ar: "تواصل مع الخبراء",
  },
};

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { language } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { loading, getLocalizedValue, getValueForLocale } = useWebsiteContent("hero");

  const slides = useMemo(() => {
    return slideDefinitions.map(({ id, image, overlay, defaults }) => {
      const badge = getLocalizedValue<string>(`hero_slide_${id}_badge`, defaults.badge);
      const title = getLocalizedValue<string>(`hero_slide_${id}_title`, defaults.title);
      const subtitle = getLocalizedValue<string>(`hero_slide_${id}_subtitle`, defaults.subtitle);
      const bullets = getLocalizedValue<string[]>(`hero_slide_${id}_bullets`, defaults.bullets);

      return {
        id,
        image,
        overlay,
        badge,
        title,
        subtitle,
        bullets,
      };
    });
  }, [getLocalizedValue]);

  const slidesCount = slides.length;

  useEffect(() => {
    if (!autoPlay || slidesCount <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesCount);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay, slidesCount]);

  const handlePrev = () => {
    if (!slidesCount) return;
    setCurrent((prev) => (prev - 1 + slidesCount) % slidesCount);
    setAutoPlay(false);
  };

  const handleNext = () => {
    if (!slidesCount) return;
    setCurrent((prev) => (prev + 1) % slidesCount);
    setAutoPlay(false);
  };

  const goTo = (index: number) => {
    if (!slidesCount) return;
    setCurrent(index);
    setAutoPlay(false);
  };

  const handleDemoClick = () => {
    const section = document.querySelector<HTMLElement>("#capabilities");
    if (section) {
      smoothScrollToElement(section, { offset: 90, duration: 950 });
    }
  };

  const handleContactClick = () => {
    const section = document.querySelector<HTMLElement>("#contact");
    if (section) {
      smoothScrollToElement(section, { offset: 90, duration: 950 });
    }
  };

  const activeSlide = slidesCount ? slides[current % slidesCount] : undefined;
  if (!activeSlide) return null;

  const slideCopy = {
    title: activeSlide.title[locale] ?? "",
    subtitle: activeSlide.subtitle[locale] ?? "",
    bullets: activeSlide.bullets[locale] ?? [],
  };
  const badge = activeSlide.badge[locale] ?? "";
  const demoLabel = getValueForLocale("hero_cta_demo_label", locale, ctaFallbacks.demo[locale]);
  const contactLabel = getValueForLocale(
    "hero_cta_contact_label",
    locale,
    ctaFallbacks.contact[locale]
  );

  return (
    <section id="home" className="relative h-[90vh] min-h-[640px] overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/40">
          <Loader2 className="h-10 w-10 animate-spin text-white" />
        </div>
      )}
      {/* خلفية الشرائح */}
      <div className="absolute inset-0 ">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-out ${
              index === current ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-105"
            }`}
          >
<div
  className="absolute inset-0 bg-cover bg-center"
  style={{ backgroundImage: `url(${slide.image})` }}
/>
{/* Gradient overlay */}
<div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-glow opacity-80 mix-blend-multiply" />

          </div>
        ))}
      </div>

      {/* المحتوى */}
<div className="relative z-10 flex h-full items-center">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="max-w-4xl rounded-3xl bg-slate-950/60 p-6 shadow-ambient backdrop-blur lg:p-10 dark:bg-background/70">
      
      {/* Badge */}
      <div
        className={`mb-6 inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-xs font-semibold text-white/90 shadow-inner backdrop-blur ${
          isArabic ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <Sparkles className="h-4 w-4 text-accent" />
        <span>{badge}</span>
      </div>

      {/* النصوص */} 
<div className="space-y-6 text-white" dir={isArabic ? "rtl" : "ltr"}>
  <h1 className="text-4xl font-display font-semibold leading-tight drop-shadow lg:text-5xl">
    {slideCopy.title}
  </h1>
  <p className="text-lg leading-relaxed text-white/85">
    {slideCopy.subtitle}
  </p>
 

        <ul
          className="space-y-3 text-base" dir={isArabic ? "rtl" : "ltr"}  
        >
          {slideCopy.bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 "                
            >
              <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* الأزرار */}
      <div
        className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center  "
        dir={isArabic ? "ltr" : "rtl"}
      >
     
  {/* زر ذهبي مميز */}
 <Button
   variant="gold"
  onClick={handleDemoClick}
  className="btn-gold relative overflow-hidden flex items-center justify-center gap-2 px-10 py-3 text-base font-semibold rounded-lg shadow-gold transition-premium"
>
  <Play className="h-5 w-5 animate-float relative z-10 text-primary-foreground" />
  
  {/* النص بخط واضح */}
  <span className="relative z-10 text-primary-foreground">{demoLabel}</span>

  {/* لمعة خفيفة */}
  <span className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/50 to-transparent opacity-0 hover:opacity-20 transition-opacity duration-500"></span>
</Button>


  {/* زر زجاجي أنيق */}
 <Button
  onClick={handleContactClick}
  variant="premium"
  className="btn-glass flex items-center justify-center gap-2 px-10 py-3 text-base font-semibold rounded-lg border border-white/30 text-white shadow-ambient hover:shadow-glow transition-elegant"
>
  <Mail className="h-5 w-5 text-white" />
  <span className="relative z-10">{contactLabel}</span>
</Button>

      </div>
    </div>
  </div>
</div>

      {/* أزرار التنقل */}
      <button onClick={handlePrev} className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-background/30 backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-background/50" aria-label="Previous slide">
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button onClick={handleNext} className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-background/30 backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-background/50" aria-label="Next slide">
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* المؤشرات */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center space-x-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => goTo(index)}
            className={`h-2 rounded-full transition-all duration-500 ${
              index === current ? "w-10 bg-accent" : "w-3 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* زر تشغيل/إيقاف */}
      <button onClick={() => setAutoPlay((prev) => !prev)} className="absolute bottom-8 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-background/40 backdrop-blur transition" aria-label="Toggle autoplay">
        {autoPlay ? <div className="h-2 w-2 rounded-full bg-white" /> : <Play className="h-4 w-4 text-white" />}
      </button>
    </section>
  );
};

export default HeroCarousel;
