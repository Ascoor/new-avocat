import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-gradient-primary py-24 text-center text-text-inverse">
      <div className="absolute inset-0 bg-hero-overlay-light opacity-80 dark:bg-hero-overlay-dark dark:opacity-70" />

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
          <Button
            size="lg"
            variant="hero"
            className="px-8 py-4 text-lg"
          >
            {t("landing.cta.primary")}
          </Button>

          <Button
            size="lg"
            variant="glass"
            className="px-8 py-4 text-lg font-semibold text-text-inverse/90 hover:text-text-inverse"
          >
            {t("landing.cta.secondary")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
