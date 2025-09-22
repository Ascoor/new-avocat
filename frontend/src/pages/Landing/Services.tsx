import type { ComponentType, SVGProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, CircuitBoard, Scale, ShieldCheck } from "lucide-react";

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

const Services: React.FC = () => {
  return (
    <section id="services" className="bg-surface-highlight/60 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">Legal & Digital Services</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">خدمات قانونية ورقمية</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="block font-english">Full-Spectrum Counsel and Intelligent Platforms</span>
            <span className="font-arabic text-accent">منظومة متكاملة من الاستشارات والمنصات الذكية</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Precision-crafted services blending advocacy, governance, and digital acceleration for ambitious institutions.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {serviceGroups.map((group) => {
            const Icon = group.icon;
            return (
              <Card
                key={group.enTitle}
                className="h-full border-border/80 bg-card/80 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-english text-2xl font-semibold text-foreground">
                          {group.enTitle}
                        </h3>
                        <span className="font-arabic text-lg text-accent">{group.arTitle}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div dir="ltr" className="space-y-4 text-left">
                      <p className="font-english text-base leading-relaxed text-muted-foreground">
                        {group.enDescription}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {group.items.map((item) => (
                          <Badge
                            key={item.en}
                            variant="outline"
                            className="border-border bg-background/60 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground/90"
                          >
                            <span className="font-english">{item.en}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div dir="rtl" className="space-y-4 text-right">
                      <p className="font-arabic text-base leading-relaxed text-muted-foreground">
                        {group.arDescription}
                      </p>
                      <div className="flex flex-wrap justify-end gap-2">
                        {group.items.map((item) => (
                          <Badge
                            key={item.ar}
                            variant="outline"
                            className="border-border bg-background/60 px-4 py-2 text-xs font-semibold tracking-wide text-muted-foreground/90"
                          >
                            <span className="font-arabic">{item.ar}</span>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {highlights.map(({ icon: Icon, en, ar }) => (
            <div
              key={en}
              className="rounded-3xl border border-border bg-gradient-to-br from-background via-card to-background p-6 shadow-ambient"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <p className="font-english text-sm text-muted-foreground">{en}</p>
                  <p className="font-arabic text-sm text-muted-foreground">{ar}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
