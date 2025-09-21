import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-6 bg-gradient-hero"
    >
      {/* Overlay for contrast */}
      <div className="absolute inset-0 bg-[hsl(var(--hero-overlay-light))] dark:bg-[hsl(var(--hero-overlay-dark))]" />

      <div className="relative z-10 animate-fadeIn">
        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-strong animate-fadeInUp">
          {t("landing.hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl mx-auto mb-8 text-lg text-text-muted animate-fadeInUp delay-200">
          {t("landing.hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-4 justify-center animate-fadeInUp delay-400">
          <Button
            size="lg"
            className="btn-primary px-8 py-4 text-lg font-semibold shadow-glow transition-smooth hover:scale-md"
          >
            {t("landing.hero.primaryCta")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-outline px-8 py-4 text-lg font-semibold transition-elegant hover:transform hover:tilt"
          >
            {t("landing.hero.secondaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
