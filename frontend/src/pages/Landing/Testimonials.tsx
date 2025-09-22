import { useLanguage } from "@/contexts/LanguageContext";

const testimonials = ["partner", "corporate"] as const;

const Testimonials: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="testimonials" className="relative overflow-hidden bg-surface-muted py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsla(210,90%,68%,0.14),transparent_65%)]" />
      <div className="pointer-events-none absolute left-[18%] top-[15%] h-72 w-72 rounded-full bg-gradient-aurora opacity-60 blur-[110px]" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        <h2 className="mb-12 text-3xl font-bold text-text-strong md:text-4xl animate-fadeIn">
          {t("landing.testimonials.title")}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((key, index) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/95 p-8 text-start shadow-ambient transition-all duration-500 ease-elegant hover:-translate-y-2 hover:shadow-glow-strong before:absolute before:inset-[1px] before:-z-10 before:rounded-[1.05rem] before:bg-gradient-card before:opacity-0 before:transition-opacity before:duration-500 before:ease-smooth before:content-[''] after:pointer-events-none after:absolute after:-inset-10 after:-z-20 after:bg-gradient-aurora after:opacity-0 after:blur-[140px] after:transition-opacity after:duration-700 after:ease-smooth after:content-[''] group-hover:before:opacity-100 group-hover:after:opacity-60"
              style={{ transitionDelay: `${index * 90}ms` }}
            >
              <p className="relative mb-6 text-lg italic text-text-body">
                <span className="absolute -left-2 -top-6 text-6xl font-bold text-accent/30">“</span>
                <span className="relative z-10 block">
                  {t(`landing.testimonials.items.${key}.quote`)}
                </span>
                <span className="absolute -bottom-12 right-4 text-6xl font-bold text-accent/30">”</span>
              </p>
              <span className="relative z-10 font-semibold text-text-strong">
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
