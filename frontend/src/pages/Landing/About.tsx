import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, Globe, Scale } from "lucide-react";

const About: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const pillars = [
    {
      icon: Scale,
      en: "Legal accuracy",
      ar: "دقة قانونية",
      descEn: "Every workflow is reviewed by senior attorneys and compliance officers.",
      descAr: "كل سير عمل يراجعه محامون كبار ومسؤولو الامتثال.",
    },
    {
      icon: Award,
      en: "Client trust",
      ar: "ثقة العملاء",
      descEn: "Transparent updates, documented decisions, and accessible evidence vaults.",
      descAr: "تحديثات شفافة وقرارات موثقة وخزائن أدلة قابلة للوصول.",
    },
    {
      icon: Globe,
      en: "Regional intelligence",
      ar: "ذكاء إقليمي",
      descEn: "Localized court insights across GCC and MENA jurisdictions.",
      descAr: "معرفة محلية بالمحاكم والأنظمة في الخليج والمنطقة.",
    },
  ];

  return (
    <MotionSection id="about-firm" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "عن أفوكات" : "About AVOCAT"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "منصة قانونية راقية تجمع التقنية والاتزان المهني"
            : "A premium legal platform that blends technology with professional discipline"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "نحن فريق من المحامين والتقنيين والمستشارين نؤمن بأن القرار القانوني الجيد يبدأ ببيانات موثوقة ومسارات شفافة." 
            : "We are a team of attorneys, technologists, and advisors who believe that strong legal decisions begin with trusted data and transparent pathways."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map(({ icon: Icon, en, ar, descEn, descAr }) => (
          <div
            key={en}
            className="rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[hsl(var(--foreground))]">
              {isArabic ? ar : en}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
              {isArabic ? descAr : descEn}
            </p>
          </div>
        ))}
      </div>
    </MotionSection>
  );
};

export default About;
