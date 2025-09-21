import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-primary py-24 text-center text-primary-foreground">
      <div className="absolute inset-0 bg-hero-overlay-light opacity-80 dark:bg-hero-overlay-dark dark:opacity-70" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Title */}
        <h2 className="mb-6 text-3xl font-bold md:text-5xl animate-fadeInDown">
          {t("landing.cta.title")}
        </h2>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/80 animate-fadeInDown [animation-delay:200ms]">
          {t("landing.cta.subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row sm:gap-6 animate-fadeInUp [animation-delay:400ms]">
          <Button size="lg" variant="secondary" className="px-8 py-4 text-lg font-semibold shadow-card hover:-translate-y-1 hover:shadow-glow transition-transform duration-300 ease-elegant">
            {t("landing.cta.primary")}
          </Button>

          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-card text-primary shadow-card transition-transform duration-300 ease-elegant hover:-translate-y-1 hover:shadow-glow hover:bg-card/90"
          >
            {t("landing.cta.secondary")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
