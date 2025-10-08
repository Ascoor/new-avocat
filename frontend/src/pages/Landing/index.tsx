import { useLanguage } from "@/contexts/LanguageContext";
import LandingNavbar from "./LandingNavbar";
import HeroCarousel from "./HeroCarousel";
import About from "./About";
import Services from "./Services";
import Capabilities from "./Capabilities";
import Features from "./Features";
import Achievements from "./Achievements";
import Team from "./Team";
import Testimonials from "./Testimonials";
import Insights from "./Insights";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const LandingPage: React.FC = () => { 
  const { direction } = useLanguage();
 
  return (
    <div className="flex min-h-screen flex-col" dir={direction}>
      <LandingNavbar />

      <main className="flex flex-1 flex-col ">
        <HeroCarousel />
        <About />
        <Services />
        <Capabilities /> 
        <Achievements />
        <Testimonials />
        <Team />
        <Insights />
        <CallToAction />
        <Contact />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;
