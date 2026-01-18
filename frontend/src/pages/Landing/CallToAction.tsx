import { MotionSection } from "@/components/landing/landing-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { smoothScrollToElement } from "@/utils/smoothScroll";

const CallToAction: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <MotionSection id="cta" className="relative overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,hsl(var(--primary))_0%,hsl(var(--primary-glow))_55%,hsl(var(--gold))_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(var(--gold))_0%,transparent_55%)] opacity-35" />
      <div className="relative z-10 grid gap-8 px-8 py-16 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--nav-border))] bg-[hsl(var(--nav-bg-top))] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--navbar-link-hero))]">
            <Sparkles className="h-4 w-4 text-[hsl(var(--gold))]" />
            {isArabic ? "جلسة استراتيجية خاصة" : "Private Strategy Session"}
          </div>
          <h2 className="text-3xl font-display text-[hsl(var(--navbar-link-hero))] sm:text-4xl">
            {isArabic
              ? "لنخطط للتحول القانوني التالي بثقة كاملة"
              : "Plan your next legal transformation with full confidence"}
          </h2>
          <p className="max-w-2xl text-lg text-[hsl(var(--navbar-link-hero-muted))]">
            {isArabic
              ? "احصل على تقييم تخصصي خلال 45 دقيقة يتضمن خارطة طريق للحوكمة، وأولويات الامتثال، وخطة تنفيذ مرحلية." 
              : "Receive a 45-minute strategic assessment covering governance priorities, compliance roadmap, and phased execution."}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            variant="accent"
            className="rounded-full px-6 py-6 text-sm font-semibold shadow-[var(--shadow-gold)]"
            onClick={() => {
              const element = document.getElementById("contact");
              if (element) smoothScrollToElement(element, { offset: 92 });
            }}
          >
            {isArabic ? "احجز الآن" : "Book Now"}
            <ArrowUpRight className={isArabic ? "mr-2 h-4 w-4" : "ml-2 h-4 w-4"} />
          </Button>
          <div className="rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-4 text-sm text-[hsl(var(--foreground))]">
            {isArabic
              ? "يشمل الجلسة مستشار امتثال ومحامي نزاعات لضمان التغطية الكاملة." 
              : "Sessions include compliance advisors and dispute specialists for full coverage."}
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default CallToAction;
