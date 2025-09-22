import React from "react";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-hero px-6 text-center text-text-inverse"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 bg-hero-overlay-light opacity-80 dark:bg-hero-overlay-dark dark:opacity-70" />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-gradient-aurora opacity-75 blur-[120px] mix-blend-screen animate-aurora dark:mix-blend-color-dodge" />
        <div className="absolute -bottom-40 right-[20%] h-[28rem] w-[28rem] rounded-full bg-gradient-ambient opacity-60 blur-[140px]" />
        <div className="absolute -left-32 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full border border-accent/20 opacity-50 [mask-image:radial-gradient(circle,rgba(255,255,255,0.8)_45%,transparent_70%)] animate-slowSpin" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_60%)] opacity-60 dark:opacity-40" />
      </div>

      <div className="container relative z-10 mx-auto flex flex-col items-center space-y-8 py-24 animate-fadeIn">
        <span className="inline-flex items-center gap-2 rounded-full border border-text-inverse/40 bg-text-inverse/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-text-inverse/80">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
          {t("landing.hero.eyebrow", "Avocat Platform")}
        </span>

        <h1 id="hero-heading" className="max-w-4xl text-4xl font-bold leading-tight text-text-inverse md:text-6xl animate-fadeInUp">
          {t("landing.hero.title")}
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-text-inverse/80 md:text-xl animate-fadeInUp [animation-delay:200ms]">
          {t("landing.hero.subtitle")}
        </p>

        <div className="flex flex-col justify-center gap-4 text-base sm:flex-row animate-fadeInUp [animation-delay:400ms]">
          <Button size="lg" variant="hero" className="px-8 py-4 text-lg shadow-glow-strong">
            {t("landing.hero.primaryCta")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="px-8 py-4 text-lg font-semibold text-text-inverse shadow-focus-ring transition-transform duration-300 ease-elegant hover:-translate-y-0.5 hover:scale-102 hover:border-text-inverse hover:bg-text-inverse/10"
          >
            {t("landing.hero.secondaryCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
