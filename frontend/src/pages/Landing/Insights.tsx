import { useLanguage } from "@/contexts/LanguageContext";
import { useWebsiteContent } from "@/hooks/useWebsiteContent";
import { useWebsiteCollection } from "@/hooks/useWebsiteCollection";
import type { ArticleApi, Locale, Localized } from "@/types/website";
import { BrainCircuit, Newspaper, ShieldAlert } from "lucide-react";

const sectionFallback: Record<string, Localized<string>> = {
  badge: { en: "Insights & Blog", ar: "مدونة التحول الرقمي" },
  title: {
    en: "Thought Leadership in Digital Legal Transformation",
    ar: "ريادة فكرية في التحول الرقمي القانوني",
  },
  description: {
    en: "Perspectives that help boards, innovators, and legal teams navigate AI, cybersecurity, and smart justice reforms.",
    ar: "رؤى تساعد مجالس الإدارة والمبتكرين والفرق القانونية على التنقل في مجالات الذكاء الاصطناعي والأمن السيبراني وإصلاحات العدالة الذكية.",
  },
  cta: { en: "Read the full insight ↗", ar: "اقرأ التحليل الكامل ↗" },
};

const fallbackArticles: ArticleApi[] = [
  {
    id: 1,
    title: {
      en: "AI Governance for the Modern Law Firm",
      ar: "حوكمة الذكاء الاصطناعي في مكاتب المحاماة الحديثة",
    },
    tag: {
      en: "Digital Legal Transformation",
      ar: "التحول القانوني الرقمي",
    },
    summary: {
      en: "Discover how predictive analytics, machine learning assistants, and ethical frameworks accelerate precedent research while preserving professional responsibility.",
      ar: "اكتشف كيف تسرّع التحليلات التنبؤية والمساعدات المعتمدة على التعلم الآلي والأطر الأخلاقية عمليات البحث في السوابق مع الحفاظ على المسؤولية المهنية.",
    },
    body: {
      en: "An in-depth look at how AI enhances legal research, risk scoring, and ethical governance frameworks across global mandates.",
      ar: "تحليل معمق لدور الذكاء الاصطناعي في تطوير البحث القانوني وتقييم المخاطر مع الالتزام بالمعايير الأخلاقية العالمية.",
    },
    slug: "ai-governance-modern-law-firm",
    cover_image: null,
  },
  {
    id: 2,
    title: {
      en: "Smart Justice Dashboards for Executives",
      ar: "لوحات عدالة ذكية للقيادات التنفيذية",
    },
    tag: {
      en: "Client Transparency",
      ar: "شفافية العملاء",
    },
    summary: {
      en: "Dashboards that integrate litigation status, budget analytics, and client sentiment deliver real-time governance to boards and ministries.",
      ar: "لوحات تحكم تدمج حالة القضايا وتحليلات الميزانيات ومؤشرات رضا العملاء لتوفير حوكمة لحظية لمجالس الإدارة والوزارات.",
    },
    body: {
      en: "A study on how smart justice dashboards consolidate legal performance, financial KPIs, and client expectations into a single source of truth.",
      ar: "دراسة حول كيفية تقديم لوحات العدالة الذكية رؤية موحدة للأداء القانوني والمالي وتوقعات العملاء.",
    },
    slug: "smart-justice-dashboards-executives",
    cover_image: null,
  },
  {
    id: 3,
    title: {
      en: "Cybercrime Playbooks for Regulated Industries",
      ar: "أدلة مكافحة الجرائم الإلكترونية للقطاعات المنظمة",
    },
    tag: {
      en: "Cybersecurity",
      ar: "الأمن السيبراني",
    },
    summary: {
      en: "From financial services to healthcare, explore compliant digital forensics, incident response, and cross-border notification strategies.",
      ar: "من الخدمات المالية إلى الرعاية الصحية، استكشف التحقيقات الرقمية المتوافقة، والاستجابة للحوادث، واستراتيجيات الإخطار العابرة للحدود.",
    },
    body: {
      en: "A roadmap for regulators to build cybercrime response playbooks that align with international standards and protect digital trust.",
      ar: "خريطة طريق للجهات المنظمة لتصميم أدلة استجابة للحوادث تتوافق مع المعايير الدولية وتحمي الثقة الرقمية.",
    },
    slug: "cybercrime-playbooks-regulated-industries",
    cover_image: null,
  },
];

const articleIcons = [BrainCircuit, Newspaper, ShieldAlert];

const Insights: React.FC = () => {
  const { language, direction } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === "ar";
  const { getValueForLocale } = useWebsiteContent("articles");
  const { data: articlesData } = useWebsiteCollection<ArticleApi>("/api/website/articles");

  const badge = getValueForLocale("articles_badge", locale, sectionFallback.badge[locale]);
  const title = getValueForLocale("articles_title", locale, sectionFallback.title[locale]);
  const description = getValueForLocale(
    "articles_description",
    locale,
    sectionFallback.description[locale]
  );
  const cta = getValueForLocale("articles_cta", locale, sectionFallback.cta[locale]);

  const articles = (articlesData.length ? articlesData : fallbackArticles).slice(0, 3);

  return (
    <section id="insights" className="bg-background py-24" dir={direction}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{description}</p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {articles.map((article, index) => {
            const Icon = articleIcons[index % articleIcons.length];
            const localizedTitle = article.title[locale] ?? "";
            const summary = article.summary[locale] ?? article.body[locale] ?? "";
            const tag = article.tag[locale] ?? "";

            return (
              <article
                key={article.slug ?? `${article.id}-${index}`}
                className="flex h-full flex-col rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">{tag}</span>
                </div>
                <div className={`space-y-4 ${isArabic ? "text-right" : "text-left"}`}>
                  <h3 className="text-xl font-semibold text-foreground">{localizedTitle}</h3>
                  <p className="text-base leading-relaxed text-muted-foreground">{summary}</p>
                </div>
                <div className={`mt-6 flex-1 border-t border-border pt-4 text-sm text-muted-foreground ${isArabic ? "text-right" : "text-left"}`}>
                  {cta}

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
