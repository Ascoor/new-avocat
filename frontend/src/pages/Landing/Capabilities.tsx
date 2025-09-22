
import { useLanguage } from "@/contexts/LanguageContext";

import { Cpu, Layers, ShieldLock } from "lucide-react";

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
    icon: ShieldLock,
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

 
const sectionCopy = {
  en: {
    badge: "Capabilities",
    title: "Intelligence, Security, and Digital Mastery",
    description:
      "Tailored operating models unite legal excellence, predictive analytics, and uncompromising cybersecurity.",
  },
  ar: {
    badge: "الإمكانيات",
    title: "الذكاء والحماية والتمكن الرقمي",
    description:
      "نماذج تشغيل مخصصة توحد التميز القانوني والتحليلات التنبؤية والأمن السيبراني الصارم.",
  },
};

const Capabilities: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section id="capabilities" className="relative overflow-hidden py-24" dir={direction}>
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/15 to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
 
            return (
              <div
                key={capability.enTitle}
                className="h-full rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              > 
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                </div>

                <div className={`space-y-3 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  <p>{description}</p>
                  <ul className="space-y-2 text-sm">
                    {points.map((point) => (
                      <li
                        key={point}
                        className={`flex items-start gap-2 ${isArabic ? "flex-row-reverse text-right" : ""}`}
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul> 
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
