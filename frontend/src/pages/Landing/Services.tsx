import React from "react";

import SectionHeader from "@/components/landing/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const services = ["lawFirms", "legalDepartments", "lawyers", "training"] as const;

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-surface-muted py-24"
      aria-labelledby="services-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsla(200,80%,65%,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-ambient opacity-70 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <SectionHeader
          align="center"
          title={t("landing.services.title")}
          subtitle={t("landing.services.subtitle")}
          eyebrow={t("landing.services.eyebrow")}
          titleId="services-heading"
          className="mb-16"
        />

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((key, index) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 text-start shadow-ambient transition-all duration-500 ease-smooth hover:-translate-y-3 hover:shadow-glow-strong animate-fadeInUp"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <div className="pointer-events-none absolute inset-[1px] -z-10 rounded-[1.05rem] bg-gradient-card opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100" />
              <div className="pointer-events-none absolute left-1/2 top-full h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-aurora opacity-0 blur-[120px] transition-all duration-700 ease-smooth group-hover:opacity-70" />

              <h3 className="mb-3 text-xl font-semibold text-text-strong transition-colors duration-300 ease-smooth group-hover:text-primary">
                {t(`landing.services.items.${key}.title`)}
              </h3>
              <p className="text-text-body transition-colors duration-300 ease-smooth group-hover:text-text-muted">
                {t(`landing.services.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
