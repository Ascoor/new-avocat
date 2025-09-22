import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, MapPin, Phone, Scale, Shield, Twitter } from "lucide-react";

const quickLinks = [
  { href: "#home", en: "Home", ar: "الرئيسية" },
  { href: "#about", en: "About", ar: "من نحن" },
  { href: "#services", en: "Services", ar: "الخدمات" },
  { href: "#capabilities", en: "Capabilities", ar: "الإمكانيات" },
  { href: "#achievements", en: "Achievements", ar: "الإنجازات" },
  { href: "#team", en: "Team", ar: "الفريق" },
  { href: "#insights", en: "Insights", ar: "المدونة" },
  { href: "#contact", en: "Contact", ar: "اتصل بنا" },
];

const serviceHighlights = [
  { en: "Litigation & Arbitration", ar: "التقاضي والتحكيم" },
  { en: "Digital Case Management", ar: "إدارة القضايا الرقمية" },
  { en: "AI Legal Research", ar: "البحث القانوني بالذكاء الاصطناعي" },
  { en: "Cybersecurity Advisory", ar: "استشارات الأمن السيبراني" },
];

const Footer: React.FC = () => {
  const { language } = useLanguage();

  const scrollTo = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative mt-24 bg-gradient-to-b from-primary/90 via-primary/80 to-primary/95 text-white">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-10 top-16 h-48 w-48 rounded-full bg-accent/70 blur-3xl" />
        <div className="absolute right-0 bottom-10 h-56 w-56 rounded-full bg-white/50 blur-3xl" />
      </div>
      <div className="relative">
        <div className="container mx-auto grid gap-12 px-4 py-16 lg:grid-cols-4 lg:px-8">
          <div className="space-y-6">
            <BrandLogo variant="full" className="h-12" lang={language} dark />
            <p className="font-english text-sm leading-relaxed text-white/80">
              Pioneering legal digital transformation across the Middle East and North Africa with prestige, innovation, and unwavering trust.
            </p>
            <p className="font-arabic text-sm leading-relaxed text-white/80">
              رواد التحول الرقمي القانوني في الشرق الأوسط وشمال أفريقيا بفخامة وابتكار وثقة راسخة.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                <Scale className="h-6 w-6" />
              </div>
              <div className="text-xs uppercase tracking-widest text-white/70">
                <span className="font-english">Legal Digital Transformation</span>
                <span className="mx-1 text-white/50">|</span>
                <span className="font-arabic">التحول الرقمي القانوني</span>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/20">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" className="h-10 w-10 rounded-full border border-white/30 text-white hover:bg-white/20">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white">Quick Links | الروابط السريعة</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="flex w-full items-center justify-between rounded-xl border border-white/0 px-3 py-2 text-left transition-all duration-300 hover:border-white/40 hover:bg-white/10"
                  >
                    <span className="font-english">{link.en}</span>
                    <span className="font-arabic">{link.ar}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-lg font-semibold text-white">Signature Services | خدماتنا المميزة</h3>
            <ul className="mt-6 space-y-3 text-sm text-white/80">
              {serviceHighlights.map((service) => (
                <li key={service.en} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <span className="font-english">{service.en}</span>
                  <span className="mx-1 text-white/50">|</span>
                  <span className="font-arabic">{service.ar}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-3xl border border-white/20 bg-white/10 p-5">
              <h4 className="font-display text-base font-semibold text-white">Subscribe for Insights</h4>
              <p className="mt-2 text-xs text-white/80">
                Receive monthly briefings on AI in law, cybersecurity directives, and smart justice reforms.
              </p>
              <p className="text-xs text-white/80">
                احصل على موجز شهري حول الذكاء الاصطناعي في القانون وتوجيهات الأمن السيبراني وإصلاحات العدالة الذكية.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-display text-lg font-semibold text-white">Contact | تواصل</h3>
            <div className="space-y-4 text-sm text-white/80">
              <div className="flex items-start gap-3">
                <MapPin className="mt-1 h-5 w-5" />
                <div>
                  <p className="font-english">Downtown Cairo Smart District, Nile Corniche</p>
                  <p className="font-arabic">منطقة القاهرة الذكية – كورنيش النيل</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="mt-1 h-5 w-5" />
                <div>
                  <p className="font-english">+20 2 1234 5678 | +971 4 567 8900</p>
                  <p className="font-arabic">+٢٠ ٢ ١٢٣٤ ٥٦٧٨ | +٩٧١ ٤ ٥٦٧ ٨٩٠٠</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="mt-1 h-5 w-5" />
                <div>
                  <p className="font-english">contact@avocatlaw.com</p>
                  <p className="font-arabic">contact@avocatlaw.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="mt-1 h-5 w-5" />
                <div>
                  <p className="font-english">GDPR, DIFC, and NCA compliant digital infrastructure.</p>
                  <p className="font-arabic">بنية رقمية متوافقة مع لوائح GDPR وDIFC والهيئة الوطنية للأمن السيبراني.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 bg-primary/95">
          <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-white/80 lg:flex-row lg:px-8">
            <p className="font-english">© {new Date().getFullYear()} Avocat Law Firm. All rights reserved.</p>
            <p className="font-arabic">© {new Date().getFullYear()} مكتب أفوكات للمحاماة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
