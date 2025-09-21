const testimonials = [
  { name: "Legal Partner", quote: "Avocat transformed how we manage cases and clients." },
  { name: "Corporate Client", quote: "Professional, secure, and truly innovative services." },
];

const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map(({ name, quote }) => (
            <div key={name} className="p-6 bg-card border rounded-xl shadow">
              <p className="italic mb-4">“{quote}”</p>
              <span className="font-semibold">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
