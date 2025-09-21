import { useLanguage } from "@/contexts/LanguageContext";

const services = ["lawFirms", "legalDepartments", "lawyers", "training"] as const;

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="bg-surface-muted py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-6 text-3xl font-bold text-text-strong md:text-4xl animate-fadeIn">
          {t("landing.services.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-text-muted animate-fadeIn [animation-delay:200ms]">
          {t("landing.services.subtitle")}
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-6 text-start shadow-card transition-all duration-500 ease-smooth hover:-translate-y-2 hover:shadow-glow"
            >
              <h3 className="mb-2 text-xl font-semibold text-text-strong">
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
