import { Building2, Compass, Handshake, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import type { Locale, Localized } from "@/types/website";

type PillarDefinition = {
  icon: typeof Building2;
  defaults: {
    title: Localized<string>;
    description: Localized<string>;
    points: Localized<string[]>;
  };
};

const pillarDefinitions: PillarDefinition[] = [
  {
    icon: Building2,
    defaults: {
      title: { en: "Foundation & Heritage", ar: "التأسيس والإرث" },
      description: {
        en: "Founded in 2013, Avocat Law Firm bridges traditional expertise with digital innovation to deliver justice that is safer, more transparent, and more efficient.",
        ar: "تأسس مكتب أفوكات عام 2013 ليكون جسراً بين الخبرة القانونية التقليدية والابتكار الرقمي، مقدماً عدالة أكثر أماناً وشفافية وفعالية.",
      },
      points: {
        en: [
          "Regional footprint spanning Cairo, Dubai, and Riyadh to support complex cross-border mandates.",
          "Digitised more than 12,000 legal files with tamper-proof archives and intelligent retrieval.",
        ],
        ar: [
          "حضور إقليمي يمتد من القاهرة ودبي إلى الرياض لدعم القضايا العابرة للحدود.",
          "رقمنة أكثر من 12,000 ملف قانوني بأرشفة محكمة واسترجاع ذكي.",
        ],
      },
    },
  },
  {
    icon: Target,
    defaults: {
      title: { en: "Vision & Mission", ar: "الرؤية والرسالة" },
      description: {
        en: "To be the leading destination for clients seeking smart digital legal solutions built on trust, speed, and professionalism.",
        ar: "أن نصبح الوجهة الأولى للعملاء الباحثين عن حلول قانونية رقمية ذكية تقوم على الثقة والسرعة والاحترافية.",
      },
      points: {
        en: [
          "Vision: smart justice ecosystems that elevate client confidence and institutional agility.",
          "Mission: orchestrate integrated counsel, technology, and compliance for every mandate.",
        ],
        ar: [
          "الرؤية: منظومات عدالة ذكية تعزز ثقة العملاء ومرونة المؤسسات.",
          "الرسالة: توظيف الاستشارات القانونية والتقنية والامتثال في منظومة واحدة لكل تكليف.",
        ],
      },
    },
  },
  {
    icon: Compass,
    defaults: {
      title: { en: "Future Philosophy", ar: "فلسفة المستقبل" },
      description: {
        en: "We design forward-looking frameworks where law, data, and design converge to shape resilient justice.",
        ar: "نرسم أطر عمل مستقبلية يلتقي فيها القانون بالبيانات والتصميم لصياغة عدالة متينة.",
      },
      points: {
        en: [
          "Innovation sprints prototype digital courtrooms, e-trials, and regulatory sandboxes.",
          "Continuous capability-building for lawyers, analysts, and clients on AI and cybersecurity disciplines.",
        ],
        ar: [
          "مختبرات الابتكار تطور محاكم رقمية ومحاكمات إلكترونية ومساحات تشريعية تجريبية.",
          "برامج تطوير مستمرة للمحامين والمحللين والعملاء في مجالات الذكاء الاصطناعي والأمن السيبراني.",
        ],
      },
    },
  },
  {
    icon: Handshake,
    defaults: {
      title: { en: "Client Commitment", ar: "التزامنا بالعملاء" },
      description: {
        en: "Because we blend deep legal expertise with cutting-edge technology, delivering transparent, innovative, and reliable solutions.",
        ar: "لأننا نمزج بين الخبرة القانونية العميقة وأحدث التقنيات لنقدم حلولاً مبتكرة وشفافة وموثوقة.",
      },
      points: {
        en: [
          "Secure portals, bilingual reporting, and measurable KPIs for every engagement.",
          "Ethical governance that safeguards confidentiality, transparency, and accountability.",
        ],
        ar: [
          "بوابات آمنة وتقارير دقيقة ومؤشرات أداء قابلة للقياس في كل مهمة.",
          "حوكمة أخلاقية تضمن السرية والشفافية والمساءلة.",
        ],
      },
    },
  },
];

const introFallback: Record<string, Localized<string>> = {
  badge: { en: "About Avocat", ar: "عن أفوكات" },
  title: { en: "Prestige, Innovation, and Trusted Counsel", ar: "الفخامة والابتكار وخدمات موثوقة" },
  description: {
    en: "We champion digital legal transformation that honours heritage while unlocking smarter, faster justice for every client.",
    ar: "نقود التحول الرقمي القانوي مع الحفاظ على الإرث وتقديم عدالة أذكى وأسرع لكل عميل.",
  },
  detail: { en: "Digital Leadership", ar: "ريادة رقمية" },
};

const About: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { getLocalizedValue, getValueForLocale } = useWebsiteContent("about");

  const badge = getValueForLocale("about_badge", locale, introFallback.badge[locale]);
  const title = getValueForLocale("about_title", locale, introFallback.title[locale]);
  const description = getValueForLocale(
    "about_description",
    locale,
    introFallback.description[locale]
  );
  const detailLabel = getValueForLocale(
    "about_detail_label",
    locale,
    introFallback.detail[locale]
  );

  const pillars = pillarDefinitions.map((pillar, index) => {
    const position = index + 1;
    const titleBlock = getLocalizedValue<string>(
      `about_pillar_${position}_title`,
      pillar.defaults.title
    );
    const descriptionBlock = getLocalizedValue<string>(
      `about_pillar_${position}_description`,
      pillar.defaults.description
    );
    const pointsBlock = getLocalizedValue<string[]>(
      `about_pillar_${position}_points`,
      pillar.defaults.points
    );

    return {
      icon: pillar.icon,
      defaults: pillar.defaults,
      title: titleBlock,
      description: descriptionBlock,
      points: pointsBlock,
    };
  });

  return (
    <section id="about" className="relative overflow-hidden py-24" dir={direction}>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>

        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const localizedTitle = pillar.title[locale] ?? "";
            const arabicTitle = pillar.title.ar ?? pillar.defaults.title.ar;
            const localizedDescription = pillar.description[locale] ?? "";
            const pointList = pillar.points[locale] ?? [];

            return (
              <div
                key={pillar.defaults.title.en}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/70 p-8 shadow-ambient backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={`${isArabic ? "text-right" : "text-left"}`}>
                      <h3 className="text-xl font-semibold text-foreground">{localizedTitle}</h3>
                      <p
                        className={`text-sm text-muted-foreground ${
                          isArabic ? "" : "uppercase tracking-widest"
                        }`}
                      >
                        {detailLabel}

                      </p>
                    </div>
                  </div>
                  <span className="font-arabic text-lg text-accent">{arabicTitle}</span>
                </div>
                <div className={`space-y-3 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  <p>{localizedDescription}</p>
                  <ul className="space-y-2 text-sm">
                    {pointList.map((point) => (
                      <li
                        key={point}
                        className={`flex items-start gap-2 ${isArabic ? "flex-row-reverse text-right" : ""}`}
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
