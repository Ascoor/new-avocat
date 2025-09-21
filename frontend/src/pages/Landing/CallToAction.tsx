import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      className="relative py-24 text-center overflow-hidden
                 bg-gradient-primary text-primary-foreground"
    >
      {/* Overlay لتباين أفضل */}
      <div className="absolute inset-0 bg-hero-overlay-light dark:bg-hero-overlay-dark" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fadeInDown">
          {t("landing.cta.title")}
        </h2>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mb-10 text-lg text-text-body animate-fadeInDown delay-200">
          {t("landing.cta.subtitle")}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-6 animate-fadeInUp delay-400">
          <Button
            size="lg"
            variant="secondary"
            className="px-8 py-4 text-lg font-semibold
                       hover-scale-md hover-tilt smooth shadow-card hover:shadow-glow"
          >
            {t("landing.cta.primary")}
          </Button>

          <Button
            size="lg"
            className="px-8 py-4 text-lg font-semibold
                       bg-white text-primary hover:bg-gray-100
                       hover-scale-md hover-tilt smooth shadow-card hover:shadow-glow"
          >
            {t("landing.cta.secondary")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
