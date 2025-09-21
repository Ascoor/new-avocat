import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = ["partner", "corporate"] as const;

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="py-20 bg-layer-subtle">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-text-strong animate-fadeIn">
          {t("landing.testimonials.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((key) => (
            <div
              key={key}
              className="p-6 bg-card border border-border rounded-xl shadow-card hover:shadow-elegant smooth"
            >
              <p className="italic mb-4 text-text-body">
                “{t(`landing.testimonials.items.${key}.quote`)}”
              </p>
              <span className="font-semibold text-text-strong">
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
