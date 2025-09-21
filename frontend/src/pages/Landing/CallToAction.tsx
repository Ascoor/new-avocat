import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
  return (
    <section className="py-20 bg-primary text-white text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Ready to Transform Your Legal Practice?
      </h2>
      <p className="mb-8 opacity-90">Try our demo or get in touch today.</p>
      <div className="flex justify-center gap-4">
        <Button size="lg" variant="secondary">Try Demo</Button>
        <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
          Contact Us
        </Button>
      </div>
    </section>
  );
};

export default CallToAction;
