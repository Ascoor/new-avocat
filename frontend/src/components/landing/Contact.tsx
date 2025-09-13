import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-16 text-center">
      <h2 className="text-4xl font-bold mb-8">Get in Touch</h2>
      <p className="text-xl mb-4">Have any questions? We'd love to hear from you.</p>
      <a href="mailto:contact@avocatlaw.com" className="bg-gold text-blue-900 px-6 py-3 rounded-full">Email Us</a>
    </section>
  );
};

export default Contact;

