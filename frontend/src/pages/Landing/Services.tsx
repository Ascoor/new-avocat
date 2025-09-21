import { useLanguage } from "@/contexts/LanguageContext";

const services = ["lawFirms", "legalDepartments", "lawyers", "training"] as const;

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-20 bg-layer-subtle">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-text-strong animate-fadeIn">
          {t("landing.services.title")}
        </h2>
        <p className="max-w-2xl mx-auto text-text-muted mb-12 animate-fadeIn delay-200">
          {t("landing.services.subtitle")}
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((key) => (
            <div
              key={key}
              className="p-6 bg-card border border-border rounded-xl shadow-card hover:shadow-elegant smooth tilt-hover"
            >
              <h3 className="text-xl font-semibold mb-2 text-text-strong">
                {t(`landing.services.items.${key}.title`)}
              </h3>
              <p className="text-text-body">
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
