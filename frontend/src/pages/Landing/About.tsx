import { Building2, Compass, Handshake, Target } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Pillar = {
  icon: typeof Building2;
  enTitle: string;
  arTitle: string;
  enDescription: string;
  arDescription: string;
  enPoints: string[];
  arPoints: string[];
};

const pillars: Pillar[] = [
  {
    icon: Building2,
    enTitle: "Foundation & Heritage",
    arTitle: "التأسيس والإرث",
    enDescription:
      "Founded in 2013, Avocat Law Firm bridges traditional expertise with digital innovation to deliver justice that is safer, more transparent, and more efficient.",
    arDescription:
      "تأسس مكتب أفوكات عام 2013 ليكون جسراً بين الخبرة القانونية التقليدية والابتكار الرقمي، مقدماً عدالة أكثر أماناً وشفافية وفعالية.",
    enPoints: [
      "Regional footprint spanning Cairo, Dubai, and Riyadh to support complex cross-border mandates.",
      "Digitised more than 12,000 legal files with tamper-proof archives and intelligent retrieval.",
    ],
    arPoints: [
      "حضور إقليمي يمتد من القاهرة ودبي إلى الرياض لدعم القضايا العابرة للحدود.",
      "رقمنة أكثر من 12,000 ملف قانوني بأرشفة محكمة واسترجاع ذكي.",
    ],
  },
  {
    icon: Target,
    enTitle: "Vision & Mission",
    arTitle: "الرؤية والرسالة",
    enDescription:
      "To be the leading destination for clients seeking smart digital legal solutions built on trust, speed, and professionalism.",
    arDescription:
      "أن نصبح الوجهة الأولى للعملاء الباحثين عن حلول قانونية رقمية ذكية تقوم على الثقة والسرعة والاحترافية.",
    enPoints: [
      "Vision: smart justice ecosystems that elevate client confidence and institutional agility.",
      "Mission: orchestrate integrated counsel, technology, and compliance for every mandate.",
    ],
    arPoints: [
      "الرؤية: منظومات عدالة ذكية تعزز ثقة العملاء ومرونة المؤسسات.",
      "الرسالة: توظيف الاستشارات القانونية والتقنية والامتثال في منظومة واحدة لكل تكليف.",
    ],
  },
  {
    icon: Compass,
    enTitle: "Future Philosophy",
    arTitle: "فلسفة المستقبل",
    enDescription:
      "We design forward-looking frameworks where law, data, and design converge to shape resilient justice.",
    arDescription:
      "نرسم أطر عمل مستقبلية يلتقي فيها القانون بالبيانات والتصميم لصياغة عدالة متينة.",
    enPoints: [
      "Innovation sprints prototype digital courtrooms, e-trials, and regulatory sandboxes.",
      "Continuous capability-building for lawyers, analysts, and clients on AI and cybersecurity disciplines.",
    ],
    arPoints: [
      "مختبرات الابتكار تطور محاكم رقمية ومحاكمات إلكترونية ومساحات تشريعية تجريبية.",
      "برامج تطوير مستمرة للمحامين والمحللين والعملاء في مجالات الذكاء الاصطناعي والأمن السيبراني.",
    ],
  },
  {
    icon: Handshake,
    enTitle: "Client Commitment",
    arTitle: "التزامنا بالعملاء",
    enDescription:
      "Because we blend deep legal expertise with cutting-edge technology, delivering transparent, innovative, and reliable solutions.",
    arDescription:
      "لأننا نمزج بين الخبرة القانونية العميقة وأحدث التقنيات لنقدم حلولاً مبتكرة وشفافة وموثوقة.",
    enPoints: [
      "Secure portals, bilingual reporting, and measurable KPIs for every engagement.",
      "Ethical governance that safeguards confidentiality, transparency, and accountability.",
    ],
    arPoints: [
      "بوابات آمنة وتقارير دقيقة ومؤشرات أداء قابلة للقياس في كل مهمة.",
      "حوكمة أخلاقية تضمن السرية والشفافية والمساءلة.",
    ],
  },
];

const introCopy = {
  en: {
    badge: "About Avocat",
    title: "Prestige, Innovation, and Trusted Counsel",
    description:
      "We champion digital legal transformation that honours heritage while unlocking smarter, faster justice for every client.",
  },
  ar: {
    badge: "عن أفوكات",
    title: "الفخامة والابتكار وخدمات موثوقة",
    description:
      "نقود التحول الرقمي القانوني مع الحفاظ على الإرث وتقديم عدالة أذكى وأسرع لكل عميل.",
  },
};

const detailLabel = {
  en: "Digital Leadership",
  ar: "ريادة رقمية",
};

const About: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = introCopy[language];

  return (
    <section id="about" className="relative overflow-hidden py-24" dir={direction}>
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            {copy.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            const title = isArabic ? pillar.arTitle : pillar.enTitle;
            const description = isArabic ? pillar.arDescription : pillar.enDescription;
            const points = isArabic ? pillar.arPoints : pillar.enPoints;

            return (
              <div
                key={pillar.enTitle}
                className="group flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/70 p-8 shadow-ambient backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={`${isArabic ? "text-right" : "text-left"}`}>
                      <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                      <p
                        className={`text-sm text-muted-foreground ${
                          isArabic ? "" : "uppercase tracking-widest"
                        }`}
                      >
                        {detailLabel[language]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`space-y-3 text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  <p>{description}</p>
                  <ul className="space-y-2 text-sm">
                    {points.map((point) => (
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
