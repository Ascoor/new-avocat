import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Award, BadgeCheck, CalendarCheck, Star } from "lucide-react";

const Achievements: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const timeline = [
    {
      year: "2020",
      en: "Launched digital case intelligence for boutique firms.",
      ar: "إطلاق ذكاء القضايا للمكاتب المتخصصة.",
    },
    {
      year: "2022",
      en: "Expanded into compliance automation and client portals.",
      ar: "توسّعنا في أتمتة الامتثال وبوابات العملاء.",
    },
    {
      year: "2024",
      en: "Trusted by regional litigation leaders for critical matters.",
      ar: "اعتمدتنا مكاتب رائدة في التقاضي للقضايا الحرجة.",
    },
  ];

  const awards = [
    {
      icon: Award,
      en: "Legal Innovation of the Year",
      ar: "ابتكار قانوني للعام",
    },
    {
      icon: Star,
      en: "Client Trust Excellence",
      ar: "تميز في ثقة العملاء",
    },
    {
      icon: BadgeCheck,
      en: "Compliance Ready Certified",
      ar: "معتمد للامتثال",
    },
    {
      icon: CalendarCheck,
      en: "Fastest Time-to-Court Preparation",
      ar: "الأسرع في تجهيز الملفات القضائية",
    },
  ];

  return (
    <MotionSection id="achievements" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "الإنجازات" : "Achievements"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "إنجازات تثبت الثقة وتراكم الخبرة"
            : "Milestones that reinforce trust and experience"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "نمو أفوكات مبني على نتائج حقيقية وتقدير من مؤسسات قانونية في المنطقة." 
            : "AVOCAT’s growth is powered by proven results and recognition from the regional legal ecosystem."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-6 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-md)]">
          {timeline.map((item) => (
            <div key={item.year} className="flex items-start gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
                <span className="text-sm font-semibold">{item.year}</span>
              </div>
              <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                {isArabic ? item.ar : item.en}
              </p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)]">
          {awards.map(({ icon: Icon, en, ar }) => (
            <div key={en} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                  {isArabic ? ar : en}
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {isArabic ? "اعتماد مهني موثوق" : "Verified professional recognition"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default Achievements;
