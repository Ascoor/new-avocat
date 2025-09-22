import { useLanguage } from "@/contexts/LanguageContext";

const services = ["lawFirms", "legalDepartments", "lawyers", "training"] as const;

const Services: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="services" className="relative overflow-hidden bg-surface-muted py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,hsla(200,80%,65%,0.18),transparent_65%)]" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-96 w-[42rem] -translate-x-1/2 rounded-full bg-gradient-ambient opacity-70 blur-[160px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <h2 className="mb-6 text-3xl font-bold text-text-strong md:text-4xl animate-fadeIn">
          {t("landing.services.title")}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-text-muted animate-fadeIn [animation-delay:200ms]">
          {t("landing.services.subtitle")}
        </p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((key, index) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/90 p-6 text-start shadow-ambient transition-all duration-500 ease-smooth hover:-translate-y-3 hover:shadow-glow-strong before:absolute before:inset-[1px] before:-z-10 before:rounded-[1.05rem] before:bg-gradient-card before:opacity-0 before:transition-opacity before:duration-500 before:ease-smooth before:content-[''] after:absolute after:left-1/2 after:top-full after:h-32 after:w-32 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-gradient-aurora after:opacity-0 after:blur-[120px] after:transition-all after:duration-700 after:ease-smooth after:content-[''] group-hover:before:opacity-100 group-hover:after:opacity-70"
              style={{ transitionDelay: `${index * 60}ms` }}
            >
              <h3 className="mb-3 text-xl font-semibold text-text-strong transition-colors duration-300 ease-smooth group-hover:text-primary">
                {t(`landing.services.items.${key}.title`)}
              </h3>
              <p className="text-text-body transition-colors duration-300 ease-smooth group-hover:text-text-muted">
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
