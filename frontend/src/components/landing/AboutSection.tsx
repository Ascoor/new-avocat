import React from 'react';
import { Award, Users, Clock, Star } from 'lucide-react'; 
const AboutSection = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Clients Served" },
    { icon: Clock, number: "20+", label: "Years Experience" },
    { icon: Award, number: "95%", label: "Success Rate" },
    { icon: Star, number: "4.9", label: "Client Rating" }
  ];

  const achievements = [
    "Licensed to practice in multiple jurisdictions",
    "Member of American Bar Association",
    "Recognized by Legal 500 Directory",
    "Martindale-Hubbell AV Rated",
    "Super Lawyers Rising Stars"
  ];

  return (
    <section id="about" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
                  Excellence in 
                  <span className="text-accent"> Legal Practice</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  For over two decades, Avocat Law Firm has been at the forefront of legal excellence, 
                  providing trusted counsel and representation to clients across diverse legal matters.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our commitment to excellence, combined with deep legal expertise and personalized 
                  attention, has earned us recognition as one of the region's premier law firms. 
                  We pride ourselves on delivering results that exceed our clients' expectations.
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Professional Achievements
                </h3>
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span className="text-muted-foreground">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 animate-slide-up">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-card border rounded-xl p-6 text-center hover-lift shadow-soft"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="space-y-3">
                      <div className="p-3 gradient-gold rounded-lg mx-auto w-fit">
                        <stat.icon className="h-6 w-6 text-accent-foreground" />
                      </div>
                      <div>
                        <div className="text-3xl font-bold text-foreground">
                          {stat.number}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-card border rounded-xl p-6 shadow-soft">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">
                    Why Choose Avocat Law Firm?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Personalized attention to every case
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Proven track record of successful outcomes
                      </span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2"></div>
                      <span className="text-muted-foreground">
                        Transparent communication throughout the process
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;