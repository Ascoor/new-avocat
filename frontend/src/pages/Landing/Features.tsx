import { Shield, Users, Database, Laptop } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const features = [
  { key: "dataProtection", icon: Shield },
  { key: "clientManagement", icon: Users },
  { key: "caseTracking", icon: Database },
  { key: "digitalTraining", icon: Laptop },
] as const;

const Features: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="features" className="container mx-auto px-6 py-20">
      {/* Section Title */}
      <h2 className="mb-4 text-center text-3xl font-bold text-text-strong md:text-4xl animate-fadeInDown">
        {t("landing.features.title")}
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-text-muted animate-fadeInDown [animation-delay:200ms]">
        {t("landing.features.subtitle")}
      </p>

      {/* Features Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map(({ key, icon: Icon }, i) => (
          <div
            key={key}
            className="group relative rounded-xl border border-border bg-surface-muted p-6 shadow-card transition-all duration-500 ease-elegant hover:-translate-y-2 hover:shadow-glow animate-fadeInUp"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* Icon with Glow */}
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-full bg-accent-soft p-4 transition-colors duration-300 ease-smooth group-hover:bg-accent">
                <Icon className="h-10 w-10 text-accent animate-float" />
              </div>
            </div>

            {/* Title */}
            <h3 className="mb-2 text-xl font-semibold text-text-strong transition-colors duration-300 ease-smooth group-hover:text-primary">
              {t(`landing.features.items.${key}.title`)}
            </h3>

            {/* Description */}
            <p className="text-text-body transition-colors duration-300 ease-smooth group-hover:text-text-muted">
              {t(`landing.features.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
