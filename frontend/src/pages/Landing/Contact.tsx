import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock3, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";

const contactPoints = [
  {
    icon: MapPin,
    enTitle: "Headquarters",
    arTitle: "المقر الرئيسي",
    enDetails: "Downtown Cairo Smart District, Nile Corniche",
    arDetails: "منطقة القاهرة الذكية – كورنيش النيل",
  },
  {
    icon: Phone,
    enTitle: "Phone",
    arTitle: "الهاتف",
    enDetails: "+20 2 1234 5678 | +971 4 567 8900",
    arDetails: "+٢٠ ٢ ١٢٣٤ ٥٦٧٨ | +٩٧١ ٤ ٥٦٧ ٨٩٠٠",
  },
  {
    icon: Mail,
    enTitle: "Email",
    arTitle: "البريد الإلكتروني",
    enDetails: "contact@avocatlaw.com",
    arDetails: "contact@avocatlaw.com",
  },
  {
    icon: Clock3,
    enTitle: "Business Hours",
    arTitle: "ساعات العمل",
    enDetails: "Sunday – Thursday | 9:00 – 18:00",
    arDetails: "الأحد – الخميس | ٩:٠٠ – ١٨:٠٠",
  },
];

const formCopy = {
  en: {
    badge: "Contact",
    title: "Connect with Avocat Law Firm",
    description: "Schedule a consultation to explore legal digital transformation tailored to your organisation.",
    labels: {
      name: "Name",
      email: "Email",
      message: "Message",
    },
    placeholders: {
      name: "Full Name",
      email: "you@avocatlaw.com",
      message: "Describe your legal technology needs",
    },
    submit: "Send Message",
    submitting: "Sending...",
    note: "Confidential & encrypted submissions",
    conciergeTitle: "24/7 Digital Legal Desk",
    conciergeBody:
      "Dedicated transformation specialists monitor secure channels around the clock to support urgent cases, investigations, and executive briefings.",
    toast: {
      title: "Message sent successfully",
      description: "Our legal transformation consultants will respond within one business day.",
    },
  },
  ar: {
    badge: "اتصل بنا",
    title: "تواصل مع مكتب أفوكات للمحاماة",
    description: "حدد موعداً لاستشارة تستكشف التحول الرقمي القانوني المصمم لمؤسستك.",
    labels: {
      name: "الاسم",
      email: "البريد الإلكتروني",
      message: "الرسالة",
    },
    placeholders: {
      name: "الاسم الكامل",
      email: "you@avocatlaw.com",
      message: "صف احتياجاتك في التحول الرقمي القانوني",
    },
    submit: "إرسال الرسالة",
    submitting: "جارٍ الإرسال...",
    note: "إرساليات سرية ومشفرة",
    conciergeTitle: "مكتب قانوني رقمي على مدار الساعة",
    conciergeBody:
      "فريق متخصص في التحول الرقمي القانوني يعمل على مدار الساعة لدعم القضايا العاجلة والتحقيقات والقيادات التنفيذية.",
    toast: {
      title: "تم إرسال الرسالة بنجاح",
      description: "سيتواصل معك مستشارو التحول الرقمي القانوني خلال يوم عمل واحد.",
    },
  },
};

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { language, direction } = useLanguage();
  const isArabic = language === "ar";
  const copy = formCopy[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      toast({ title: copy.toast.title, description: copy.toast.description });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background py-24" dir={direction}>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span>{copy.badge}</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">{copy.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">{copy.description}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="name">
                    {copy.labels.name}
                  </label>
                  <Input
                    required
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={copy.placeholders.name}
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground" htmlFor="email">
                    {copy.labels.email}
                  </label>
                  <Input
                    required
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={copy.placeholders.email}
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="message">
                  {copy.labels.message}
                </label>
                <Textarea
                  required
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder={copy.placeholders.message}
                  className="resize-none rounded-2xl border-border bg-background/70"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="btn-gold flex w-full items-center justify-center gap-2 py-3 text-base font-semibold"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 text-sm">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    {copy.submitting}
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span>{copy.submit}</span>
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between gap-4 rounded-2xl border border-border bg-background/60 px-6 py-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span>{copy.note}</span>
                </div>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {contactPoints.map((point) => {
              const Icon = point.icon;
              const title = isArabic ? point.arTitle : point.enTitle;
              const details = isArabic ? point.arDetails : point.enDetails;
              return (
                <div
                  key={point.enTitle}
                  className="rounded-3xl border border-border bg-background/70 p-6 shadow-ambient backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className={`${isArabic ? "text-right" : "text-left"}`}>
                      <p className="text-sm font-semibold text-foreground">{title}</p>
                      <p className="text-sm text-muted-foreground">{details}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-3xl border border-border bg-gradient-primary p-8 text-white shadow-premium">
              <h3 className="font-display text-2xl font-semibold">{copy.conciergeTitle}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">{copy.conciergeBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
