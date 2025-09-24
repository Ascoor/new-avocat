import { useLanguage } from "@/contexts/LanguageContext";
import LandingNavbar from "./LandingNavbar";
import HeroCarousel from "./HeroCarousel";
import About from "./About";
import Services from "./Services";
import Capabilities from "./Capabilities";
import Achievements from "./Achievements";
import Team from "./Team";
import Insights from "./Insights";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const LandingPage: React.FC = () => { 
  const { direction } = useLanguage();
 
  return (
    <>
      <LandingNavbar />
      <main dir={direction} className="bg-background text-text-body">
        <HeroCarousel />
        <About />
        <Services /> 
        <Achievements />
        <Team />
      
        <Contact />
      </main>
      <ScrollToTopButton />
      <Footer />
    </>
  );
};

export default LandingPage;
