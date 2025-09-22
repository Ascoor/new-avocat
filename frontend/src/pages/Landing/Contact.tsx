import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

const Contact: React.FC = () => {
  const { toast } = useToast();
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
      toast({
        title: "Message sent successfully",
        description: "Our legal transformation consultants will respond within one business day.",
      });
      setFormData({ name: "", email: "", message: "" });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-gradient-to-br from-background via-secondary/10 to-background py-24">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute -left-20 top-32 h-72 w-72 rounded-full bg-primary/40 blur-3xl" />
        <div className="absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent/40 blur-3xl" />
      </div>
      <div className="container relative mx-auto px-4 lg:px-8">
        <div className="mb-16 text-center">
          <div className="inline-flex items-center space-x-3 rounded-full border border-border bg-card px-5 py-2 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="font-english">Contact</span>
            <span className="text-muted-foreground">|</span>
            <span className="font-arabic">اتصل بنا</span>
          </div>
          <h2 className="mt-6 text-4xl font-display font-bold text-foreground lg:text-5xl">
            <span className="font-english">Connect with Avocat Law Firm</span>
            <span className="font-arabic text-accent">تواصل مع مكتب أفوكات للمحاماة</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground lg:text-xl">
            Schedule a consultation to explore legal digital transformation tailored to your organisation.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span className="font-english">Name</span>
                    <span className="font-arabic">الاسم</span>
                  </label>
                  <Input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name | الاسم الكامل"
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center justify-between text-sm font-medium text-foreground">
                    <span className="font-english">Email</span>
                    <span className="font-arabic">البريد الإلكتروني</span>
                  </label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@avocatlaw.com"
                    className="h-12 rounded-2xl border-border bg-background/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="flex items-center justify-between text-sm font-medium text-foreground">
                  <span className="font-english">Message</span>
                  <span className="font-arabic">الرسالة</span>
                </label>
                <Textarea
                  required
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Describe your legal technology needs | صف احتياجاتك في التحول الرقمي القانوني"
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
                    Sending...
                  </span>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    <span className="font-english">Send Message</span>
                    <span className="text-muted-foreground">|</span>
                    <span className="font-arabic">أرسل الرسالة</span>
                  </>
                )}
              </Button>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-background/60 px-6 py-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  <span className="font-english">Confidential & encrypted submissions</span>
                </div>
                <span className="font-arabic">سرية ومشفرة بالكامل</span>
              </div>
            </form>
          </div>

          <div className="space-y-6">
            {contactPoints.map((point) => {
              const Icon = point.icon;
              return (
                <div
                  key={point.enTitle}
                  className="rounded-3xl border border-border bg-background/70 p-6 shadow-ambient backdrop-blur"
                >
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-foreground">
                        <span className="font-english">{point.enTitle}</span>
                        <span className="mx-1 text-muted-foreground">|</span>
                        <span className="font-arabic">{point.arTitle}</span>
                      </div>
                      <p className="font-english text-sm text-muted-foreground">{point.enDetails}</p>
                      <p className="font-arabic text-sm text-muted-foreground">{point.arDetails}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="rounded-3xl border border-border bg-gradient-primary p-8 text-white shadow-premium">
              <h3 className="font-display text-2xl font-semibold">24/7 Digital Legal Desk</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                Dedicated transformation specialists monitor secure channels around the clock to support urgent cases,
                investigations, and executive briefings.
              </p>
              <p className="mt-2 text-sm text-white/80">
                فريق متخصص في التحول الرقمي القانوني يعمل على مدار الساعة لدعم القضايا العاجلة والتحقيقات والقيادات التنفيذية.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
