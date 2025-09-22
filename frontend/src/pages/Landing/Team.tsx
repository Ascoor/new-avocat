import { useLanguage } from "@/contexts/LanguageContext";
import { GraduationCap, Scale, ShieldCheck, UserCircle2 } from "lucide-react";

type TeamMember = {
  nameEn: string;
  nameAr: string;
  roleEn: string;
  roleAr: string;
  bioEn: string;
  bioAr: string;
  highlights: { en: string; ar: string }[];
};

const teamMembers: TeamMember[] = [
  {
    nameEn: "Mr. Sami Mohamed El-Gamal",
    nameAr: "الأستاذ سامي محمد الجمل",
    roleEn: "Managing Partner – Commercial Disputes & International Arbitration",
    roleAr: "الشريك المدير – القضايا التجارية والتحكيم الدولي",
    bioEn:
      "Architect of high-stakes commercial litigation strategies with more than 18 years representing global corporates, sovereign entities, and leading financial institutions across MENA.",
    bioAr:
      "مهندس استراتيجيات التقاضي التجاري عالية القيمة بخبرة تتجاوز 18 عاماً في تمثيل الشركات العالمية والجهات السيادية والمؤسسات المالية الرائدة في المنطقة.",
    highlights: [
      {
        en: "ICC & LCIA accredited counsel leading digital arbitration playbooks and cross-border recovery projects.",
        ar: "محكّم معتمد لدى ICC وLCIA يقود أدلة التحكيم الرقمية ومشاريع الاسترداد العابرة للحدود.",
      },
      {
        en: "Champion of paperless courtrooms and AI-assisted pleading models adopted by tier-one clients.",
        ar: "رائد المحاكم بلا أوراق ونماذج المرافعات المدعومة بالذكاء الاصطناعي المعتمدة لدى كبار العملاء.",
      },
    ],
  },
  {
    nameEn: "Mr. Abdelhamid Mohamed Askar",
    nameAr: "الأستاذ عبدالحميد محمد عسكر",
    roleEn: "Partner – Civil Litigation & Cybersecurity Law",
    roleAr: "شريك – المنازعات المدنية وقانون الأمن السيبراني",
    bioEn:
      "Specialist in administrative, civil, and cybercrime litigation with a decade leading digital forensics investigations and regulatory transformation programs.",
    bioAr:
      "متخصص في المنازعات الإدارية والمدنية والجرائم السيبرانية مع خبرة تمتد لعقد في قيادة التحقيقات الرقمية وبرامج التحول التشريعي.",
    highlights: [
      {
        en: "Designed national cybercrime response frameworks integrating legal, technical, and compliance teams.",
        ar: "صمم أطر الاستجابة الوطنية للجرائم الإلكترونية بدمج الفرق القانونية والفنية وفِرق الامتثال.",
      },
      {
        en: "Advises on privacy-by-design policies, data localization, and AI governance for regulators and fintech leaders.",
        ar: "يستشار في سياسات الخصوصية المدمجة بالتصميم وتوطين البيانات وحوكمة الذكاء الاصطناعي للجهات التنظيمية وروّاد التكنولوجيا المالية.",
      },
    ],
  },
];

const leadershipBadges = [
  {
    icon: Scale,
    en: "Smart Justice Advocate",
    ar: "مدافع عن العدالة الذكية",
  },
  {
    icon: GraduationCap,
    en: "Global Faculty Speaker",
    ar: "متحدث في برامج دولية",
  },
  {
    icon: ShieldCheck,
    en: "Cybersecurity Counsel",
    ar: "مستشار الأمن السيبراني",
  },
];

const sectionCopy = {
  en: {
    badge: "Leadership Team",
    title: "Legal Minds Leading Digital Justice",
    description: "Senior partners blending courtroom mastery with transformative technology insight.",
  },
  ar: {
    badge: "الفريق القيادي",
    title: "عقول قانونية تقود العدالة الرقمية",
    description: "شركاء مخضرمون يجمعون بين الخبرة القضائية والرؤية التقنية التحولية.",
  },
};

const Team: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section id="team" className="bg-surface-highlight/70 py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {teamMembers.map((member) => {
            const name = isArabic ? member.nameAr : member.nameEn;
            const role = isArabic ? member.roleAr : member.roleEn;
            const bio = isArabic ? member.bioAr : member.bioEn;
            const highlights = member.highlights.map((highlight) => (isArabic ? highlight.ar : highlight.en));

            return (
              <div
                key={member.nameEn}
                className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-3xl bg-gradient-gold p-4 text-accent-foreground shadow-gold">
                    <UserCircle2 className="h-10 w-10" />
                  </div>
                  <div className={`${isArabic ? "text-right" : "text-left"}`}>
                    <h3 className="text-2xl font-semibold text-foreground">{name}</h3>
                    <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
                      {role}
                    </p>
                  </div>
                </div>

                <div className={`space-y-3 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  <p>{bio}</p>
                  <ul className="space-y-2 text-sm">
                    {highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className={`flex items-start gap-2 ${isArabic ? "flex-row-reverse text-right" : ""}`}
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={`grid gap-4 md:grid-cols-3 ${isArabic ? "text-right" : "text-left"}`}>
                  {leadershipBadges.map(({ icon: Icon, en, ar }) => {
                    const text = isArabic ? ar : en;
                    return (
                      <div
                        key={en}
                        className="rounded-2xl border border-border bg-background/70 p-4 text-center"
                      >
                        <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                        <p className="text-xs font-semibold text-muted-foreground">{text}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
