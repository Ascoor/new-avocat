import React from "react";

import SectionHeader from "@/components/landing/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="container mx-auto grid gap-12 px-6 py-20 md:grid-cols-2 md:items-center" aria-labelledby="about-heading">
      <div className="space-y-8 animate-fadeIn">
        <SectionHeader
          align="left"
          title={t("landing.about.title")}
          subtitle={t("landing.about.description")}
          eyebrow={t("landing.about.eyebrow")}
          titleId="about-heading"
          className="!gap-6"
          subtitleClassName="text-base md:text-lg text-text-body"
        />
      </div>
      <div className="relative overflow-hidden rounded-2xl shadow-card">
        <div className="pointer-events-none absolute inset-0 bg-gradient-card opacity-60 mix-blend-screen" />
        <img
          src="/images/lawFirm.png"
          alt={t("landing.about.imageAlt")}
          className="h-full w-full object-cover transition-transform duration-500 ease-smooth hover:scale-103"
        />
      </div>
    </section>
  );
};

export default About;
