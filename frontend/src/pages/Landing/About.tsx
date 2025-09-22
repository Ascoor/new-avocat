import { Building2, Compass, Handshake, Target } from "lucide-react";

const pillars = [
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
      "بوابات آمنة وتقارير ثنائية اللغة ومؤشرات أداء قابلة للقياس في كل مهمة.",
      "حوكمة أخلاقية تضمن السرية والشفافية والمساءلة.",
    ],
  },
];

const About: React.FC = () => {
  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-background to-background" />
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">About Avocat</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">عن أفوكات</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="font-english block">Prestige, Innovation, and Trusted Counsel</span>
            <span className="font-arabic text-accent">الفخامة والابتكار وثقة العملاء</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            We champion digital legal transformation that honours heritage while unlocking smarter, faster justice for every client.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.enTitle}
                className="card-elevated group flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/70 p-8 shadow-ambient backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="rounded-2xl bg-gradient-gold p-3 text-accent-foreground shadow-gold">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-english text-xl font-semibold text-foreground">
                        {pillar.enTitle}
                      </h3>
                      <p className="text-sm uppercase tracking-widest text-muted-foreground">
                        Excellence | تميز
                      </p>
                    </div>
                  </div>
                  <span className="font-arabic text-lg text-accent">{pillar.arTitle}</span>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div dir="ltr" className="space-y-3 text-left">
                    <p className="font-english text-base leading-relaxed text-muted-foreground">
                      {pillar.enDescription}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {pillar.enPoints.map((point) => (
                        <li key={point} className="flex items-start space-x-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span className="font-english leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div dir="rtl" className="space-y-3 text-right">
                    <p className="font-arabic text-base leading-relaxed text-muted-foreground">
                      {pillar.arDescription}
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {pillar.arPoints.map((point) => (
                        <li key={point} className="flex items-start space-x-2 space-x-reverse">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                          <span className="font-arabic leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
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

export default About;
