import Hero from "./Hero";
import Features from "./Features";
import Services from "./Services";
import About from "./About";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Footer from "./Footer";
import LandingNavbar from "./LandingNavbar";

const LandingPage: React.FC = () => {
  return (
    <>
      <LandingNavbar />
      <main>
        <Hero />
        <Features />
        <Services />
        <About />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>
      <Footer
        services={["Case Management", "Legal Consulting", "Digital Training", "E-Gov Support"]}
        contact={{
          email: "info@avocat.com",
          phone: "+20 111 222 3333",
          address: "Cairo, Egypt",
        }}
        logoVariant="text"
      />
    </>
  );
};

export default LandingPage;
