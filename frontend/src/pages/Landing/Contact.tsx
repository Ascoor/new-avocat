import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Send, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  CheckCircle,
  MessageSquare,
  User,
  AtSign
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent Successfully!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Headquarters',
      content: 'Dubai International Financial Centre\nDubai, UAE',
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+971 4 123 4567\n+966 11 987 6543',
      gradient: 'from-accent to-accent-glow'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@avocat.com\nsupport@avocat.com',
      gradient: 'from-primary-light to-primary-glow'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      content: 'Sunday - Thursday: 9:00 AM - 6:00 PM\nFriday - Saturday: Closed',
      gradient: 'from-accent-glow to-accent'
    }
  ];

  return (
    <section id="contact" className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent rounded-full mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('contactTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <div className="card-elevated p-8 lg:p-10">
              <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-light rounded-xl flex items-center justify-center animate-glow">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-display font-semibold text-foreground">
                  Send us a Message
                </h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-foreground">
                    <User className="w-4 h-4 text-primary" />
                    <span>{t('name')}</span>
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="h-12 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    placeholder="Your full name"
                    required
                  />
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-foreground">
                    <AtSign className="w-4 h-4 text-primary" />
                    <span>{t('email')}</span>
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="h-12 border-border focus:border-primary focus:ring-primary/20 transition-all duration-300"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 rtl:space-x-reverse text-sm font-medium text-foreground">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span>{t('message')}</span>
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="border-border focus:border-primary focus:ring-primary/20 transition-all duration-300 resize-none"
                    placeholder="Tell us about your legal technology needs..."
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-premium h-12 text-lg group"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <span>{t('submit')}</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Trust Indicators */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Secure & Confidential</span>
                  </div>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>24h Response</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="animate-slide-up card-premium p-6 hover:card-elevated transition-all duration-500 group hover:-translate-y-1"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className={`w-14 h-14 bg-gradient-to-br ${info.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-glow`}>
                      <IconComponent className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {info.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Call to Action */}
            <div className="card-elevated p-8 text-center bg-gradient-primary text-white animate-fade-in">
              <h4 className="text-2xl font-display font-bold mb-4">
                Ready to Get Started?
              </h4>
              <p className="text-white/90 mb-6 leading-relaxed">
                Schedule a free consultation with our legal technology experts
              </p>
              <Button className="btn-gold">
                Book Consultation
                <Phone className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;