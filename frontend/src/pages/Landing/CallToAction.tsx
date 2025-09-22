import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-primary py-24 text-center text-text-inverse">
      <div className="absolute inset-0 bg-hero-overlay-light opacity-80 dark:bg-hero-overlay-dark dark:opacity-70" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-aurora opacity-70 blur-[160px] animate-aurora" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_60%)] opacity-60" />
        <div className="absolute -left-20 bottom-10 h-48 w-48 rounded-full border border-accent/30 opacity-60 [mask-image:radial-gradient(circle,rgba(255,255,255,0.75)_55%,transparent_85%)] animate-slowSpin" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-bold md:text-5xl animate-fadeInDown">
          {t("landing.cta.title")}
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-text-inverse/85 animate-fadeInDown [animation-delay:200ms]">
          {t("landing.cta.subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6 animate-fadeInUp [animation-delay:400ms]">
          <Button size="lg" variant="hero" className="px-8 py-4 text-lg shadow-glow-strong">
            {t("landing.cta.primary")}
          </Button>

          <Button
            size="lg"
            variant="glass"
            className="px-8 py-4 text-lg font-semibold text-text-inverse/90 shadow-focus-ring transition-transform duration-300 ease-elegant hover:-translate-y-1 hover:scale-103 hover:text-text-inverse"
          >
            {t("landing.cta.secondary")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
