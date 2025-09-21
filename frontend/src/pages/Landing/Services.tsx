
const services = [
  { title: "For Law Firms", desc: "Comprehensive law firm management solutions." },
  { title: "For Legal Departments", desc: "Streamlined operations for corporate legal teams." },
  { title: "For Lawyers", desc: "Tools for independent legal professionals." },
  { title: "Training & E-Gov", desc: "Capacity-building & government e-service support." },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-muted/30">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ title, desc }) => (
            <div key={title} className="p-6 bg-card border rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
