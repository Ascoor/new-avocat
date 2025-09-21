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
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        {t("landing.features.title")}
      </h2>
      <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
        {t("landing.features.subtitle")}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, key }) => (
          <div
            key={key}
            className="p-6 bg-card border rounded-xl shadow hover:shadow-lg transition"
          >
            <Icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              {t(`landing.features.items.${key}.title`)}
            </h3>
            <p className="text-muted-foreground">
              {t(`landing.features.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
