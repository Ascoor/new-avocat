import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        {t("landing.hero.title")}
      </h1>
      <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
        {t("landing.hero.subtitle")}
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">{t("landing.hero.primaryCta")}</Button>
        <Button size="lg" variant="outline" className="text-white border-white">
          {t("landing.hero.secondaryCta")}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
