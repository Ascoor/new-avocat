import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Building2,
  FileCheck2,
  Gavel,
  LineChart,
  Shield,
  Users,
} from "lucide-react";

const Services: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const services = [
    {
      icon: Gavel,
      en: "Litigation Intelligence",
      ar: "ذكاء التقاضي",
      descEn: "Scenario mapping, evidence timing, and judge-ready briefs for complex disputes.",
      descAr: "تحليل السيناريوهات وتوقيت الأدلة ومذكرات جاهزة للقضاة في القضايا المعقدة.",
    },
    {
      icon: Building2,
      en: "Corporate Governance",
      ar: "حوكمة الشركات",
      descEn: "Board-ready compliance, policy libraries, and proactive risk registers.",
      descAr: "حوكمة جاهزة لمجالس الإدارة ومكتبات سياسات وسجلات مخاطر استباقية.",
    },
    {
      icon: Shield,
      en: "Regulatory Assurance",
      ar: "ضمان الامتثال",
      descEn: "Automated compliance trails with audit-grade evidence packaging.",
      descAr: "مسارات امتثال مؤتمتة مع تجهيز أدلة بمعايير التدقيق.",
    },
    {
      icon: FileCheck2,
      en: "Contract Control",
      ar: "ضبط العقود",
      descEn: "Clause intelligence, deadline governance, and revision accountability.",
      descAr: "ذكاء البنود وحوكمة المواعيد وتحمل المسؤولية في المراجعات.",
    },
    {
      icon: LineChart,
      en: "Case Performance Analytics",
      ar: "تحليلات أداء القضايا",
      descEn: "Outcome forecasting and KPI visibility across every matter.",
      descAr: "توقع النتائج ورؤية مؤشرات الأداء لكل قضية.",
    },
    {
      icon: Users,
      en: "Client Experience Layer",
      ar: "طبقة تجربة العميل",
      descEn: "Private portals, transparent updates, and trusted collaboration.",
      descAr: "بوابات خاصة وتحديثات شفافة وتعاون موثوق.",
    },
  ];

  return (
    <MotionSection id="services" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "الخدمات القانونية" : "Legal Services"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "خدمات مترابطة لصناعة قرار قانوني أكثر ثقة"
            : "Integrated services for confident legal decisions"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "نحوّل الخبرة القانونية إلى منظومة قابلة للقياس، حيث تعمل فرق المحامين والامتثال والعمليات ضمن لوحة واحدة." 
            : "We translate legal expertise into measurable operations, uniting attorneys, compliance, and operations in one premium workspace."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {services.map(({ icon: Icon, en, ar, descEn, descAr }) => (
          <div
            key={en}
            className="group rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lg)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))] shadow-[var(--shadow-gold)]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[hsl(var(--foreground))]">
              {isArabic ? ar : en}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {isArabic ? descAr : descEn}
            </p>
            <div className="mt-6 h-px w-full bg-[hsl(var(--nav-border))]" />
            <p className="mt-4 text-xs uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
              {isArabic ? "نتائج قابلة للقياس" : "Measured Outcomes"}
            </p>
          </div>
        ))}
      </div>
    </MotionSection>
  );
};

export default Services;
