import React from 'react';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-16 bg-white text-center">
      <h2 className="text-4xl font-bold mb-8">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="p-6 border rounded shadow">
          <h3 className="text-2xl mb-2">Consulting</h3>
          <p>Get the best legal consulting in a variety of fields including business and family law.</p>
        </div>
        <div className="p-6 border rounded shadow">
          <h3 className="text-2xl mb-2">Litigation</h3>
          <p>Representing clients in court for criminal, civil, and business disputes.</p>
        </div>
        <div className="p-6 border rounded shadow">
          <h3 className="text-2xl mb-2">Contract Drafting</h3>
          <p>We create legally binding documents for your business or personal needs.</p>
        </div>
      </div>
    </section>
  );
};

export default Services;

