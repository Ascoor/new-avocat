import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-primary/90 to-accent/80 text-white"
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
