import { useLanguage } from "@/contexts/LanguageContext";
import { BrainCircuit, Newspaper, ShieldAlert } from "lucide-react";

type Article = {
  icon: typeof BrainCircuit;
  enTitle: string;
  arTitle: string;
  enSummary: string;
  arSummary: string;
  enTag: string;
  arTag: string;
};

const articles: Article[] = [
  {
    icon: BrainCircuit,
    enTitle: "AI Governance for the Modern Law Firm",
    arTitle: "حوكمة الذكاء الاصطناعي في مكاتب المحاماة الحديثة",
    enSummary:
      "Discover how predictive analytics, machine learning assistants, and ethical frameworks accelerate precedent research while preserving professional responsibility.",
    arSummary:
      "اكتشف كيف تسرّع التحليلات التنبؤية والمساعدات المعتمدة على التعلم الآلي والأطر الأخلاقية عمليات البحث في السوابق مع الحفاظ على المسؤولية المهنية.",
    enTag: "Digital Legal Transformation",
    arTag: "التحول القانوني الرقمي",
  },
  {
    icon: Newspaper,
    enTitle: "Smart Justice Dashboards for Executives",
    arTitle: "لوحات عدالة ذكية للقيادات التنفيذية",
    enSummary:
      "Dashboards that integrate litigation status, budget analytics, and client sentiment deliver real-time governance to boards and ministries.",
    arSummary:
      "لوحات تحكم تدمج حالة القضايا وتحليلات الميزانيات ومؤشرات رضا العملاء لتوفير حوكمة لحظية لمجالس الإدارة والوزارات.",
    enTag: "Client Transparency",
    arTag: "شفافية العملاء",
  },
  {
    icon: ShieldAlert,
    enTitle: "Cybercrime Playbooks for Regulated Industries",
    arTitle: "أدلة مكافحة الجرائم الإلكترونية للقطاعات المنظمة",
    enSummary:
      "From financial services to healthcare, explore compliant digital forensics, incident response, and cross-border notification strategies.",
    arSummary:
      "من الخدمات المالية إلى الرعاية الصحية، استكشف التحقيقات الرقمية المتوافقة، والاستجابة للحوادث، واستراتيجيات الإخطار العابرة للحدود.",
    enTag: "Cybersecurity",
    arTag: "الأمن السيبراني",
  },
];

const sectionCopy = {
  en: {
    badge: "Insights & Blog",
    title: "Thought Leadership in Digital Legal Transformation",
    description:
      "Perspectives that help boards, innovators, and legal teams navigate AI, cybersecurity, and smart justice reforms.",
    cta: "Read the full insight ↗",
  },
  ar: {
    badge: "مدونة التحول الرقمي",
    title: "ريادة فكرية في التحول الرقمي القانوني",
    description:
      "رؤى تساعد مجالس الإدارة والمبتكرين والفرق القانونية على التنقل في مجالات الذكاء الاصطناعي والأمن السيبراني وإصلاحات العدالة الذكية.",
    cta: "اقرأ التحليل الكامل ↗",
  },
};

const Insights: React.FC = () => {
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = sectionCopy[language];

  return (
    <section id="insights" className="bg-background py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon;
            const title = isArabic ? article.arTitle : article.enTitle;
            const summary = isArabic ? article.arSummary : article.enSummary;
            const tag = isArabic ? article.arTag : article.enTag;

            return (
              <article
                key={article.enTitle}
                className="flex h-full flex-col rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{tag}</span>
                </div>
                <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{summary}</p>
                </div>
                <div className={`mt-6 flex-1 border-t border-border pt-4 text-sm text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  {copy.cta}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Insights;
