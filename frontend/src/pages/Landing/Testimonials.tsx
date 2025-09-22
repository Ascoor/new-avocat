import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote, ChevronLeft, ChevronRight, Building, User } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  avatar: string;
  rating: number;
  quote: string;
  type: 'firm' | 'individual';
}

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t, isRTL } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Ahmed Al-Mansouri',
      position: 'Managing Partner',
      company: 'Al-Mansouri & Associates',
      avatar: '👨‍💼',
      rating: 5,
      quote: 'Avocat transformed our practice completely. The digital tools increased our efficiency by 300% and our client satisfaction rates are at an all-time high.',
      type: 'firm'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Legal Director',
      company: 'Global Corp',
      avatar: '👩‍💼',
      rating: 5,
      quote: 'The compliance tracking and contract management features have revolutionized how we handle our legal operations. Outstanding platform!',
      type: 'firm'
    },
    {
      id: 3,
      name: 'Dr. Khalid Rahman',
      position: 'Independent Lawyer',
      company: 'Solo Practice',
      avatar: '👨‍⚖️',
      rating: 5,
      quote: 'As a solo practitioner, Avocat gave me enterprise-level tools at an affordable price. My practice has grown 200% since I started using it.',
      type: 'individual'
    },
    {
      id: 4,
      name: 'Fatima Al-Zahra',
      position: 'Senior Partner',
      company: 'Legal Innovations LLC',
      avatar: '👩‍⚖️',
      rating: 5,
      quote: 'The training programs helped our entire team transition to digital workflows seamlessly. Exceptional support and cutting-edge technology.',
      type: 'firm'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-accent fill-current' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <section className="py-24 bg-gradient-to-br from-secondary/30 via-background to-secondary/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply blur-xl animate-float"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full mix-blend-multiply blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('testimonialsSubtitle')}
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="relative max-w-5xl mx-auto mb-16">
          <div className="overflow-hidden rounded-3xl">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="card-elevated p-8 lg:p-12 text-center mx-4 relative animate-scale-in">
                    {/* Quote Icon */}
                    <div className="absolute top-6 left-6 opacity-20">
                      <Quote className="w-12 h-12 text-primary" />
                    </div>

                    {/* Company Type Badge */}
                    <div className="absolute top-6 right-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        testimonial.type === 'firm' 
                          ? 'bg-gradient-to-br from-primary to-primary-light' 
                          : 'bg-gradient-to-br from-accent to-accent-glow'
                      }`}>
                        {testimonial.type === 'firm' ? (
                          <Building className="w-6 h-6 text-white" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Avatar */}
                    <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-secondary to-secondary-dark rounded-full flex items-center justify-center text-4xl shadow-elevated">
                      {testimonial.avatar}
                    </div>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1 mb-6">
                      {renderStars(testimonial.rating)}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-xl lg:text-2xl font-display text-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Author Info */}
                    <div className="space-y-2">
                      <h4 className="text-xl font-display font-semibold text-foreground">
                        {testimonial.name}
                      </h4>
                      <p className="text-muted-foreground">
                        {testimonial.position}
                      </p>
                      <p className="text-primary font-medium">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? 'right-2' : 'left-2'
            } w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg group`}
          >
            <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className={`absolute top-1/2 -translate-y-1/2 ${
              isRTL ? 'left-2' : 'right-2'
            } w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg group`}
          >
            <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-3 mb-16">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-primary w-8'
                  : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '500+', label: 'Happy Clients', icon: '😊' },
            { number: '98%', label: 'Satisfaction Rate', icon: '⭐' },
            { number: '24/7', label: 'Support Available', icon: '🚀' }
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center card-premium p-8 hover:card-elevated transition-all duration-500 group hover:-translate-y-1 animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;