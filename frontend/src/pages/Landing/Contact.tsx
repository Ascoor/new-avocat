import { useLanguage } from "@/contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="container mx-auto px-6 py-24">
      {/* Title */}
      <h2 className="mb-4 text-center text-3xl font-bold text-text-strong md:text-4xl animate-fadeInDown">
        {t("landing.contact.title")}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted animate-fadeInDown [animation-delay:200ms]">
        {t("landing.contact.subtitle")}
      </p>

      {/* Form */}
      <form className="mx-auto max-w-xl space-y-6 rounded-2xl border border-border bg-layer-card p-8 shadow-card animate-fadeInUp">
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
        <button
          type="submit"
          className="w-full rounded-lg bg-primary p-4 text-lg font-semibold text-primary-foreground shadow-card transition-transform duration-300 ease-elegant hover:-translate-y-1 hover:shadow-glow"
        >
          {t("landing.contact.form.submit")}
        </button>
      </form>
    </section>
  );
};

export default Contact;
