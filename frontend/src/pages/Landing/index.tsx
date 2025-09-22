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

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingNavbar />
      <main className="bg-background text-text-body">
        <HeroCarousel />
        <About />
        <Services />
        <Capabilities />
        <Achievements />
        <Team />
        <Insights />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default LandingPage;
