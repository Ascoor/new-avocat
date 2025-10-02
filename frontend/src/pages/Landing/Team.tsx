import { useMemo } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useWebsiteCollection } from "@/hooks/useWebsiteCollection";
import type { Locale, Localized, TeamMemberApi } from "@/types/website";
import { GraduationCap, Scale, ShieldCheck, UserCircle2 } from "lucide-react";

const sectionFallback: Record<string, Localized<string>> = {
  badge: { en: "Leadership Team", ar: "الفريق القيادي" },
  title: {
    en: "Legal Minds Leading Digital Justice",
    ar: "عقول قانونية تقود العدالة الرقمية",
  },
  description: {
    en: "Senior partners blending courtroom mastery with transformative technology insight.",
    ar: "شركاء خضرمون يجمعون بين الخبرة القضائية والرؤية التقنية التحولية.",
  },
};

const leadershipBadgeFallback: Localized<string>[] = [
  { en: "Smart Justice Advocate", ar: "مدافع عن العدالة الذكية" },
  { en: "Global Faculty Speaker", ar: "متحدث في برامج دولية" },
  { en: "Cybersecurity Counsel", ar: "مستشار الأمن السيبراني" },
];

const teamFallback: TeamMemberApi[] = [
  {
    id: 1,
    name: {
      en: "Mr. Sami Mohamed El-Gamal",
      ar: "الأستاذ سامي محمد الجمل",
    },
    position: {
      en: "Managing Partner – Commercial Disputes & International Arbitration",
      ar: "الشريك المدير – القضايا التجارية والتحكيم الدولي",
    },
    bio: {
      en: "Architect of high-stakes commercial litigation strategies with more than 18 years representing global corporates, sovereign entities, and leading financial institutions across MENA.",
      ar: "مهندس استراتيجيات التقاضي التجاري عالية القيمة بخبرة تتجاوز 18 عاماً في تمثيل الشركات العالمية والجهات السيادية والمؤسسات المالية الرائدة في المنطقة.",
    },
    highlights: {
      en: [
        "ICC & LCIA accredited counsel leading digital arbitration playbooks and cross-border recovery projects.",
        "Champion of paperless courtrooms and AI-assisted pleading models adopted by tier-one clients.",
      ],
      ar: [
        "محكّم معتمد لدى ICC وLCIA يقود أدلة التحكيم الرقمية ومشاريع الاسترداد العابرة للحدود.",
        "رائد المحاكم بلا أوراق ونماذج المرافعات المدعومة بالذكاء الاصطناعي المعتمدة لدى كبار العملاء.",
      ],
    },
    image: null,
  },
  {
    id: 2,
    name: {
      en: "Mr. Abdelhamid Mohamed Askar",
      ar: "الأستاذ عبدالحميد محمد عسكر",
    },
    position: {
      en: "Partner – Civil Litigation & Cybersecurity Law",
      ar: "شريك – المنازعات المدنية وقانون الأمن السيبراني",
    },
    bio: {
      en: "Specialist in administrative, civil, and cybercrime litigation with a decade leading digital forensics investigations and regulatory transformation programs.",
      ar: "متخصص في المنازعات الإدارية والمدنية والجرائم السيبرانية مع خبرة تمتد لعقد في قيادة التحقيقات الرقمية وبرامج التحول التشريعي.",
    },
    highlights: {
      en: [
        "Designed national cybercrime response frameworks integrating legal, technical, and compliance teams.",
        "Advises on privacy-by-design policies, data localization, and AI governance for regulators and fintech leaders.",
      ],
      ar: [
        "صمم أطر الاستجابة الوطنية للجرائم الإلكترونية بدمج الفرق القانونية والفنية وفِرق الامتثال.",
        "يستشار في سياسات الخصوصية المدمجة بالتصميم وتوطين البيانات وحوكمة الذكاء الاصطناعي للجهات التنظيمية وروّاد التكنولوجيا المالية.",
      ],
    },
    image: null,
  },
];

const leadershipIcons = [Scale, GraduationCap, ShieldCheck];

const Team: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { getValueForLocale } = useWebsiteContent("team");
  const { data: teamData } = useWebsiteCollection<TeamMemberApi>("/api/website/team");

  const badge = getValueForLocale("team_badge", locale, sectionFallback.badge[locale]);
  const title = getValueForLocale("team_title", locale, sectionFallback.title[locale]);
  const description = getValueForLocale(
    "team_description",
    locale,
    sectionFallback.description[locale]
  );

  const leadershipBadges = leadershipIcons.map((Icon, index) => ({
    Icon,
    text:
      getValueForLocale(
        `team_leadership_badge_${index + 1}`,
        locale,
        leadershipBadgeFallback[index][locale]
      ) ?? leadershipBadgeFallback[index][locale],
  }));

  const members = useMemo(() => {
    return teamData.length ? teamData : teamFallback;
  }, [teamData]);

  return (
    <section id="team" className="bg-surface-highlight/70 py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {members.map((member) => {
            const name = member.name[locale] ?? "";
            const role = member.position[locale] ?? "";
            const bio = member.bio[locale] ?? "";
            const highlights = member.highlights[locale] ?? [];

            return (
              <div
                key={`${member.id}-${member.name.en}`}
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
                  {leadershipBadges.map(({ Icon, text }) => (
                    <div
                      key={text}
                      className="rounded-2xl border border-border bg-background/70 p-4 text-center"
                    >
                      <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <p className="text-xs font-semibold text-muted-foreground">{text}</p>
                    </div>
                  ))}
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
