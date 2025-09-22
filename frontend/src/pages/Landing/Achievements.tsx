 
import { useLanguage } from "@/contexts/LanguageContext";
import { Gavel, MessageSquareQuote, Trophy } from "lucide-react";

type Achievement = {
  icon: typeof Gavel;
  enTitle: string;
  arTitle: string;
  enSummary: string;
  arSummary: string;
  enDetails: string[];
  arDetails: string[];
};

const achievements: Achievement[] = [
 
  {
    icon: Gavel,
    enTitle: "Landmark Cases",
    arTitle: "قضايا محورية",
    enSummary:
      "Recovered USD 240M in a cross-border fraud dispute by orchestrating digital evidence mapping and coordinated arbitration strategy.",
    arSummary:
      "استرداد 240 مليون دولار في نزاع احتيال عابر للحدود عبر رسم خريطة رقمية للأدلة واستراتيجية تحكيم منسقة.",
    enDetails: [
      "First MENA firm to validate blockchain records as admissible court evidence.",
      "Hybrid teams blended forensic auditors, litigators, and cybersecurity analysts.",
    ],
    arDetails: [
      "أول مكتب في المنطقة يعتمد سجلات البلوكتشين كأدلة مقبولة قضائياً.",
      "فرق هجينة تجمع بين خبراء التدقيق الجنائي والمحامين ومحللي الأمن السيبراني.",
    ],
  },
  {
    icon: MessageSquareQuote,
    enTitle: "Client Testimonials",
    arTitle: "شهادات العملاء",
    enSummary:
      '“Avocat delivers unparalleled transparency. Our executives monitor hearings, filings, and KPIs live across devices.” – CFO, Regional Energy Group',
    arSummary:
      '"أفوكات يقدم شفافية غير مسبوقة؛ مديرونا يتابعون الجلسات والمذكرات ومؤشرات الأداء مباشرة عبر مختلف الأجهزة." – المدير المالي لمجموعة طاقة إقليمية',
    enDetails: [
      "96% client satisfaction with bilingual reporting and secured collaboration rooms.",
      "Dedicated digital concierge supporting ministries, sovereign funds, and innovation hubs.",
    ],
    arDetails: [ 
      "رضا العملاء بنسبة 96٪ بفضل التقارير الدقيقة وغرف التعاون المؤمنة.",
 
      "فريق دعم رقمي متخصص لخدمة الوزارات والصناديق السيادية وحاضنات الابتكار.",
    ],
  },
  {
    icon: Trophy,
    enTitle: "Notable Judgments",
    arTitle: "أحكام مميزة",
    enSummary:
      "Secured precedent-setting administrative and criminal judgments reinforcing digital signatures, cybercrime protection, and compliance governance.",
    arSummary:
      "أحكام إدارية وجنائية رائدة عززت قبول التوقيعات الرقمية وحماية الأمن السيبراني وحوكمة الامتثال.",
    enDetails: [
      "Court-endorsed e-signature framework adopted across three national authorities.",
      "Pioneered criminal court protocols for handling AI-generated evidence.",
    ],
    arDetails: [
      "إطار عمل للتوقيع الإلكتروني معتمد قضائياً تبنته ثلاث جهات حكومية وطنية.",
      "إرساء بروتوكولات للمحاكم الجنائية للتعامل مع الأدلة المولدة بالذكاء الاصطناعي.",
    ],
  },
];

const metrics = [
  { 
    en: "98% digital adoption across client mandates",
    ar: "نسبة تحول رقمي 98٪ في ملفات العملاء",
  },
  {
    en: "45+ jurisdictions coordinated with multilingual teams",
    ar: "أكثر من 45 ولاية قضائية بدعم فرق متعددة اللغات",
  },
  {
    en: "24/7 incident response and legal command centers",
    ar: "مراكز قيادة واستجابة قانونية على مدار الساعة",
  },
];

const sectionCopy = {
  en: {
    badge: "Achievements",
    title: "Proven Outcomes, Trusted by Leaders",
    description:
      "Landmark victories, transformative partnerships, and digitally-enabled judgments that redefine legal excellence.",
  },
  ar: {
    badge: "الإنجازات",
    title: "نتائج مثبتة يثق بها القادة",
    description:
      "انتصارات مفصلية وشراكات تحولية وأحكام رقمية تعيد تعريف التميز القانوني.",
  },
};

const Achievements: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section id="achievements" className="bg-background py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => {
            const label = isArabic ? metric.ar : metric.en;
            return (
              <div
                key={metric.en}
                className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-6 text-center shadow-ambient"
              >
                <p className="text-sm font-semibold text-primary">{label}</p>
              </div>
            );
          })}
 
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon; 
            const title = isArabic ? achievement.arTitle : achievement.enTitle;
            const summary = isArabic ? achievement.arSummary : achievement.enSummary;
            const details = isArabic ? achievement.arDetails : achievement.enDetails;

            return (
              <div
                key={achievement.enTitle}
                className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                </div>

                <p className={`text-base leading-relaxed text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  {summary}
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
      </div>
    </section>
  );
};

export default Achievements;
