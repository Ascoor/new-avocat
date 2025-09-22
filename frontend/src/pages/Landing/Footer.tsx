import React from "react";
import BrandLogo from "@/components/common/BrandLogo";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Scale,
  MapPin,
  Mail,
  Phone,
  Globe,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  ArrowUp,
  Shield,
  FileText,
  Users,
  BookOpen,
} from "lucide-react";

type FooterProps = {
  services: string[];
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  logoVariant: "text" | "icon"; // 👈 نفس النوع اللي متوقعه BrandLogo
};

const Footer: React.FC<FooterProps> = ({ services, contact, logoVariant }) => {
  const { t, isRTL, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gradient-primary text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full mix-blend-overlay blur-3xl animate-float"></div>
        <div
          className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full mix-blend-overlay blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1 animate-fade-in">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                   <div className="text-2xl font-display font-bold">
             <BrandLogo
              variant="full"
              className="h-12"
              lang={language}
              dark={true} // Ensure dark before scroll
            />
 
                </div>
              </div>
 

              {/* Social Links */}
              <div className="flex space-x-4 rtl:space-x-reverse">
                {[
                  { icon: Linkedin, href: "#", color: "hover:bg-blue-600" },
                  { icon: Twitter, href: "#", color: "hover:bg-blue-400" },
                  { icon: Facebook, href: "#", color: "hover:bg-blue-700" },
                  { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                ].map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center ${social.color} transition-all duration-300 group`}
                    >
                      <IconComponent className="w-5 h-5 text-white group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Services */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <FileText className="w-5 h-5 text-accent" />
                <span>{t("ourServices")}</span>
              </h3>
              <ul className="space-y-3">
                {services.map((label, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection("#services")}
                      className="flex items-center space-x-2 rtl:space-x-reverse text-white/80 hover:text-accent transition-colors duration-300 group"
                    >
                      <Shield className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                      <span>{label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "400ms" }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Globe className="w-5 h-5 text-accent" />
                <span>Quick Links</span>
              </h3>
              <ul className="space-y-3">
                {[
                  { label: t("home"), href: "#home" },
                  { label: t("features"), href: "#features" },
                  { label: t("about"), href: "#about" },
                  { label: t("contact"), href: "#contact" },
                ].map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-white/80 hover:text-accent transition-colors duration-300 hover:translate-x-1 rtl:hover:-translate-x-1"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div
              className="animate-slide-up"
              style={{ animationDelay: "600ms" }}
            >
              <h3 className="text-xl font-display font-semibold text-white mb-6 flex items-center space-x-2 rtl:space-x-reverse">
                <Phone className="w-5 h-5 text-accent" />
                <span>{t("contactInfo")}</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 rtl:space-x-reverse">
                  <MapPin className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div className="text-white/80 leading-relaxed">
                    <div className="font-medium text-white mb-1">
                      {t("headquarters")}
                    </div>
                    <div>{contact.address}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                  <a
                    href={`mailto:${contact.email}`}
                    className="text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    {contact.email}
                  </a>
                </div>

                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <a
                    href={`tel:${contact.phone}`}
                    className="text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-white/20 animate-fade-in">
          <div className="text-center">
            <h3 className="text-2xl font-display font-semibold text-white mb-4">
              Stay Updated on Legal Technology Trends
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on legal
              digital transformation
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300"
              />
              <button className="btn-gold px-6 py-3 rounded-xl font-medium hover:scale-105 transition-all duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between animate-fade-in">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © 2024 Avocat. {t("allRightsReserved")}
          </div>

          <div className="flex items-center space-x-6 rtl:space-x-reverse text-sm text-white/60">
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-accent transition-colors duration-300">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-gold text-accent-foreground rounded-full flex items-center justify-center shadow-gold hover:shadow-xl hover:scale-110 transition-all duration-300 z-50 group animate-glow"
      >
        <ArrowUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      </button>
    </footer>
  );
};

export default Footer;
