import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Building, Briefcase, User, BookOpen, ArrowRight, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Services: React.FC = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Building,
      titleKey: 'lawFirms',
      descKey: 'lawFirmsDesc',
      features: ['Case Management', 'Client Portal', 'Document Automation', 'Billing & Time Tracking'],
      gradient: 'from-primary via-primary-light to-primary-glow',
      popular: true
    },
    {
      icon: Briefcase,
      titleKey: 'corporateLegal',
      descKey: 'corporateLegalDesc',
      features: ['Contract Management', 'Compliance Tracking', 'Legal Analytics', 'Risk Assessment'],
      gradient: 'from-accent via-accent-glow to-accent-soft',
      popular: false
    },
    {
      icon: User,
      titleKey: 'independentLawyers',
      descKey: 'independentLawyersDesc',
      features: ['Solo Practice Tools', 'Client Acquisition', 'Mobile Access', 'Cloud Storage'],
      gradient: 'from-primary-light via-primary to-primary-glow',
      popular: false
    },
    {
      icon: BookOpen,
      titleKey: 'training',
      descKey: 'trainingDesc',
      features: ['Legal Tech Training', 'Certification Programs', 'E-Government Integration', 'Continuous Learning'],
      gradient: 'from-accent-glow via-accent to-accent-soft',
      popular: false
    }
  ];

  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary))_0%,transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('servicesTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('servicesSubtitle')}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.titleKey}
                className={`group relative animate-slide-up card-premium hover:card-elevated transition-all duration-500 p-8 hover:-translate-y-1 ${
                  service.popular ? 'ring-2 ring-accent/50 shadow-gold' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 right-6 bg-gradient-gold text-accent-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-current" />
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start space-x-4 rtl:space-x-reverse mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${service.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 animate-glow`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-display font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                        {t(service.titleKey)}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {t(service.descKey)}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex-1 mb-6">
                    <ul className="space-y-3">
                      {service.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex}
                          className="flex items-center space-x-3 rtl:space-x-reverse text-muted-foreground"
                        >
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button 
                    className={`w-full group-hover:btn-premium transition-all duration-300 ${
                      service.popular ? 'btn-gold' : 'btn-premium'
                    }`}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-2 rtl:mr-2 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section - Why Choose Us */}
        <div className="bg-gradient-secondary rounded-3xl p-8 lg:p-12 text-center animate-fade-in shadow-elevated">
          <h3 className="text-3xl font-display font-bold text-foreground mb-6">
            Why Choose Avocat?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {[
              { label: 'Trust & Confidentiality', value: '100%', icon: '🔒' },
              { label: 'Client Satisfaction', value: '98%', icon: '⭐' },
              { label: 'Innovation Leader', value: '#1', icon: '🚀' },
              { label: 'Global Standards', value: 'ISO', icon: '🌍' },
            ].map((stat, index) => (
              <div key={index} className="animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>

          <Button size="lg" className="btn-gold px-8 py-4 text-lg">
            Start Your Digital Transformation
            <ArrowRight className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Services;