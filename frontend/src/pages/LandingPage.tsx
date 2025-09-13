import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import Services from '@/components/landing/Services';
import About from '@/components/landing/About';
import Contact from '@/components/landing/Contact';

const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Services />
      <About />
      <Contact />
    </div>
  );
};

export default LandingPage;

