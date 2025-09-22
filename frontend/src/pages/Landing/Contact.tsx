import React from "react";

import SectionHeader from "@/components/landing/SectionHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="container mx-auto px-6 py-24" aria-labelledby="contact-heading">
      <SectionHeader
        align="center"
        title={t("landing.contact.title")}
        subtitle={t("landing.contact.subtitle")}
        eyebrow={t("landing.contact.eyebrow")}
        titleId="contact-heading"
        className="mb-12"
      />

      <form className="mx-auto max-w-xl space-y-6 rounded-2xl border border-border bg-surface-muted/90 p-8 shadow-card backdrop-blur" aria-label={t("landing.contact.title")}>
        <input
          type="text"
          placeholder={t("landing.contact.form.namePlaceholder")}
          className="w-full rounded-lg border border-border bg-input p-4 text-text-body transition-colors duration-300 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
        <input
          type="email"
          placeholder={t("landing.contact.form.emailPlaceholder")}
          className="w-full rounded-lg border border-border bg-input p-4 text-text-body transition-colors duration-300 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
        <textarea
          placeholder={t("landing.contact.form.messagePlaceholder")}
          className="h-36 w-full rounded-lg border border-border bg-input p-4 text-text-body transition-colors duration-300 ease-smooth focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/60"
        />
        <Button type="submit" variant="hero" size="lg" className="w-full">
          {t("landing.contact.form.submit")}
        </Button>
      </form>
    </section>
  );
};

export default Contact;
