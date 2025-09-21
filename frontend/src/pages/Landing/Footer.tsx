import React from "react";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, Mail } from "lucide-react";

interface FooterProps {
  services: string[];
  contact: { email: string; phone: string; address: string };
  logoVariant?: "text" | "full" | "icon";
  year?: number;
}

const Footer: React.FC<FooterProps> = ({
  services,
  contact,
  logoVariant = "text",
  year = new Date().getFullYear(),
}) => {
  const { t, language } = useLanguage();

  return (
    <footer className="border-t border-border bg-layer-base">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo className="h-12" lang={language} />
          </div>
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-text-strong">
              <Sparkles className="h-5 w-5 text-primary" />
              {t("landing.footer.servicesTitle")}
            </h4>
            <ul className="space-y-2 text-text-muted">
              {services.map((s, i) => (
                <li key={`${s}-${i}`}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 flex items-center gap-2 font-semibold text-text-strong">
              <Mail className="h-5 w-5 text-primary" />
              {t("landing.footer.contactTitle")}
            </h4>
            <ul className="space-y-2 text-text-muted">
              <li>{contact.email}</li>
              <li>{contact.phone}</li>
              <li>{contact.address}</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-center text-text-subtle">
          <p>
            &copy; {year} {t("brand.name")}. {t("landing.footer.rights")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
