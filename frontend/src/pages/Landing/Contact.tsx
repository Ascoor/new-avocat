import { MotionSection } from "@/components/landing/landing-motion";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, MapPin, PhoneCall, ShieldCheck } from "lucide-react";

const Contact: React.FC = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";

  return (
    <MotionSection id="contact" className="space-y-10">
      <div className="flex flex-col gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]">
          {isArabic ? "تواصل معنا" : "Contact"}
        </p>
        <h2 className="text-3xl font-display text-[hsl(var(--foreground))] sm:text-4xl">
          {isArabic
            ? "ابدأ شراكة قانونية مبنية على الثقة"
            : "Start a trusted legal partnership"}
        </h2>
        <p className="max-w-3xl text-lg text-[hsl(var(--muted-foreground))]">
          {isArabic
            ? "نستقبل طلبات الاستشارة والخدمات الخاصة على مدار الأسبوع. تواصل معنا لنبدأ تقييمًا احترافيًا." 
            : "We accept consultation requests throughout the week. Connect with us to begin a professional assessment."}
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-5 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--surface-overlay))] p-6 shadow-[var(--shadow-lg)]">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold text-[hsl(var(--foreground))]">
              {isArabic ? "الاسم الكامل" : "Full name"}
              <input
                type="text"
                required
                className="mt-2 w-full rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                placeholder={isArabic ? "مثال: أحمد العتيبي" : "e.g. Sarah Johnson"}
              />
            </label>
            <label className="text-sm font-semibold text-[hsl(var(--foreground))]">
              {isArabic ? "البريد الإلكتروني" : "Email"}
              <input
                type="email"
                required
                className="mt-2 w-full rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
                placeholder={isArabic ? "name@avocat.com" : "name@avocat.com"}
              />
            </label>
          </div>

          <label className="text-sm font-semibold text-[hsl(var(--foreground))]">
            {isArabic ? "طبيعة الطلب" : "Type of request"}
            <select
              required
              defaultValue=""
              className="mt-2 w-full rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
            >
              <option value="" disabled>
                {isArabic ? "اختر الخدمة" : "Select a service"}
              </option>
              <option>{isArabic ? "استشارة قانونية استراتيجية" : "Strategic legal consultation"}</option>
              <option>{isArabic ? "حزمة امتثال مؤسسي" : "Corporate compliance package"}</option>
              <option>{isArabic ? "إعداد تقارير تقاضي" : "Litigation reporting"}</option>
            </select>
          </label>

          <label className="text-sm font-semibold text-[hsl(var(--foreground))]">
            {isArabic ? "تفاصيل إضافية" : "Additional details"}
            <textarea
              required
              rows={5}
              className="mt-2 w-full rounded-2xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] px-4 py-3 text-sm text-[hsl(var(--foreground))] outline-none focus:ring-2 focus:ring-[hsl(var(--gold))]"
              placeholder={
                isArabic
                  ? "اذكر الأهداف والتحديات التي ترغب بمعالجتها."
                  : "Share the goals and challenges you want us to address."
              }
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
              <ShieldCheck className="h-4 w-4 text-[hsl(var(--gold))]" />
              {isArabic
                ? "نحفظ بياناتك وفق معايير السرية المهنية."
                : "Your data is protected under professional confidentiality."}
            </div>
            <Button type="submit" variant="accent" className="rounded-full px-6 py-6 text-sm font-semibold">
              {isArabic ? "إرسال الطلب" : "Submit request"}
            </Button>
          </div>
        </form>

        <div className="space-y-6 rounded-3xl border border-[hsl(var(--nav-border))] bg-[hsl(var(--card))] p-6 shadow-[var(--shadow-sm)]">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {isArabic ? "مكتب الرياض" : "Riyadh Office"}
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">
                {isArabic
                  ? "حي العليا، طريق الملك فهد، برج الأعمال القانوني"
                  : "Olaya District, King Fahd Rd, Legal Business Tower"}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
              <PhoneCall className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {isArabic ? "الاتصال المباشر" : "Direct line"}
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">+966 11 555 0303</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[hsl(var(--gold))] text-[hsl(var(--accent-foreground))]">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[hsl(var(--foreground))]">
                {isArabic ? "البريد المهني" : "Professional email"}
              </p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">contact@avocat.legal</p>
            </div>
          </div>
        </div>
      </div>
    </MotionSection>
  );
};

export default Contact;
