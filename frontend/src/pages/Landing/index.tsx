import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import LandingNavbar from "./LandingNavbar";
import HeroCarousel from "./HeroCarousel";
import About from "./About";
import Services from "./Services";
import Capabilities from "./Capabilities";
import Features from "./Features";
import Achievements from "./Achievements";
import Team from "./Team";
import Testimonials from "./Testimonials";
import CallToAction from "./CallToAction";
import Contact from "./Contact";
import Footer from "./Footer";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

const SectionDivider = () => (
  <div className="mx-auto h-px w-full max-w-5xl bg-[linear-gradient(90deg,hsl(var(--background))_0%,hsl(var(--gold))_45%,hsl(var(--neon))_55%,hsl(var(--background))_100%)] opacity-60" />
);

const LandingPage: React.FC = () => {
  const { direction } = useLanguage();
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[hsl(var(--background))]" dir={direction}>
      <LandingNavbar />

      <main className="flex flex-1 flex-col gap-16 px-4 pt-24 sm:px-6 lg:px-10 xl:px-16">
        <HeroCarousel />
        <Capabilities />
        <SectionDivider />
        <Services />
        <Features />
        <About />
        <SectionDivider />
        <Achievements />
        <Team />
        <Testimonials />
        <CallToAction />
        <Contact />
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default LandingPage;
