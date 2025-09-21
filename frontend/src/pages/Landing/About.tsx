import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="container mx-auto grid gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
      <div className="space-y-6 animate-fadeIn">
        <h2 className="text-3xl font-bold text-text-strong md:text-4xl">
            {t("landing.about.title")}
        </h2>
        <p className="text-lg text-text-body">{t("landing.about.description")}</p>
      </div>
      <div className="overflow-hidden rounded-2xl shadow-card">
        <img
          src="/images/law-team.jpg"
          alt={t("landing.about.imageAlt")}
          className="h-full w-full object-cover transition-transform duration-500 ease-smooth hover:scale-103"
        />
      </div>
    </section>
  );
};

export default About;
