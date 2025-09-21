import { useLanguage } from "@/contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="contact"
      className="py-24 container mx-auto px-6"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-strong animate-fadeInDown">
        {t("landing.contact.title")}
      </h2>
      <p className="text-center text-text-muted max-w-2xl mx-auto mb-12 animate-fadeInDown delay-200">
        {t("landing.contact.subtitle")}
      </p>

      {/* Form */}
      <form
        className="max-w-xl mx-auto space-y-6 bg-layer-card p-8 rounded-xl shadow-card animate-fadeInUp"
      >
        <input
          type="text"
          placeholder={t("landing.contact.form.namePlaceholder")}
          className="w-full p-4 rounded-lg bg-input text-text-body border border-border 
                     focus:outline-none focus:ring-2 focus:ring-primary smooth"
        />
        <input
          type="email"
          placeholder={t("landing.contact.form.emailPlaceholder")}
          className="w-full p-4 rounded-lg bg-input text-text-body border border-border 
                     focus:outline-none focus:ring-2 focus:ring-primary smooth"
        />
        <textarea
          placeholder={t("landing.contact.form.messagePlaceholder")}
          className="w-full p-4 h-36 rounded-lg bg-input text-text-body border border-border 
                     focus:outline-none focus:ring-2 focus:ring-primary smooth"
        />
        <button
          type="submit"
          className="w-full p-4 bg-primary text-primary-foreground rounded-lg 
                     hover:scale-md hover-tilt smooth shadow-card hover:shadow-glow font-semibold text-lg"
        >
          {t("landing.contact.form.submit")}
        </button>
      </form>
    </section>
  );
};

export default Contact;
