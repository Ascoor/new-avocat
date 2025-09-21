import { Button } from "@/components/ui/button";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative flex flex-col items-center justify-center text-center py-24 bg-gradient-to-r from-primary/90 to-accent/80 text-white"
    >
      <h1 className="text-4xl md:text-6xl font-bold mb-6">
        Bridging Law & Digital Transformation
      </h1>
      <p className="max-w-2xl mx-auto mb-8 text-lg opacity-90">
        Avocat Law Firm empowers legal professionals with digital tools, secure
        data systems, and modern training for a new era of legal practice.
      </p>
      <div className="flex gap-4 justify-center">
        <Button size="lg">Try Demo</Button>
        <Button size="lg" variant="outline" className="text-white border-white">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default Hero;
