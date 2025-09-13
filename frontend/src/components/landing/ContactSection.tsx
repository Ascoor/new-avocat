import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
const ContactSection = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate form submission
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Number",
      details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
      action: "tel:+15551234567"
    },
    {
      icon: Mail,
      title: "Email Address",
      details: ["contact@avocatlaw.com", "info@avocatlaw.com"],
      action: "mailto:contact@avocatlaw.com"
    },
    {
      icon: MapPin,
      title: "Office Location",
      details: ["123 Legal Street", "New York, NY 10001"],
      action: null
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Fri: 9:00 AM - 6:00 PM", "Sat: 10:00 AM - 2:00 PM"],
      action: null
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              Get In Touch
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Ready to discuss your legal needs? Contact us today for a free consultation 
              and let us help you navigate your legal challenges.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8 animate-slide-up">
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-xl p-6 hover-lift shadow-soft"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-3 gradient-gold rounded-lg">
                        <info.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-semibold text-foreground">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground">
                            {info.action ? (
                              <a 
                                href={info.action}
                                className="hover:text-accent transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border rounded-xl p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Emergency Contact
                </h3>
                <p className="text-muted-foreground mb-4">
                  For urgent legal matters outside business hours, please call our emergency line:
                </p>
                <a 
                  href="tel:+15551234999" 
                  className="text-accent hover:text-accent/80 font-semibold transition-colors"
                >
                  +1 (555) 123-4999
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="animate-slide-up">
              <form onSubmit={handleSubmit} className="bg-card border rounded-xl p-6 shadow-soft space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Send us a Message
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                        Legal Matter
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
                      >
                        <option value="">Select a practice area</option>
                        <option value="civil-litigation">Civil Litigation</option>
                        <option value="business-law">Business Law</option>
                        <option value="real-estate">Real Estate Law</option>
                        <option value="family-law">Family Law</option>
                        <option value="estate-planning">Estate Planning</option>
                        <option value="criminal-defense">Criminal Defense</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all resize-none"
                      placeholder="Please describe your legal matter and how we can help you..."
                      required
                    ></textarea>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-gold flex items-center justify-center space-x-2"
                >
                  <Send className="h-5 w-5" />
                  <span>Send Message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;