import { useLanguage } from "@/contexts/LanguageContext";

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        {t("landing.contact.title")}
      </h2>
      <form className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder={t("landing.contact.form.namePlaceholder")}
          className="w-full p-3 border rounded-lg bg-input"
        />
        <input
          type="email"
          placeholder={t("landing.contact.form.emailPlaceholder")}
          className="w-full p-3 border rounded-lg bg-input"
        />
        <textarea
          placeholder={t("landing.contact.form.messagePlaceholder")}
          className="w-full p-3 border rounded-lg bg-input h-32"
        />
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          {t("landing.contact.form.submit")}
        </button>
      </form>
    </section>
  );
};

export default Contact;
