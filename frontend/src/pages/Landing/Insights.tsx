import { BrainCircuit, Newspaper, ShieldAlert } from "lucide-react";

const articles = [
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
      "من الخدمات المالية إلى الرعاية الصحية، استكشف التحقيقات الرقمية المتوافقة، والاستجابة للحوادث، واستراتيجيات الإخطار العابر للحدود.",
    enTag: "Cybersecurity",
    arTag: "الأمن السيبراني",
  },
];

const Insights: React.FC = () => {
  return (
    <section id="insights" className="bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">Insights & Blog</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">مدونة التحول الرقمي</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="font-english">Thought Leadership in Digital Legal Transformation</span>
            <span className="font-arabic text-accent">ريادة فكرية في التحول الرقمي القانوني</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Perspectives that help boards, innovators, and legal teams navigate AI, cybersecurity, and smart justice reforms.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <article
                key={article.enTitle}
                className="flex h-full flex-col rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    <span className="font-english">{article.enTag}</span>
                    <span className="mx-1 text-muted-foreground">|</span>
                    <span className="font-arabic">{article.arTag}</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-english text-xl font-semibold text-foreground">{article.enTitle}</h3>
                    <p className="font-arabic text-lg text-accent">{article.arTitle}</p>
                  </div>
                  <p className="font-english text-base leading-relaxed text-muted-foreground">{article.enSummary}</p>
                  <p className="font-arabic text-base leading-relaxed text-muted-foreground">{article.arSummary}</p>
                </div>
                <div className="mt-6 flex-1 border-t border-border pt-4 text-sm text-muted-foreground">
                  <p className="font-english">Read the full insight &rsaquo;</p>
                  <p className="font-arabic">اطلع على التحليل الكامل ↗</p>
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
