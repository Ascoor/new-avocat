import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { ClipboardCheck, Network, Radar, ShieldCheck } from "lucide-react";

const Features: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const steps = [
    {
      icon: Radar,
      en: "Intake diagnostics",
      ar: "تشخيص أولي دقيق",
      descEn: "We map jurisdiction, stakeholders, and exposure within 48 hours.",
      descAr: "نحلل الاختصاص والأطراف والمخاطر خلال 48 ساعة.",
    },
    {
      icon: Network,
      en: "Evidence orchestration",
      ar: "تنسيق الأدلة",
      descEn: "Evidence is structured into defensible narratives and automated timelines.",
      descAr: "ننظم الأدلة في سرديات دفاعية وجداول زمنية مؤتمتة.",
    },
    {
      icon: ClipboardCheck,
      en: "Compliance-grade delivery",
      ar: "تسليم بمعايير امتثال",
      descEn: "Every submission is audit-ready, with signature trails and approvals.",
      descAr: "كل تسليم جاهز للتدقيق مع مسارات توقيع واعتمادات واضحة.",
    },
    {
      icon: ShieldCheck,
      en: "Outcome monitoring",
      ar: "متابعة النتائج",
      descEn: "We monitor KPIs, judgments, and client sentiment in real time.",
      descAr: "نراقب مؤشرات الأداء والأحكام ورضا العملاء لحظيًا.",
    },
  ];

  return (
    <MotionSection id="about" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "المنهجية العلمية" : "Scientific Method"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "إطار عمل مدروس يحول الخبرة القانونية إلى نتائج قابلة للتنبؤ"
            : "A disciplined framework that turns legal expertise into predictable outcomes"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "من التشخيص إلى التوثيق، نعتمد على خطوات دقيقة تحمي المكتب والعميل في كل مرحلة." 
            : "From diagnostics to documentation, each phase is engineered to protect both firm and client with measurable rigor."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {steps.map(({ icon: Icon, en, ar, descEn, descAr }) => (
          <div
            key={en}
            className="rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                  {isArabic ? ar : en}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                  {isArabic ? descAr : descEn}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </MotionSection>
  );
};

export default Features;
