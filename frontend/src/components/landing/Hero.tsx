import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="bg-blue-900 text-white text-center py-20 animate-fade-in">
      <h2 className="text-5xl font-extrabold mb-4">Your Trusted Law Firm</h2>
      <p className="text-xl mb-8">Providing expert legal advice and representation</p>
      <a href="#contact" className="bg-gold text-blue-900 px-6 py-3 rounded-full">Contact Us</a>
    </section>
  );
};

export default Hero;

