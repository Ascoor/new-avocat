import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const CallToAction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-primary text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        {t("landing.cta.title")}
      </h2>
      <p className="mb-8 opacity-90">{t("landing.cta.subtitle")}</p>
      <div className="flex justify-center gap-4">
        <Button size="lg" variant="secondary">
          {t("landing.cta.primary")}
        </Button>
        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
          {t("landing.cta.secondary")}
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
