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
    <section id="features" className="relative overflow-hidden py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,hsla(200,85%,65%,0.18),transparent_62%)]" />

      <div className="container relative z-10 mx-auto px-6">
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
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-surface-muted/80 p-6 shadow-ambient transition-all duration-500 ease-elegant hover:-translate-y-3 hover:shadow-glow-strong animate-fadeInUp before:absolute before:inset-[1px] before:-z-10 before:rounded-[1.05rem] before:bg-gradient-card before:opacity-0 before:transition-opacity before:duration-500 before:ease-elegant before:content-[''] after:absolute after:-inset-12 after:-z-20 after:rounded-full after:bg-gradient-aurora after:opacity-0 after:blur-[140px] after:transition-all after:duration-700 after:ease-smooth after:content-[''] group-hover:before:opacity-100 group-hover:after:opacity-60 group-hover:after:scale-110"
            style={{ animationDelay: `${i * 120}ms` }}
          >
            {/* Icon with Glow */}
            <div className="mb-6 flex items-center justify-center">
              <div className="relative rounded-full bg-accent-soft p-4 shadow-inner-glow transition-all duration-300 ease-smooth group-hover:scale-105 group-hover:bg-accent">
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-aurora opacity-0 blur-xl transition-opacity duration-500 ease-smooth group-hover:opacity-80" />
                <Icon className="h-10 w-10 text-accent animate-float group-hover:animate-glowPulse" />
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
      </div>
    </section>
  );
};

export default Features;
