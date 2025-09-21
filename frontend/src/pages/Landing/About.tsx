
import { useLanguage } from "@/contexts/LanguageContext";

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("landing.about.title")}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t("landing.about.description")}
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img
            src="/images/law-team.jpg"
            alt={t("landing.about.imageAlt")}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
