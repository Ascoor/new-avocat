import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="animate-fadeIn">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-strong">
            {t("landing.about.title")}
          </h2>
          <p className="text-text-body mb-4">{t("landing.about.description")}</p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-elegant glow-hover">
          <img
            src="/images/law-team.jpg"
            alt={t("landing.about.imageAlt")}
            className="w-full h-full object-cover transition-smooth hover:scale-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
