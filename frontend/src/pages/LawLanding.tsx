import { Navbar } from '@/components/lawfirm/Navbar';
import { HeroSection } from '@/components/lawfirm/HeroSection';
import { ServicesSection } from '@/components/lawfirm/ServicesSection';
import { AboutSection } from '@/components/lawfirm/AboutSection';
import { ContactSection } from '@/components/lawfirm/ContactSection';
import { Footer } from '@/components/lawfirm/Footer';

export const LawLanding = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="pt-20 space-y-20">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default LawLanding;
