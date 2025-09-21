import { useLanguage } from "@/contexts/LanguageContext";

const services = ["lawFirms", "legalDepartments", "lawyers", "training"] as const;

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {t("landing.services.title")}
        </h2>
        <p className="max-w-2xl mx-auto text-muted-foreground mb-12">
          {t("landing.services.subtitle")}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((key) => (
            <div
              key={key}
              className="p-6 bg-card border rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-2">
                {t(`landing.services.items.${key}.title`)}
              </h3>
              <p className="text-muted-foreground">
                {t(`landing.services.items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
