import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MotionSection } from "@/components/landing/landing-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Quote } from "lucide-react";

const Testimonials: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  const testimonials = [
    {
      nameEn: "Managing Partner, Crescent Legal",
      nameAr: "الشريك الإداري، كريسنت ليغال",
      quoteEn:
        "AVOCAT gave us a measurable advantage in litigation readiness. The reporting layer alone changed how we brief clients.",
      quoteAr:
        "منحتنا أفوكات أفضلية قابلة للقياس في جاهزية التقاضي. طبقة التقارير وحدها غيّرت طريقة تواصلنا مع العملاء.",
    },
    {
      nameEn: "General Counsel, Maritime Group",
      nameAr: "المستشار العام، مجموعة بحرية",
      quoteEn:
        "The compliance trails are court-ready and audit-proof. We now trust the system to surface risk before it escalates.",
      quoteAr:
        "مسارات الامتثال جاهزة للمحكمة ومثبتة للتدقيق. أصبحنا نثق بالنظام للكشف المبكر عن المخاطر.",
    },
    {
      nameEn: "Head of Legal Ops, Sovereign Holdings",
      nameAr: "رئيس العمليات القانونية، سافرن القابضة",
      quoteEn:
        "Our teams collaborate faster with fewer handoffs. Every stakeholder sees the same verified narrative.",
      quoteAr:
        "تتعاون فرقنا بسرعة أكبر وبعدد أقل من نقاط التسليم. الجميع يرى نفس السرد الموثق.",
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const active = testimonials[index];

  return (
    <MotionSection id="testimonials" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "شهادات العملاء" : "Testimonials"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "ثقة العملاء هي معيارنا الأول"
            : "Client trust is our primary metric"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "شهادات تعكس أثرًا مباشرًا في أداء الفرق القانونية ووضوح التواصل مع العملاء." 
            : "Stories that reflect measurable impact on legal teams and clarity for clients."}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-8 shadow-[var(--shadow-lg)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.nameEn}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <Quote className="h-10 w-10 text-[hsl(var(--gold))]" />
              <p className="text-lg leading-relaxed text-[hsl(var(--foreground))]">
                “{isArabic ? active.quoteAr : active.quoteEn}”
              </p>
              <p className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">
                {isArabic ? active.nameAr : active.nameEn}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid gap-4">
          {testimonials.map((item, idx) => (
            <button
              key={item.nameEn}
              onClick={() => setIndex(idx)}
              className={`rounded-3xl border px-6 py-4 text-sm transition-all ${
                idx === index
                  ? "border-[hsl(var(--gold))] bg-[hsl(var(--card-elevated))] shadow-[var(--shadow-md)]"
                  : "border-[hsl(var(--nav-border))] bg-[hsl(var(--card))]"
              } ${isArabic ? "text-right" : "text-left"}`}
            >
              <p className="font-semibold text-[hsl(var(--foreground))]">
                {isArabic ? item.nameAr : item.nameEn}
              </p>
              <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))]">
                {isArabic ? item.quoteAr : item.quoteEn}
              </p>
            </button>
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default Testimonials;
