import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = ["partner", "corporate"] as const;

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="bg-layer-subtle py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="mb-12 text-3xl font-bold text-text-strong md:text-4xl animate-fadeIn">
          {t("landing.testimonials.title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((key) => (
            <div
              key={key}
              className="rounded-xl border border-border bg-card p-6 text-start shadow-card transition-shadow duration-500 ease-smooth hover:shadow-elegant"
            >
              <p className="mb-4 text-lg italic text-text-body">
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
