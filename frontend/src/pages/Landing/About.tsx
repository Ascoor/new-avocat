import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Target, Eye, Award, Globe, Users, TrendingUp } from 'lucide-react';

const About: React.FC = () => {
  const { t, isRTL } = useLanguage();

  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Bridging legal excellence with digital innovation',
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'Leadership in legal digital transformation in MENA',
      gradient: 'from-accent to-accent-glow'
    },
    {
      icon: Award,
      title: 'Our Values',
      description: 'Trust, confidentiality, innovation, global standards',
      gradient: 'from-primary-light to-primary-glow'
    }
  ];

  const stats = [
    { icon: Users, value: '500+', label: 'Legal Professionals', color: 'text-primary' },
    { icon: Globe, value: '15+', label: 'Countries Served', color: 'text-accent' },
    { icon: TrendingUp, value: '98%', label: 'Client Satisfaction', color: 'text-primary-light' },
    { icon: Award, value: '10+', label: 'Industry Awards', color: 'text-accent-glow' }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-primary rounded-full mix-blend-multiply blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Content */}
          <div className="animate-slide-up">
            <h3 className="text-3xl font-display font-semibold text-foreground mb-6 leading-tight">
              Transforming Legal Services in the Digital Age
            </h3>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {t('aboutDescription')}
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Innovative Legal Technology Solutions</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">Comprehensive Digital Transformation</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <div className="w-2 h-2 bg-accent-glow rounded-full animate-pulse"></div>
                <span className="text-foreground font-medium">MENA Region Legal Expertise</span>
              </div>
            </div>
          </div>

          {/* Values Cards */}
          <div className="space-y-6">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="animate-slide-up card-premium p-6 hover:card-elevated transition-all duration-500 group hover:-translate-y-1"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="flex items-start space-x-4 rtl:space-x-reverse">
                    <div className={`w-12 h-12 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 animate-glow`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-display font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                        {value.title}
                      </h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistics Section */}
        <div className="bg-gradient-primary rounded-3xl p-8 lg:p-12 text-center shadow-premium animate-fade-in">
          <h3 className="text-3xl font-display font-bold text-white mb-12">
            Our Impact in Numbers
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="animate-scale-in group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">
                    {stat.value}
                  </div>
                  
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leadership Message */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-2xl lg:text-3xl font-display italic text-foreground leading-relaxed mb-8">
              "We believe that the future of legal services lies in the seamless integration of traditional legal expertise with cutting-edge technology."
            </blockquote>
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
              <div className="w-1 h-16 bg-gradient-gold rounded-full"></div>
              <div className={`${isRTL? 'text-right' : 'text-left'}`}>
                <div className="font-display font-semibold text-foreground text-lg">Avocat Leadership Team</div>
                <div className="text-muted-foreground">Legal Technology Pioneers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;