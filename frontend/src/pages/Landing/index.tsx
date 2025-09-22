import LandingNavbar from "./LandingNavbar";
import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import About from "./About";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Footer from "./Footer";
import { useLanguage } from "@/contexts/LanguageContext";

const footerServiceKeys = [
  "caseManagement",
  "legalConsulting",
  "digitalTraining",
  "egovSupport",
] as const;

const LandingPage: React.FC = () => {
  const { t } = useLanguage();

  const footerServices = footerServiceKeys.map((key) =>
    t(`landing.footer.services.${key}`)
  );

  const footerContact = {
    email: t("landing.footer.contact.email"),
    phone: t("landing.footer.contact.phone"),
    address: t("landing.footer.contact.address"),
  };

  return (
    <>
      <LandingNavbar />
      <main className="bg-background text-text-body">
        <Hero />
        <Features />
        <Services />
        <About />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer
        services={footerServices}
        contact={footerContact}
        logoVariant="text"
      />
    </>
  );
};

export default LandingPage;
