import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useWebsiteCollection } from "@/hooks/useWebsiteCollection";
import type { AchievementApi, Locale, Localized } from "@/types/website";
import { Gavel, MessageSquareQuote, Trophy } from "lucide-react";

type AchievementStoryDefinition = {
  icon: typeof Gavel;
  defaults: {
    title: Localized<string>;
    summary: Localized<string>;
    details: Localized<string[]>;
  };
};

const storyDefinitions: AchievementStoryDefinition[] = [
  {
    icon: Gavel,
    defaults: {
      title: { en: "Landmark Cases", ar: "قضايا محورية" },
      summary: {
        en: "Recovered USD 240M in a cross-border fraud dispute by orchestrating digital evidence mapping and coordinated arbitration strategy.",
        ar: "استرداد 240 مليون دولار في نزاع احتيال عابر للحدود عبر رسم خريطة رقمية للأدلة واستراتيجية تحكيم منسقة.",
      },
      details: {
        en: [
          "First MENA firm to validate blockchain records as admissible court evidence.",
          "Hybrid teams blended forensic auditors, litigators, and cybersecurity analysts.",
        ],
        ar: [
          "أول مكتب في المنطقة يعتمد سجلات البلوكتشين كأدلة مقبولة قضائياً.",
          "فرق هجينة تجمع بين خبراء التدقيق الجنائي والمحامين ومحللي الأمن السيبراني.",
        ],
      },
    },
  },
  {
    icon: MessageSquareQuote,
    defaults: {
      title: { en: "Client Testimonials", ar: "شهادات العملاء" },
      summary: {
        en: "“Avocat delivers unparalleled transparency. Our executives monitor hearings, filings, and KPIs live across devices.” – CFO, Regional Energy Group",
        ar: "\"أفوكات يقدم شفافية غير مسبوقة؛ مديرونا يتابعون الجلسات والمذكرات ومؤشرات الأداء مباشرة عبر مختلف الأجهزة.\" – المدير المالي لمجموعة طاقة إقليمية",
      },
      details: {
        en: [
          "96% client satisfaction with bilingual reporting and secured collaboration rooms.",
          "Dedicated digital concierge supporting ministries, sovereign funds, and innovation hubs.",
        ],
        ar: [
          "رضا العملاء بنسبة 96٪ بفضل التقارير الدقيقة وغرف التعاون المؤمنة.",
          "فريق دعم رقمي متخصص لخدمة الوزارات والصناديق السيادية وحاضنات الابتكار.",
        ],
      },
    },
  },
  {
    icon: Trophy,
    defaults: {
      title: { en: "Notable Judgments", ar: "أحكام مميزة" },
      summary: {
        en: "Secured precedent-setting administrative and criminal judgments reinforcing digital signatures, cybercrime protection, and compliance governance.",
        ar: "أحكام إدارية وجنائية رائدة عززت قبول التوقيعات الرقمية وحماية الأمن السيبراني وحوكمة الامتثال.",
      },
      details: {
        en: [
          "Court-endorsed e-signature framework adopted across three national authorities.",
          "Pioneered criminal court protocols for handling AI-generated evidence.",
        ],
        ar: [
          "إطار عمل للتوقيع الإلكتروني معتمد قضائياً تبنته ثلاث جهات حكومية وطنية.",
          "إرساء بروتوكولات للمحاكم الجنائية للتعامل مع الأدلة المولدة بالذكاء الاصطناعي.",
        ],
      },
    },
  },
];

const sectionFallback: Record<string, Localized<string>> = {
  badge: { en: "Achievements", ar: "الإنجازات" },
  title: {
    en: "Proven Outcomes, Trusted by Leaders",
    ar: "نتائج مثبتة يثق بها القادة",
  },
  description: {
    en: "Landmark victories, transformative partnerships, and digitally-enabled judgments that redefine legal excellence.",
    ar: "انتصارات مفصلية وشراكات تحولية وأحكام رقمية تعيد تعريف التميز القانوني.",
  },
};

const metricsFallback: Localized<string>[] = [
  { en: "98% digital adoption across client mandates", ar: "نسبة تحول رقمي 98٪ في ملفات العملاء" },
  { en: "45+ jurisdictions coordinated with multilingual teams", ar: "أكثر من 45 ولاية قضائية بدعم فرق متعددة اللغات" },
  { en: "24/7 incident response and legal command centers", ar: "مراكز قيادة واستجابة قانونية على مدار الساعة" },
];

const Achievements: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { getLocalizedValue, getValueForLocale } = useWebsiteContent("achievements");
  const { data: stats } = useWebsiteCollection<AchievementApi>("/api/website/achievements");

  const badge = getValueForLocale("achievements_badge", locale, sectionFallback.badge[locale]);
  const title = getValueForLocale("achievements_title", locale, sectionFallback.title[locale]);
  const description = getValueForLocale(
    "achievements_description",
    locale,
    sectionFallback.description[locale]
  );

  const metrics = metricsFallback.map((fallback, index) =>
    getValueForLocale(`achievements_metric_${index + 1}`, locale, fallback[locale])
  );

  const stories = storyDefinitions.map((story, index) => {
    const titleBlock = getLocalizedValue<string>(
      `achievements_story_${index + 1}_title`,
      story.defaults.title
    );
    const summaryBlock = getLocalizedValue<string>(
      `achievements_story_${index + 1}_summary`,
      story.defaults.summary
    );
    const detailsBlock = getLocalizedValue<string[]>(
      `achievements_story_${index + 1}_details`,
      story.defaults.details
    );

    return {
      icon: story.icon,
      defaults: story.defaults,
      title: titleBlock,
      summary: summaryBlock,
      details: detailsBlock,
    };
  });

  const achievementStats = stats.length ? stats : [];

  return (
    <section id="achievements" className="bg-background py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric, index) => (
            <div
              key={`${metric}-${index}`}
              className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-6 text-center shadow-ambient"
            >
              <p className="text-sm font-semibold text-primary">{metric}</p>
            </div>
          ))}

        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {stories.map((story) => {
            const Icon = story.icon;
            const localizedTitle = story.title[locale] ?? "";
            const localizedSummary = story.summary[locale] ?? "";
            const details = story.details[locale] ?? [];

            return (
              <div
                key={story.defaults.title.en}
                className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{localizedTitle}</h3>
                </div>

                <p className={`text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  {localizedSummary}
                </p>

                <ul className="space-y-3 text-sm text-muted-foreground">
                  {details.map((detail) => (
                    <li
                      key={detail}
                      className={`flex items-start gap-2 ${isArabic ? "flex-row-reverse text-right" : ""}`}
                    >
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {achievementStats.length > 0 && (
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {achievementStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-3xl border border-border bg-card/70 p-6 text-center shadow-elevated"
              >
                <div className="text-3xl font-bold text-primary">{stat.number.toLocaleString()}</div>
                <div className="mt-2 text-sm font-semibold text-muted-foreground">
                  {stat.title[locale] ?? stat.title.en ?? ""}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Achievements;
