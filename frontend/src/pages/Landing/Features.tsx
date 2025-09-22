import React from "react";
import { Database, Laptop, Shield, Users } from "lucide-react";

import SectionHeader from "@/components/landing/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { key: "dataProtection", icon: Shield },
  { key: "clientManagement", icon: Users },
  { key: "caseTracking", icon: Database },
  { key: "digitalTraining", icon: Laptop },
] as const;

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="features"
      className="relative overflow-hidden bg-background py-24"
      aria-labelledby="features-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(200,85%,65%,0.18),transparent_62%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border/70 to-transparent" />

      <div className="container relative z-10 mx-auto px-6">
        <SectionHeader
          title={t("landing.features.title")}
          subtitle={t("landing.features.subtitle")}
          eyebrow={t("landing.features.eyebrow")}
          className="mb-16"
          titleClassName="text-balance"
          titleId="features-heading"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 shadow-ambient transition-all duration-500 ease-elegant hover:-translate-y-3 hover:shadow-glow-strong animate-fadeInUp"
              style={{ animationDelay: `${index * 120}ms` }}
            >
              <div className="pointer-events-none absolute inset-[1px] -z-10 rounded-[1.05rem] bg-gradient-card opacity-0 transition-opacity duration-500 ease-elegant group-hover:opacity-100" />
              <div className="pointer-events-none absolute -inset-12 -z-20 rounded-full bg-gradient-aurora opacity-0 blur-[140px] transition-all duration-700 ease-smooth group-hover:scale-110 group-hover:opacity-60" />

              <div className="mb-6 flex items-center justify-center">
                <div className="relative rounded-full bg-accent-soft p-4 shadow-inner-glow transition-all duration-300 ease-smooth group-hover:scale-105 group-hover:bg-accent">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-aurora opacity-0 blur-xl transition-opacity duration-500 ease-smooth group-hover:opacity-80" />
                  <Icon className="h-10 w-10 text-accent animate-float group-hover:animate-glowPulse" aria-hidden />
                </div>
              </div>

              <h3 className="mb-2 text-xl font-semibold text-text-strong transition-colors duration-300 ease-smooth group-hover:text-primary">
                {t(`landing.features.items.${key}.title`)}
              </h3>

              <p className="text-text-body transition-colors duration-300 ease-smooth group-hover:text-text-muted">
                {t(`landing.features.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
