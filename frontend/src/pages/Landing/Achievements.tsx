import { Gavel, MessageSquareQuote, Trophy } from "lucide-react";

const achievements = [
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
      "رضا العملاء بنسبة 96٪ بفضل التقارير ثنائية اللغة وغرف التعاون المؤمنة.",
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
    labelEn: "98% digital adoption across client mandates",
    labelAr: "نسبة تحول رقمي 98٪ في ملفات العملاء",
  },
  {
    labelEn: "45+ jurisdictions coordinated with multilingual teams",
    labelAr: "أكثر من 45 ولاية قضائية بدعم فرق متعددة اللغات",
  },
  {
    labelEn: "24/7 incident response and legal command centers",
    labelAr: "مراكز قيادة واستجابة قانونية على مدار الساعة",
  },
];

const Achievements: React.FC = () => {
  return (
    <section id="achievements" className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">Achievements</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">الإنجازات</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="font-english">Proven Outcomes, Trusted by Leaders</span>
            <span className="font-arabic text-accent">نتائج مثبتة يثق بها القادة</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Landmark victories, transformative partnerships, and digitally-enabled judgments that redefine legal excellence.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div
              key={metric.labelEn}
              className="rounded-3xl border border-border bg-gradient-to-br from-primary/5 via-background to-background p-6 text-center shadow-ambient"
            >
              <p className="font-english text-sm font-semibold text-primary">{metric.labelEn}</p>
              <p className="font-arabic text-sm text-muted-foreground">{metric.labelAr}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.enTitle}
                className="flex h-full flex-col rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center space-x-3">
                  <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-english text-xl font-semibold text-foreground">{achievement.enTitle}</h3>
                    <p className="font-arabic text-lg text-accent">{achievement.arTitle}</p>
                  </div>
                </div>

                <div className="flex flex-1 flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <p className="font-english text-base leading-relaxed text-muted-foreground">
                      {achievement.enSummary}
                    </p>
                    <p className="font-arabic text-base leading-relaxed text-muted-foreground">
                      {achievement.arSummary}
                    </p>
                  </div>
                  <div className="grid gap-4">
                    <div dir="ltr" className="space-y-2 text-left text-sm text-muted-foreground">
                      {achievement.enDetails.map((detail) => (
                        <div key={detail} className="flex items-start space-x-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="font-english leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                    <div dir="rtl" className="space-y-2 text-right text-sm text-muted-foreground">
                      {achievement.arDetails.map((detail) => (
                        <div key={detail} className="flex items-start space-x-2 space-x-reverse">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="font-arabic leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
