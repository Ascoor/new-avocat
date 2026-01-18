import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { BadgeCheck } from "lucide-react";

const Team: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const team = [
    {
      nameEn: "Dr. Leila Hassan",
      nameAr: "د. ليلى حسن",
      roleEn: "Head of Litigation Strategy",
      roleAr: "رئيسة استراتيجية التقاضي",
      specialtyEn: "Complex disputes · Regulatory advocacy",
      specialtyAr: "النزاعات المعقدة · التقاضي التنظيمي",
    },
    {
      nameEn: "Omar Al-Sayed",
      nameAr: "عمر السيد",
      roleEn: "Chief Legal Operations",
      roleAr: "مدير العمليات القانونية",
      specialtyEn: "Process governance · Compliance audits",
      specialtyAr: "حوكمة العمليات · تدقيق الامتثال",
    },
    {
      nameEn: "Mariam Qureshi",
      nameAr: "مريم قريشي",
      roleEn: "Client Trust Partner",
      roleAr: "مسؤولة ثقة العملاء",
      specialtyEn: "Relationship clarity · Executive reporting",
      specialtyAr: "وضوح العلاقة · تقارير تنفيذية",
    },
  ];

  return (
    <MotionSection id="team" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "فريق الخبراء" : "Expert Team"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "خبرات قانونية وتقنية تقود التحول بثقة"
            : "Legal and technical leaders guiding transformation with confidence"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "يعمل فريقنا متعدد التخصصات جنبًا إلى جنب لضمان قرارات مدعومة بالخبرة والبيانات." 
            : "Our multidisciplinary experts partner with your firm to ensure every decision is backed by insight and evidence."}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {team.map((member) => (
          <div
            key={member.nameEn}
            className="rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-sm)]"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                  {isArabic ? member.nameAr : member.nameEn}
                </h3>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  {isArabic ? member.roleAr : member.roleEn}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
                <BadgeCheck className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))]">
              {isArabic ? member.specialtyAr : member.specialtyEn}
            </p>
          </div>
        ))}
      </div>
    </MotionSection>
  );
};

export default Team;
