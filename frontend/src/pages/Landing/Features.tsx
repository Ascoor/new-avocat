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
    <section id="features" className="py-20 container mx-auto px-6">
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-text-strong animate-fadeInDown">
        {t("landing.features.title")}
      </h2>
      <p className="text-center text-text-muted max-w-2xl mx-auto mb-12 animate-fadeInDown delay-200">
        {t("landing.features.subtitle")}
      </p>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ key, icon: Icon }, i) => (
          <div
            key={key}
            className="group relative p-6 bg-layer-card border border-border 
                       rounded-xl shadow-card transition-elegant
                       hover:shadow-glow hover-scale-md hover-tilt 
                       animate-fadeInUp"
            style={{ animationDelay: `${i * 150}ms` }}
          >
            {/* Icon with Glow */}
            <div className="mb-4 flex items-center justify-center">
              <div className="p-4 rounded-full bg-accent/10 group-hover:bg-accent/20 transition-smooth">
                <Icon className="h-10 w-10 text-primary animate-float" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 text-text-strong group-hover:text-primary transition-smooth">
              {t(`landing.features.items.${key}.title`)}
            </h3>

            {/* Description */}
            <p className="text-text-body group-hover:text-text-muted transition-smooth">
              {t(`landing.features.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
