import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; 
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Mail, Play, ShieldCheck, Sparkles } from "lucide-react";

import heroLegal1 from "@/assets/slides/hero-legal-1.png";
import heroDigital2 from "@/assets/slides/hero-digital-2.png";
import heroPartnership3 from "@/assets/slides/hero-partnership-3.png";
import HeroTeam from "@/assets/slides/hero-team-4..png";

type SlideCopy = {
  title: string;
  subtitle: string;
  bullets: string[];
};

type Slide = {
  id: number;
  image: string;
  overlay: string; 
  badge: {
    en: string;
    ar: string;
  };
  copy: Record<"en" | "ar", SlideCopy>;
};

const slides: Slide[] = [
  {
    id: 1,
    image: heroLegal1,
    overlay: "bg-gradient-to-r from-black/80 via-slate-900/60 to-transparent",
    badge: {
      en: "Flagship Litigation Unit",
      ar: "وحدة التقاضي الرئيسية",
    },
    copy: {
      en: {
        title: "Elite trial counsel for high-stakes mandates",
        subtitle:
          "Seasoned advocates and digital workflows protect your interests across MENA courts.",
        bullets: [
          "Strategic command of commercial, administrative, and criminal disputes.",
          "Secure evidence rooms and filings orchestrated with military precision.",
          "24/7 bilingual crisis desk for urgent injunctions and enforcement.",
        ],
      },
      ar: {
        title: "محامون نخبة للقضايا المصيرية",
        subtitle: "محامون مخضرمون وسير عمل رقمية تحمي مصالحك عبر محاكم المنطقة.",
        bullets: [
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
    badge: {
      en: "Digital Transformation",
      ar: "التحول الرقمي",
    },
    copy: {
      en: {
        title: "Operate your firm on a unified digital backbone",
        subtitle:
          "AI-enabled matter management delivers clarity, compliance, and profitability.",
        bullets: [
          "Predictive analytics score risk, value, and timelines before filing.",
          "Client dashboards report progress, fees, and key metrics in real time.",
          "Automated document assembly executes compliant contracts instantly.",
        ],
      },
      ar: {
        title: "شغّل مكتبك على بنية رقمية موحدة",
        subtitle: "إدارة القضايا بالذكاء الاصطناعي تمنحك الوضوح والامتثال والربحية.",
        bullets: [
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
    badge: {
      en: "Trusted Cross-Border Partner",
      ar: "شريك عبر الحدود",
    },
    copy: {
      en: {
        title: "Partnerships that scale across jurisdictions",
        subtitle:
          "Collaborative models align your teams with regulators, investors, and clients.",
        bullets: [
          "Integrated GCC and EU counsel network for seamless cross-border execution.",
          "Cybersecure collaboration rooms keep regulators and stakeholders in sync.",
          "Tailored playbooks align governance, compliance, and dispute strategies.",
        ],
      },
      ar: {
        title: "شراكات تتمدد عبر الولايات القضائية",
        subtitle: "نماذج تعاونية تنسق فرقك مع الجهات التنظيمية والمستثمرين والعملاء.",
        bullets: [
          "شبكة مستشارين في الخليج وأوروبا لتنفيذ عابر للحدود بلا انقطاع.",
          "غرف تعاون مؤمنة تحافظ على تزامن الجهات الرقابية وأصحاب المصلحة.",
          "دليل تشغيلي مصمم ينسق الحوكمة والامتثال واستراتيجيات النزاع.",
        ],
      },
    },
  },
];

const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
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
    document.querySelector("#capabilities")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeSlide = slidesCount ? slides[current % slidesCount] : undefined;

  if (!activeSlide) {
    return null;
  }

  const slideCopy = activeSlide.copy[isArabic ? "ar" : "en"];
  const badge = activeSlide.badge[isArabic ? "ar" : "en"];
  const demoLabel = isArabic ? "اطلب العرض التفاعلي" : "Request Live Demo";
  const contactLabel = isArabic ? "تواصل مع الخبراء" : "Speak to Counsel";

  return (
    <section id="home" className="relative h-[90vh] min-h-[640px] overflow-hidden" dir={direction}> 
      <div className="absolute inset-0">
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
            <div className={`absolute inset-0 ${slide.overlay}`} />  
          </div>
        ))}
      </div>
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl rounded-3xl bg-slate-950/60 p-6 shadow-ambient backdrop-blur lg:p-10 dark:bg-background/70">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-border/80 bg-card/80 px-4 py-2 text-xs font-semibold text-white/90 shadow-inner backdrop-blur">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>{badge}</span>
            </div>

            <div className={`space-y-6 text-white ${isArabic ? "text-right" : "text-left"}`}>
              <h1 className="text-4xl font-display font-semibold leading-tight drop-shadow lg:text-5xl">
                {slideCopy.title}
              </h1>
              <p className="text-lg leading-relaxed text-white/85">{slideCopy.subtitle}</p>
              <ul className="space-y-3 text-base">
                {slideCopy.bullets.map((item) => (
                  <li
                    key={item}
                    className={`flex items-start gap-3 ${isArabic ? "flex-row-reverse text-right" : ""}`}
                  >
                    <ShieldCheck className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={`mt-8 flex flex-col gap-4 sm:flex-row ${
                isArabic ? "sm:flex-row-reverse" : ""
              } sm:items-center`}
            >
              <Button
                onClick={handleDemoClick}
                className="btn-gold flex items-center justify-center gap-2 px-8 py-3 text-base font-semibold"
              >
                <Play className="h-5 w-5" />
                <span>{demoLabel}</span>
              </Button>
              <Button
                onClick={handleContactClick}
                variant="outline"
                className="btn-glass flex items-center justify-center gap-2 border-white/40 px-8 py-3 text-base font-semibold text-white"
              >
                <Mail className="h-5 w-5" />
                <span>{contactLabel}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
 
      <button
        onClick={handlePrev}
        className="absolute left-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-background/30 backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-background/50"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-6 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-background/30 backdrop-blur transition-all duration-300 hover:border-white/70 hover:bg-background/50"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

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

      <button
        onClick={() => setAutoPlay((prev) => !prev)}
        className="absolute bottom-8 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-background/40 backdrop-blur transition"
        aria-label="Toggle autoplay"
      >
        {autoPlay ? (
          <div className="h-2 w-2 rounded-full bg-white" />
        ) : (
          <Play className="h-4 w-4 text-white" />
        )}
      </button>
 
    </section>
  );
};

export default HeroCarousel;
