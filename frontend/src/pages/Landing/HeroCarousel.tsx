import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronLeft, ChevronRight, Mail, Play, ShieldCheck, Sparkles } from "lucide-react";

import heroLegal1 from "@/assets/slides/hero-legal-1.png";
import heroDigital2 from "@/assets/slides/hero-digital-2.png";
import heroPartnership3 from "@/assets/slides/hero-partnership-3.png";

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
    overlay: "bg-gradient-to-r from-primary/90 via-primary/70 to-transparent",
    badge: {
      en: "Legal Digital Transformation",
      ar: "التحول الرقمي القانوني",
    },
    copy: {
      en: {
        title: "Prestige Meets Predictive Legal Intelligence",
        subtitle:
          "Founded in 2013, Avocat Law Firm bridges traditional expertise with digital innovation to deliver justice that is safer, more transparent, and more efficient.",
        bullets: [
          "Heritage-grade litigation strategies enhanced with secure analytics.",
          "Trusted counsel for ministries, financial institutions, and innovators.",
          "Digitally preserved evidence chains with verifiable audit trails.",
        ],
      },
      ar: {
        title: "الفخامة تلتقي بالذكاء القانوني الاستباقي",
        subtitle:
          "تأسس مكتب أفوكات عام 2013 ليكون جسراً بين الخبرة القانونية التقليدية والابتكار الرقمي، بهدف تقديم عدالة أكثر أماناً وشفافية وفعالية.",
        bullets: [
          "استراتيجيات تقاضٍ عريقة مدعومة بتحليلات آمنة.",
          "استشارات موثوقة للوزارات والمؤسسات المالية ورواد الابتكار.",
          "سلاسل أدلة رقمية محفوظة مع سجلات تدقيق موثوقة.",
        ],
      },
    },
  },
  {
    id: 2,
    image: heroDigital2,
    overlay: "bg-gradient-to-r from-primary-light/90 via-primary/60 to-accent/20",
    badge: {
      en: "AI-Driven Counsel",
      ar: "استشارات مدعومة بالذكاء الاصطناعي",
    },
    copy: {
      en: {
        title: "AI-Enhanced Advocacy Without Compromise",
        subtitle:
          "Intelligent systems for case management, precedent research, and data-driven legal strategies.",
        bullets: [
          "Predictive analytics anticipates judicial patterns before hearings.",
          "Augmented research assistant surfaces decisive precedents instantly.",
          "Secure collaboration keeps partners, experts, and clients aligned.",
        ],
      },
      ar: {
        title: "مرافعات مدعومة بالذكاء الاصطناعي دون تنازل",
        subtitle:
          "أنظمة ذكية لإدارة القضايا، البحث في السوابق، وبناء استراتيجيات قانونية قائمة على البيانات.",
        bullets: [
          "تحليلات تنبؤية تستشرف توجهات القضاء قبل الجلسة.",
          "مساعد بحث معزز يستحضر السوابق الحاسمة فوراً.",
          "تعاون مؤمن يحافظ على مواءمة الشركاء والخبراء والعملاء.",
        ],
      },
    },
  },
  {
    id: 3,
    image: heroPartnership3,
    overlay: "bg-gradient-to-r from-primary/95 via-primary/70 to-secondary/30",
    badge: {
      en: "Secure Digital Justice",
      ar: "عدالة رقمية آمنة",
    },
    copy: {
      en: {
        title: "Leaders of Secure Digital Justice Ecosystems",
        subtitle:
          "Integrated platforms with e-signatures, secure archiving, dashboards, and paperless smart justice.",
        bullets: [
          "ISO-aligned cybersecurity architecture for cross-border operations.",
          "Real-time governance dashboards for executives and compliance officers.",
          "24/7 monitoring shield against fraud, forgery, and cybercrime.",
        ],
      },
      ar: {
        title: "روّاد منظومات العدالة الرقمية الآمنة",
        subtitle:
          "منصات متكاملة بالتوقيع الإلكتروني، الأرشفة الآمنة، لوحات تحكم تفاعلية، وعدالة رقمية بلا ورق.",
        bullets: [
          "بنية أمن سيبراني متوافقة مع المعايير الدولية للعمليات العابرة للحدود.",
          "لوحات حوكمة لحظية للمديرين والتنفيذيين ومسؤولي الامتثال.",
          "مراقبة على مدار الساعة تحمي من الاحتيال والتزوير والجرائم السيبرانية.",
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

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [autoPlay]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const goTo = (index: number) => {
    setCurrent(index);
    setAutoPlay(false);
  };

  const handleDemoClick = () => {
    document.querySelector("#capabilities")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactClick = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const activeSlide = slides[current];
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
          <div className="max-w-4xl rounded-3xl bg-background/70 p-6 shadow-ambient backdrop-blur lg:p-10">
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
