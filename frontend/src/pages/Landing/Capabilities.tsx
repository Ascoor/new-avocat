import { useRef } from "react";
import { useInView } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { MotionSection } from "@/components/landing/landing-motion";
import { useCountUp } from "@/components/landing/useCountUp";
import { ShieldCheck, Scale, Sparkles } from "lucide-react";

type Metric = {
  value: number;
  suffix: string;
  en: string;
  ar: string;
};

const MetricCard = ({ metric, start, isArabic }: { metric: Metric; start: boolean; isArabic: boolean }) => {
  const count = useCountUp(metric.value, 1800, start);
  return (
    <div className="space-y-3 text-center">
      <p className="text-3xl font-semibold text-[hsl(var(--gold))]">
        {count}
        {metric.suffix}
      </p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        {isArabic ? metric.ar : metric.en}
      </p>
    </div>
  );
};

const Capabilities: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const metrics: Metric[] = [
    {
      value: 280,
      suffix: "+",
      en: "Active legal matters orchestrated",
      ar: "قضايا نشطة تتم إدارتها بدقة",
    },
    {
      value: 94,
      suffix: "%",
      en: "Client satisfaction on strategic clarity",
      ar: "رضا العملاء عن وضوح الاستراتيجية",
    },
    {
      value: 36,
      suffix: "%",
      en: "Faster preparation for court submissions",
      ar: "تسريع تجهيز الملفات القضائية",
    },
  ];

  const highlights = [
    {
      icon: ShieldCheck,
      en: "Risk-reviewed case pathways",
      ar: "مسارات قضايا مدققة بالمخاطر",
    },
    {
      icon: Scale,
      en: "Precision task allocation for legal teams",
      ar: "توزيع مهام دقيق للفرق القانونية",
    },
    {
      icon: Sparkles,
      en: "Human + AI verification layers",
      ar: "طبقات تحقق تجمع الإنسان والذكاء الاصطناعي",
    },
  ];

  return (
    <MotionSection id="trust" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "معايير الثقة" : "Trust Bar"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "مصداقية مبنية على مؤشرات قابلة للقياس"
            : "Credibility anchored in measurable performance"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "نقيس النجاح بتقارير دقيقة، ومراجعات امتثال فورية، وتجربة عميل ثابتة عبر كل نقطة تواصل."
            : "We quantify success through live compliance reviews, disciplined reporting, and a consistent client journey at every touchpoint."}
        </p>
      </div>

      <div ref={ref} className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="grid gap-4 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-lg)] md:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.en} metric={metric} start={inView} isArabic={isArabic} />
          ))}
        </div>

        <div className="grid gap-4 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card-elevated))] p-6 shadow-[var(--shadow-md)]">
          {highlights.map(({ icon: Icon, en, ar }) => (
            <div key={en} className="flex items-start gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] shadow-[var(--shadow-gold)]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-base font-semibold text-[hsl(var(--foreground))]">
                  {isArabic ? ar : en}
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {isArabic
                    ? "قابل للتتبع عبر لوحات الامتثال وتوثيق الأدلة."
                    : "Traceable through compliance dashboards and evidentiary logs."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default Capabilities;
