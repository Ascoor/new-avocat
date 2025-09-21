
const About: React.FC = () => {
  return (
    <section id="about" className="py-20 container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">About Avocat Law Firm</h2>
          <p className="text-muted-foreground mb-4">
            Avocat Law Firm is a leader in legal digital transformation, offering
            services that blend traditional legal excellence with modern
            technology. Our team empowers law firms, legal departments, and
            individual lawyers to succeed in the digital era.
          </p>
        </div>
        <div className="rounded-xl overflow-hidden shadow-lg">
          <img src="/images/law-team.jpg" alt="Law Team" className="w-full h-full object-cover" />
        </div>
      </div>
    </section>
  );
};

export default About;
