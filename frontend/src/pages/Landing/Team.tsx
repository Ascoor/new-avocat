import { GraduationCap, Scale, ShieldCheck, UserCircle2 } from "lucide-react";

const teamMembers = [
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

const Team: React.FC = () => {
  return (
    <section id="team" className="bg-surface-highlight/70 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">Leadership Team</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">الفريق القيادي</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="font-english">Legal Minds Leading Digital Justice</span>
            <span className="font-arabic text-accent">عقول قانونية تقود العدالة الرقمية</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Senior partners blending courtroom mastery with transformative technology insight.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {teamMembers.map((member) => (
            <div
              key={member.nameEn}
              className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-3xl bg-gradient-gold p-4 text-accent-foreground shadow-gold">
                  <UserCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="font-english text-2xl font-semibold text-foreground">{member.nameEn}</h3>
                  <p className="font-arabic text-xl text-accent">{member.nameAr}</p>
                  <p className="mt-2 font-english text-sm uppercase tracking-widest text-muted-foreground">
                    {member.roleEn}
                  </p>
                  <p className="font-arabic text-sm text-muted-foreground">{member.roleAr}</p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div dir="ltr" className="space-y-3 text-left">
                  <p className="font-english text-base leading-relaxed text-muted-foreground">{member.bioEn}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {member.highlights.map((highlight) => (
                      <li key={highlight.en} className="flex items-start space-x-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                        <span className="font-english leading-relaxed">{highlight.en}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div dir="rtl" className="space-y-3 text-right">
                  <p className="font-arabic text-base leading-relaxed text-muted-foreground">{member.bioAr}</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {member.highlights.map((highlight) => (
                      <li key={highlight.ar} className="flex items-start space-x-2 space-x-reverse">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span className="font-arabic leading-relaxed">{highlight.ar}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border bg-background/70 p-4 text-center">
                  <Scale className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="font-english text-xs font-semibold text-muted-foreground">Smart Justice Advocate</p>
                  <p className="font-arabic text-xs text-muted-foreground">مدافع عن العدالة الذكية</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4 text-center">
                  <GraduationCap className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="font-english text-xs font-semibold text-muted-foreground">Global Faculty Speaker</p>
                  <p className="font-arabic text-xs text-muted-foreground">متحدث في برامج دولية</p>
                </div>
                <div className="rounded-2xl border border-border bg-background/70 p-4 text-center">
                  <ShieldCheck className="mx-auto mb-2 h-6 w-6 text-primary" />
                  <p className="font-english text-xs font-semibold text-muted-foreground">Cybersecurity Counsel</p>
                  <p className="font-arabic text-xs text-muted-foreground">مستشار الأمن السيبراني</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
