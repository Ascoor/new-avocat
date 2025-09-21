const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-20 container mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Contact Us</h2>
      <form className="max-w-xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full p-3 border rounded-lg bg-input"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full p-3 border rounded-lg bg-input"
        />
        <textarea
          placeholder="Your Message"
          className="w-full p-3 border rounded-lg bg-input h-32"
        />
        <button
          type="submit"
          className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
        >
          Send Message
        </button>
      </form>
    </section>
  );
};

export default Contact;
