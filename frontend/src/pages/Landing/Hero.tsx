import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center bg-gradient-hero"
    >
      <div className="absolute inset-0 bg-hero-overlay-light dark:bg-hero-overlay-dark" />

      <div className="relative z-10 space-y-8 animate-fadeIn">
        {/* Title */}
        <h1 className="text-4xl font-bold text-text-inverse md:text-6xl animate-fadeInUp">
          {t("landing.hero.title")}
        </h1>

        {/* Subtitle */}
        <p className="mx-auto max-w-2xl text-lg text-text-inverse/90 md:text-xl animate-fadeInUp [animation-delay:200ms]">
          {t("landing.hero.subtitle")}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col justify-center gap-4 text-base sm:flex-row animate-fadeInUp [animation-delay:400ms]">
          <Button size="lg" variant="hero" className="px-8 py-4 text-lg">
            {t("landing.hero.primaryCta")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-semibold transition-transform duration-300 ease-elegant hover:-translate-y-0.5 hover:scale-102"
          >
            {t("landing.hero.secondaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
