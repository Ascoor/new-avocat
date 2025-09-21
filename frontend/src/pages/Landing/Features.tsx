import { Shield, Users, Database, Laptop } from "lucide-react";

const features = [
  { icon: Shield, title: "Data Protection", desc: "Enterprise-grade legal data security." },
  { icon: Users, title: "Client Management", desc: "Organize clients with or without power of attorney." },
  { icon: Database, title: "Case Tracking", desc: "Track cases, sessions, and legal procedures." },
  { icon: Laptop, title: "Digital Training", desc: "Prepare legal teams for digital transformation." },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Core Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 bg-card border rounded-xl shadow hover:shadow-lg transition">
            <Icon className="h-10 w-10 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
