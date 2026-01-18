import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import {
  ArrowUpRight,
  CheckCircle2,
  Fingerprint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { smoothScrollToElement } from "@/utils/smoothScroll";

const HeroCarousel: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const reduceMotion = useReducedMotion();

  const content = {
    en: {
      badge: "Scientific-Standard Legal Operations",
      title: "Elevate every legal decision with evidence-led precision.",
      subtitle:
        "AVOCAT unifies case intelligence, client trust, and compliant workflows into one premium legal-tech command center.",
      primary: "Book a Strategy Call",
      secondary: "Explore the Platform",
      trust: [
        "Court-ready reporting",
        "Encrypted client vault",
        "ISO-aligned workflows",
      ],
      signal: "Trusted by leading regional firms",
    },
    ar: {
      badge: "معايير علمية للعمليات القانونية",
      title: "ارتقِ بكل قرار قانوني بدقة تستند إلى الأدلة.",
      subtitle:
        "تجمع أفوكات بين ذكاء القضايا وثقة العملاء والامتثال المؤسسي في منصة قانونية واحدة فائقة الاحتراف.",
      primary: "احجز مكالمة استراتيجية",
      secondary: "استعرض المنصة",
      trust: ["تقارير جاهزة للمحكمة", "خزينة عملاء مشفرة", "سير عمل مطابق للمعايير"],
      signal: "موثوق من مكاتب قيادية في المنطقة",
    },
  };

  const copy = content[language];
  const primaryCtaClasses =
    "rounded-full px-6 py-6 text-sm font-semibold bg-none bg-[hsl(var(--cta-primary-bg))] text-[hsl(var(--cta-primary-fg))] shadow-[var(--shadow-gold)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-lg)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2";
  const secondaryCtaClasses =
    "rounded-full border border-[hsl(var(--cta-secondary-border))] bg-[hsl(var(--cta-secondary-bg))] px-6 py-6 text-sm font-semibold text-[hsl(var(--cta-secondary-fg))] shadow-[var(--shadow-sm)] transition-all hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2";

  return (
    <section id="home" className="relative overflow-hidden rounded-3xl">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero)" }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--gold))_0%,transparent_45%)] opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--neon))_0%,transparent_40%)] opacity-20" />

      <div className="relative z-10 mx-auto grid max-w-screen-2xl gap-10 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] lg:px-12">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={cn("flex flex-col justify-center", isArabic ? "text-right" : "text-left")}
        >
          <div className="inline-flex items-center gap-3 self-start rounded-full border border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-bg-top))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--navbar-link-hero))]">
            <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
            <span>{copy.badge}</span>
          </div>

          <h1
            className={cn(
              "mt-6 text-balance font-display text-4xl leading-tight text-[hsl(var(--navbar-link-hero))] sm:text-5xl lg:text-6xl",
              isArabic ? "leading-[1.3]" : "leading-tight",
            )}
          >
            {copy.title}
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[hsl(var(--navbar-link-hero-muted))]">
            {copy.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              variant="accent"
              className={primaryCtaClasses}
              onClick={() => {
                const element = document.getElementById("contact");
                if (element) smoothScrollToElement(element, { offset: 92 });
              }}
            >
              {copy.primary}
              <ArrowUpRight className={cn("h-4 w-4", isArabic ? "mr-2" : "ml-2")} />
            </Button>
            <Button
              variant="glass"
              className={secondaryCtaClasses}
              onClick={() => {
                const element = document.getElementById("services");
                if (element) smoothScrollToElement(element, { offset: 92 });
              }}
            >
              {copy.secondary}
            </Button>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4 text-sm text-[hsl(var(--navbar-link-hero-muted))]">
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
              {copy.signal}
            </span>
            <span className="h-4 w-px bg-[hsl(var(--nav-border))]" />
            <div className="flex flex-wrap gap-3">
              {copy.trust.map((item) => (
                <span key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[hsl(var(--neon))]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 32 }}
          animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-xl)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-semibold text-[hsl(var(--foreground))]">
                <Fingerprint className="h-4 w-4 text-[hsl(var(--gold))]" />
                {isArabic ? "لوحة الامتثال الآني" : "Live Compliance Desk"}
              </div>
              <span className="rounded-full bg-[hsl(var(--gold))] px-3 py-1 text-xs font-semibold text-[hsl(var(--accent-foreground))]">
                {isArabic ? "مباشر" : "Live"}
              </span>
            </div>

            <div className="mt-6 grid gap-4">
              <div className="rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card-elevated))] p-4">
                <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{isArabic ? "مخاطر القضية" : "Case Risk"}</span>
                  <span className="text-[hsl(var(--gold))]">92%</span>
                </div>
                <div className="mt-3 h-2 w-full rounded-full bg-[hsl(var(--muted))]">
                  <div className="h-2 w-4/5 rounded-full bg-[hsl(var(--gold))]" />
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card-elevated))] p-4">
                <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{isArabic ? "وثائق مكتملة" : "Documents Verified"}</span>
                  <span className="text-[hsl(var(--neon))]">38/40</span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-2 rounded-full bg-[hsl(var(--nav-border))]"
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card-elevated))] p-4">
                <div className="flex items-center justify-between text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{isArabic ? "سير الإجراءات" : "Workflow Pulse"}</span>
                  <span className="text-[hsl(var(--gold))]">+18%</span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-[hsl(var(--gold))]" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2 w-3/4 rounded-full bg-[hsl(var(--nav-border))]" />
                    <div className="h-2 w-1/2 rounded-full bg-[hsl(var(--nav-border))]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,hsl(var(--gold))_48%,transparent_55%)] opacity-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarousel;
