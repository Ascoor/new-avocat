import React from "react";

import SectionHeader from "@/components/landing/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = ["partner", "corporate"] as const;

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-surface-muted py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(210,90%,68%,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute left-[18%] top-[15%] h-72 w-72 rounded-full bg-gradient-aurora opacity-60 blur-[110px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <SectionHeader
          align="center"
          title={t("landing.testimonials.title")}
          subtitle={t("landing.testimonials.subtitle", "")}
          eyebrow={t("landing.testimonials.eyebrow")}
          titleId="testimonials-heading"
          className="mb-14"
        />

        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((key, index) => (
            <article
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-8 text-start shadow-ambient transition-all duration-500 ease-elegant hover:-translate-y-2 hover:shadow-glow-strong animate-fadeInUp"
              style={{ animationDelay: `${index * 90}ms` }}
            >
              <div className="pointer-events-none absolute inset-[1px] -z-10 rounded-[1.05rem] bg-gradient-card opacity-0 transition-opacity duration-500 ease-smooth group-hover:opacity-100" />
              <div className="pointer-events-none absolute -inset-10 -z-20 bg-gradient-aurora opacity-0 blur-[140px] transition-opacity duration-700 ease-smooth group-hover:opacity-60" />

              <p className="relative mb-6 text-lg italic text-text-body">
                <span className="absolute -left-2 -top-6 text-6xl font-bold text-accent/30" aria-hidden>
                  “
                </span>
                <span className="relative z-10 block">
                  {t(`landing.testimonials.items.${key}.quote`)}
                </span>
                <span className="absolute -bottom-12 right-4 text-6xl font-bold text-accent/30" aria-hidden>
                  ”
                </span>
              </p>
              <span className="relative z-10 font-semibold text-text-strong">
                {t(`landing.testimonials.items.${key}.name`)}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
