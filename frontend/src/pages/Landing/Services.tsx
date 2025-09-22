import type { ComponentType, SVGProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, CircuitBoard, Scale, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type ServiceItem = {
  en: string;
  ar: string;
};

type ServiceGroup = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  enTitle: string;
  arTitle: string;
  enDescription: string;
  arDescription: string;
  items: ServiceItem[];
};

const serviceGroups: ServiceGroup[] = [
  {
    icon: Scale,
    enTitle: "Legal Services",
    arTitle: "الخدمات القانونية",
    enDescription:
      "Litigation & dispute resolution, international arbitration, contract drafting, corporate advisory, company formation, IP protection, and sector-specific compliance.",
    arDescription:
      "التقاضي وحل النزاعات، التحكيم التجاري والدولي، صياغة العقود، الاستشارات للشركات، تأسيس الشركات، حماية الملكية الفكرية، والامتثال المتخصص لكل قطاع.",
    items: [
      { en: "Litigation & Dispute Resolution", ar: "التقاضي وحل النزاعات" },
      { en: "International Arbitration", ar: "التحكيم التجاري والدولي" },
      { en: "Contract Drafting & Negotiation", ar: "صياغة العقود والتفاوض" },
      { en: "Corporate Governance Advisory", ar: "استشارات الحوكمة للشركات" },
      { en: "Company Incorporation", ar: "تأسيس الشركات" },
      { en: "Intellectual Property Protection", ar: "حماية الملكية الفكرية" },
      { en: "Regulatory Compliance", ar: "الامتثال للتشريعات" },
    ],
  },
  {
    icon: BrainCircuit,
    enTitle: "Digital & AI Services",
    arTitle: "الخدمات الرقمية والذكاء الاصطناعي",
    enDescription:
      "Digital case management, AI research assistants, e-signature workflows, compliance automation, cybercrime protection, and data privacy programs.",
    arDescription:
      "إدارة القضايا الرقمية، مساعدو البحث بالذكاء الاصطناعي، سير عمل التوقيع الإلكتروني، أتمتة الامتثال، مكافحة الجريمة الإلكترونية، وبرامج خصوصية البيانات.",
    items: [
      { en: "AI-Augmented Case Strategy", ar: "استراتيجيات القضايا المدعومة بالذكاء الاصطناعي" },
      { en: "Digital Case Management Platforms", ar: "منصات إدارة القضايا الرقمية" },
      { en: "Secure E-Signature Workflows", ar: "سير عمل التوقيع الإلكتروني الآمن" },
      { en: "Compliance Automation Dashboards", ar: "لوحات أتمتة الامتثال" },
      { en: "Cybercrime Protection", ar: "مكافحة الجريمة الإلكترونية" },
      { en: "Data Privacy & Governance Audits", ar: "تدقيق خصوصية البيانات والحوكمة" },
      { en: "Digital Evidence Forensics", ar: "الأدلة الجنائية الرقمية" },
    ],
  },
];

const highlights = [
  {
    icon: ShieldCheck,
    en: "ISO 27001-aligned cybersecurity for sensitive case files.",
    ar: "أمن سيبراني متوافق مع معيار ISO 27001 لحماية الملفات الحساسة.",
  },
  {
    icon: CircuitBoard,
    en: "Integrated analytics, reporting, and client transparency dashboards.",
    ar: "تحليلات متكاملة وتقارير ولوحات شفافية للعملاء.",
  },
];

const sectionCopy = {
  en: {
    badge: "Legal & Digital Services",
    title: "Full-Spectrum Counsel and Intelligent Platforms",
    description:
      "Precision-crafted services blending advocacy, governance, and digital acceleration for ambitious institutions.",
  },
  ar: {
    badge: "الخدمات القانونية والرقمية",
    title: "منظومة متكاملة من الاستشارات والمنصات الذكية",
    description:
      "خدمات مصممة بعناية تمزج بين المرافعة والحوكمة والتسريع الرقمي للمؤسسات الطموحة.",
  },
};

const Services: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section id="services" className="bg-surface-highlight/60 py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {serviceGroups.map((group) => {
            const Icon = group.icon;
            const title = isArabic ? group.arTitle : group.enTitle;
            const description = isArabic ? group.arDescription : group.enDescription;
            const items = group.items.map((item) => (isArabic ? item.ar : item.en));

            return (
              <Card
                key={group.enTitle}
                className="h-full border-border/80 bg-card/80 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
                  </div>

                  <div className={`space-y-4 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                    <p>{description}</p>
                    <div className={`flex flex-wrap gap-2 ${isArabic ? "justify-end" : ""}`}>
                      {items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="border-border bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/90"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {highlights.map(({ icon: Icon, en, ar }) => {
            const text = isArabic ? ar : en;
            return (
              <div
                key={en}
                className="rounded-3xl border border-border bg-gradient-to-br from-background via-card to-background p-6 shadow-ambient"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className={`text-sm text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>{text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
