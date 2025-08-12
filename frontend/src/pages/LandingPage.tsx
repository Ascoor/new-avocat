import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../features/auth/hooks';
import { useLanguage } from '../hooks/useLanguage';
import LanguageSwitcher from '../components/LanguageSwitcher';
import { ThemeToggle } from '../components/common/ThemeToggle';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Scale, 
  Users, 
  FileText, 
  BarChart3, 
  Clock,
  ArrowRight,
  Shield,
  Gavel,
  BookOpen,
  Star,
  CheckCircle,
  TrendingUp,
  Building,
  Award,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const LandingPage = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Users,
      title: 'Client Management',
      description: 'Comprehensive client profiles, communication history, and case associations.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gavel,
      title: 'Case Management',
      description: 'Track cases from initiation to resolution with intelligent workflow automation.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Clock,
      title: 'Session Scheduling',
      description: 'Advanced calendar integration with automated reminders and conflict detection.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reports',
      description: 'Data-driven insights with customizable reports and performance metrics.',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      icon: Shield,
      title: 'Security & Compliance',
      description: 'Bank-level security with full compliance to legal industry standards.',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: Zap,
      title: 'AI-Powered Insights',
      description: 'Machine learning algorithms to optimize your legal practice efficiency.',
      gradient: 'from-yellow-500 to-orange-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Legal Professionals', icon: Users },
    { number: '500K+', label: 'Cases Managed', icon: FileText },
    { number: '99.9%', label: 'Uptime Guarantee', icon: TrendingUp },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Senior Partner, Johnson & Associates',
      content: 'Avocat has transformed our practice efficiency by 300%. The AI insights are game-changing.',
      rating: 5
    },
    {
      name: 'Ahmed Al-Rashid',
      role: 'Legal Director, Al-Rashid Law Firm',
      content: 'The Arabic support and RTL interface make this perfect for our Middle Eastern practice.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Solo Practitioner',
      content: 'From case tracking to client communication, everything I need in one beautiful platform.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/90 backdrop-blur-md border-b border-border shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Scale className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Avocat</h1>
              <p className="text-xs text-muted-foreground">Legal Intelligence</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Button variant="ghost" onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('landing.nav.features')}
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('testimonials')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('landing.nav.testimonials')}
            </Button>
            <Button variant="ghost" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              {t('landing.nav.contact')}
            </Button>
          </nav>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
            {isAuthenticated ? (
              <Button
                onClick={() => navigate('/dashboard')}
                className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {t('landing.buttons.dashboard')}
                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
              </Button>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')}>
                  {t('landing.buttons.sign_in')}
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  {t('landing.buttons.get_started')}
                </Button>
              </>
            )}
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-background to-purple-50/50 dark:from-blue-950/20 dark:via-background dark:to-purple-950/20" />
        <div className="container mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Star className="h-4 w-4 mr-2" />
              Trusted by 10,000+ Legal Professionals
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Transform Your Legal Practice with Smart Technology
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Comprehensive legal management platform that combines client management, case tracking, 
              session scheduling, and AI-powered analytics in one intelligent system.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {isAuthenticated ? (
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 text-lg bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Go to Dashboard
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 text-lg bg-primary text-primary-foreground shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    Start Free Trial
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="text-sm">Bank-Level Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                <span className="text-sm">ISO Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span className="text-sm">Multi-Language Support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Everything You Need for Modern Legal Practice
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Streamline your workflow with our comprehensive suite of legal management tools
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Trusted by Legal Professionals Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our users say about transforming their practice
            </p>
          </motion.div>

          <motion.div 
            variants={staggerChildren}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-foreground">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-primary via-purple-600 to-pink-600 text-primary-foreground">
        <div className="container mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Join thousands of legal professionals who trust Avocat to manage their practice efficiently
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button 
                  size="lg"
                  onClick={() => navigate('/dashboard')}
                  className="px-8 py-4 text-lg bg-background text-foreground hover:bg-background/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                >
                  Go to Dashboard
                  <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                </Button>
              ) : (
                <>
                  <Button 
                    size="lg"
                    onClick={() => navigate('/register')}
                    className="px-8 py-4 text-lg bg-background text-foreground hover:bg-background/90 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200"
                  >
                    Start Your Free Trial
                    <ArrowRight className={`h-5 w-5 ${isRTL ? 'rotate-180 mr-2' : 'ml-2'}`} />
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    onClick={() => navigate('/login')}
                    className="px-8 py-4 text-lg border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    Sign In
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-12 px-4 bg-background border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Scale className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">Avocat</span>
              </div>
              <p className="text-muted-foreground">
                Transform your legal practice with intelligent management tools.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="#features" className="hover:text-primary transition-colors">{t('landing.nav.features')}</Link></li>
                <li><Link to="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link to="/security" className="hover:text-primary transition-colors">Security</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Avocat Legal Systems. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;