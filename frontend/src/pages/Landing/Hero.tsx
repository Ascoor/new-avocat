import React from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-hero px-6 text-center text-text-inverse"
    >
      {/* Overlay (طبقة خلفية ناعمة) */}
      <div className="absolute inset-0 bg-hero-overlay-light opacity-80 dark:bg-hero-overlay-dark dark:opacity-70" />

      {/* محتوى الهيرو */}
      <div className="relative z-10 flex flex-col items-center space-y-8 animate-fadeIn">
        {/* العنوان */}
        <h1 className="max-w-4xl text-4xl font-bold leading-tight text-text-inverse md:text-6xl animate-fadeInUp">
          {t("landing.hero.title")}
        </h1>

        {/* الوصف */}
        <p className="mx-auto max-w-2xl text-lg text-text-inverse/80 md:text-xl animate-fadeInUp [animation-delay:200ms]">
          {t("landing.hero.subtitle")}
        </p>

        {/* الأزرار */}
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
