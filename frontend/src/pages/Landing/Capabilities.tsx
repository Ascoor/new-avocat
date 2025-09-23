import { Cpu, Layers, ShieldEllipsis } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";


type Capability = {
  icon: typeof Layers;
  enTitle: string;
  arTitle: string;
  enDescription: string;
  arDescription: string;
  enPoints: string[];
  arPoints: string[];
};

const capabilities: Capability[] = [
  {
    icon: Layers,
    enTitle: "Core Capabilities",
    arTitle: "القدرات الأساسية",
    enDescription:
      "Strategic counsel across commercial, administrative, and criminal mandates supported by precision digital workflows.",
    arDescription:
      "استشارات استراتيجية في القضايا التجارية والإدارية والجنائية مدعومة بسير عمل رقمي دقيق.",
    enPoints: [
      "End-to-end lifecycle management for litigation, arbitration, and settlement.",
      "Real-time dashboards aligning partners, associates, and clients with measurable KPIs.",
    ],
    arPoints: [
      "إدارة شاملة لدورة حياة القضايا من التقاضي إلى التحكيم والتسويات.",
      "لوحات تحكم لحظية تربط الشركاء والمحامين والعملاء بمؤشرات أداء قابلة للقياس.",
    ],
  },
  {
    icon: Cpu,
    enTitle: "AI in Legal Services",
    arTitle: "الذكاء الاصطناعي في الخدمات القانونية",
    enDescription:
      "Intelligent systems for case management, precedent research, and data-driven legal strategies.",
    arDescription:
      "أنظمة ذكية لإدارة القضايا، البحث في السوابق، وبناء استراتيجيات قانونية قائمة على البيانات.",
    enPoints: [
      "Knowledge graphs connect precedents, regulations, and expert opinions in seconds.",
      "Scenario simulators model outcomes, damages, and compliance risks before submission.",
    ],
    arPoints: [
      "خرائط معرفية تربط السوابق والتشريعات والآراء الخبرية في ثوانٍ.",
      "محاكيات سيناريوهات تتوقع النتائج والأضرار ومخاطر الامتثال قبل التقديم.",
    ],
  },
  {
    icon: ShieldEllipsis,
    enTitle: "Cybersecurity & Digital Trust",
    arTitle: "الأمن السيبراني والثقة الرقمية",
    enDescription:
      "Advanced legal solutions, digital forensics, and international compliance to protect privacy and data.",
    arDescription:
      "حلول قانونية متطورة، تحقيقات رقمية، وتشريعات متوافقة مع القوانين الدولية لحماية الخصوصية والبيانات.",
    enPoints: [
      "Cybercrime protection with incident readiness, breach containment, and regulatory reporting.",
      "Zero-trust architecture, encryption, and audit trails safeguarding every document and signature.",
    ],
    arPoints: [
      "حماية من الجرائم الإلكترونية مع جاهزية للحوادث واحتواء للاختراقات وتبليغ تشريعي فوري.",
      "بنية صفرية الثقة وتشفير وسجلات تدقيق تحمي كل مستند وتوقيع.",
    ],
  },
];

const sectionCopy: Record<"en" | "ar", { badge: string; title: string; subtitle: string }> = {
  en: {
    badge: "Capabilities",
    title: "Intelligence, Security, and Digital Mastery",
    subtitle:
      "Tailored operating models unite legal excellence, predictive analytics, and uncompromising cybersecurity.",
  },
  ar: {
    badge: "الإمكانيات",
    title: "الذكاء والحماية والتمكن الرقمي",
    subtitle: "نماذج تشغيل مصممة توحد التميز القانوني والتحليلات التنبؤية والأمن السيبراني الصارم.",
  },
};

const Capabilities: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden py-24"
      dir={direction}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center justify-center rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className={isArabic ? "font-arabic" : "font-english"}>{copy.badge}</span>
          </div>
          <h2 className={`mt-6 text-4xl font-display font-bold lg:text-5xl ${isArabic ? "text-accent" : "text-foreground"}`}>
            <span className={isArabic ? "font-arabic" : "font-english"}>{copy.title}</span>
          </h2>
          <p
            className={`mt-4 text-lg text-muted-foreground lg:text-xl ${
              isArabic ? "font-arabic" : "font-english"
            }`}
          >
            {copy.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {capabilities.map((capability) => {
            const Icon = capability.icon;
            const cardTitle = isArabic ? capability.arTitle : capability.enTitle;
            const cardDescription = isArabic
              ? capability.arDescription
              : capability.enDescription;
            const cardPoints = isArabic ? capability.arPoints : capability.enPoints;
            const bulletColor = isArabic ? "bg-accent" : "bg-primary";
            return (
              <div
                key={capability.enTitle}
                className="h-full rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className={`flex items-center ${isArabic ? "flex-row-reverse" : ""} gap-3`}>
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={isArabic ? "text-right" : "text-left"}>
                      <h3
                        className={`${
                          isArabic
                            ? "font-arabic text-lg font-semibold text-accent"
                            : "font-english text-xl font-semibold text-foreground"
                        }`}
                      >
                        {cardTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    dir={isArabic ? "rtl" : "ltr"}
                    className={`space-y-3 ${isArabic ? "text-right" : "text-left"}`}
                  >
                    <p
                      className={`${
                        isArabic
                          ? "font-arabic text-base leading-relaxed text-muted-foreground"
                          : "font-english text-base leading-relaxed text-muted-foreground"
                      }`}
                    >
                      {cardDescription}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {cardPoints.map((point) => (
                        <li
                          key={point}
                          className={`flex items-start gap-2 ${
                            isArabic ? "flex-row-reverse" : ""
                          }`}
                        >
                          <span
                            className={`mt-1 h-1.5 w-1.5 rounded-full ${bulletColor}`}
                          />
                          <span
                            className={`leading-relaxed ${
                              isArabic ? "font-arabic text-right" : "font-english"
                            }`}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Capabilities;
