import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = ["partner", "corporate"] as const;

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          {t("landing.testimonials.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((key) => (
            <div key={key} className="p-6 bg-card border rounded-xl shadow">
              <p className="italic mb-4">
                “{t(`landing.testimonials.items.${key}.quote`)}”
              </p>
              <span className="font-semibold">
                {t(`landing.testimonials.items.${key}.name`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
