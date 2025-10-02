import type { ComponentType, SVGProps } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BrainCircuit, CircuitBoard, Scale, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import type { Locale, Localized } from "@/types/website";

interface ServiceGroupDefinition {
  key: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  defaults: {
    title: Localized<string>;
    description: Localized<string>;
    items: Localized<string[]>;
  };
}

const serviceGroupDefinitions: ServiceGroupDefinition[] = [
  {
    key: "legal_services",
    icon: Scale,
    defaults: {
      title: { en: "Legal Services", ar: "الخدمات القانونية" },
      description: {
        en: "Litigation & dispute resolution, international arbitration, contract drafting, corporate advisory, company formation, IP protection, and sector-specific compliance.",
        ar: "التقاضي وحل النزاعات، التحكيم التجاري والدولي، صياغة العقود، الاستشارات للشركات، تأسيس الشركات، حماية الملكية الفكرية، والامتثال المتخصص لكل قطاع.",
      },
      items: {
        en: [
          "Litigation & Dispute Resolution",
          "International Arbitration",
          "Contract Drafting & Negotiation",
          "Corporate Governance Advisory",
          "Company Incorporation",
          "Intellectual Property Protection",
          "Regulatory Compliance",
        ],
        ar: [
          "التقاضي وحل النزاعات",
          "التحكيم التجاري والدولي",
          "صياغة العقود والتفاوض",
          "استشارات الحوكمة للشركات",
          "تأسيس الشركات",
          "حماية الملكية الفكرية",
          "الامتثال للتشريعات",
        ],
      },
    },
  },
  {
    key: "digital_ai_services",
    icon: BrainCircuit,
    defaults: {
      title: { en: "Digital & AI Services", ar: "الخدمات الرقمية والذكاء الاصطناعي" },
      description: {
        en: "Digital case management, AI research assistants, e-signature workflows, compliance automation, cybercrime protection, and data privacy programs.",
        ar: "إدارة القضايا الرقمية، مساعدو البحث بالذكاء الاصطناعي، سير عمل التوقيع الإلكتروني، أتمتة الامتثال، مكافحة الجريمة الإلكترونية، وبرامج خصوصية البيانات.",
      },
      items: {
        en: [
          "AI-Augmented Case Strategy",
          "Digital Case Management Platforms",
          "Secure E-Signature Workflows",
          "Compliance Automation Dashboards",
          "Cybercrime Protection",
          "Data Privacy & Governance Audits",
          "Digital Evidence Forensics",
        ],
        ar: [
          "استراتيجيات القضايا المدعومة بالذكاء الاصطناعي",
          "منصات إدارة القضايا الرقمية",
          "سير عمل التوقيع الإلكتروني الآمن",
          "لوحات أتمتة الامتثال",
          "مكافحة الجريمة الإلكترونية",
          "تدقيق خصوصية البيانات والحوكمة",
          "الأدلة الجنائية الرقمية",
        ],
      },
    },
  },
];

const sectionFallback: Record<string, Localized<string>> = {
  badge: { en: "Legal & Digital Services", ar: "الخدمات القانونية والرقمية" },
  title: {
    en: "Full-Spectrum Counsel and Intelligent Platforms",
    ar: "منظومة متكاملة من الاستشارات والمنصات الذكية",
  },
  description: {
    en: "Precision-crafted services blending advocacy, governance, and digital acceleration for ambitious institutions.",
    ar: "خدمات مصممة بعناية تمزج بين المرافعة والحوكمة والتسريع الرقمي للمؤسسات الطموحة.",
  },
  highlight1: {
    en: "ISO 27001-aligned cybersecurity for sensitive case files.",
    ar: "أمن سيبراني متوافق مع معيار ISO 27001 لحماية الملفات الحساسة.",
  },
  highlight2: {
    en: "Integrated analytics, reporting, and client transparency dashboards.",
    ar: "تحليلات متكاملة وتقارير ولوحات شفافية للعملاء.",
  },
};

const Services: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { getLocalizedValue, getValueForLocale } = useWebsiteContent("services");

  const badge = getValueForLocale("services_badge", locale, sectionFallback.badge[locale]);
  const title = getValueForLocale("services_title", locale, sectionFallback.title[locale]);
  const description = getValueForLocale(
    "services_description",
    locale,
    sectionFallback.description[locale]
  );
  const highlightOne = getValueForLocale(
    "services_highlight_1",
    locale,
    sectionFallback.highlight1[locale]
  );
  const highlightTwo = getValueForLocale(
    "services_highlight_2",
    locale,
    sectionFallback.highlight2[locale]
  );

  const groups = serviceGroupDefinitions.map((group) => {
    const titleBlock = getLocalizedValue<string>(
      `services_group_${group.key}_title`,
      group.defaults.title
    );
    const descriptionBlock = getLocalizedValue<string>(
      `services_group_${group.key}_description`,
      group.defaults.description
    );
    const itemsBlock = getLocalizedValue<string[]>(
      `services_group_${group.key}_items`,
      group.defaults.items
    );

    return {
      icon: group.icon,
      defaults: group.defaults,
      title: titleBlock,
      description: descriptionBlock,
      items: itemsBlock,
    };
  });

  return (
    <section id="services" className="bg-surface-highlight/60 py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {groups.map((group) => {
            const Icon = group.icon;
            const localizedTitle = group.title[locale] ?? "";
            const localizedDescription = group.description[locale] ?? "";
            const items = group.items[locale] ?? [];

            return (
              <Card
                key={group.defaults.title.en}
                className="h-full border-border/80 bg-card/80 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <CardContent className="space-y-8 p-8">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />

                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{localizedTitle}</h3>
                  </div>

                  <div className={`space-y-4 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                    <p>{localizedDescription}</p>
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
          {[
            { icon: ShieldCheck, text: highlightOne },
            { icon: CircuitBoard, text: highlightTwo },
          ].map(({ icon: Icon, text }) => (
            <div
              key={Icon.displayName ?? Icon.name}
              className="rounded-3xl border border-border bg-gradient-to-br from-background via-card to-background p-6 shadow-ambient"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <p className={`text-sm text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>{text}</p>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Services;
