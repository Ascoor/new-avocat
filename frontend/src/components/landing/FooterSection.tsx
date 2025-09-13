import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Consultation', href: '#contact' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Attorney Advertising', href: '#' },
    { label: 'Disclaimer', href: '#' }
  ];

  const practiceAreas = [
    { label: 'Civil Litigation', href: '#services' },
    { label: 'Business Law', href: '#services' },
    { label: 'Real Estate Law', href: '#services' },
    { label: 'Family Law', href: '#services' },
    { label: 'Estate Planning', href: '#services' },
    { label: 'Criminal Defense', href: '#services' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <Scale className="h-8 w-8 text-accent" />
                <div>
                  <h3 className="text-xl font-bold text-foreground">Avocat</h3>
                  <p className="text-sm text-muted-foreground">Law Firm</p>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed">
                Providing exceptional legal services and trusted counsel for over 20 years. 
                Your success is our commitment.
              </p>

              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>contact@avocatlaw.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>123 Legal Street, New York, NY 10001</span>
                </div>
              </div>

              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-background hover:bg-accent/10 text-muted-foreground hover:text-accent transition-colors duration-300"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Practice Areas */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">Practice Areas</h4>
              <ul className="space-y-3">
                {practiceAreas.map((area, index) => (
                  <li key={index}>
                    <button
                      onClick={() => scrollToSection(area.href)}
                      className="text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {area.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-foreground">Legal Information</h4>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  <strong>Attorney Advertising.</strong> Prior results do not guarantee a similar outcome. 
                  This website is for informational purposes only and does not constitute legal advice.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-muted-foreground text-sm">
                © {currentYear} Avocat Law Firm. All rights reserved.
              </p>
              <p className="text-muted-foreground text-sm">
                Licensed to practice law in New York, New Jersey, and Connecticut.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;