import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';
import { useAuth } from '@/features/auth/hooks';
import { useToast } from '@/hooks/use-toast';
import {
  Card, CardContent, CardHeader, CardTitle, CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import authBackground from '@/assets/auth-background.jpg';

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ✅ Demo login
    if (formData.email === 'demo@avocat.law' && formData.password === 'demo123') {
      const demoUser = {
        id: 'demo',
        email: 'demo@avocat.law',
        firstName: 'Demo',
        lastName: 'User',
        role: 'admin' as const,
        createdAt: new Date().toISOString(),
      };
      localStorage.setItem('demoAuth', JSON.stringify(demoUser));

      toast({
        title: t('common.success'),
        description: 'Demo login successful!',
      });

      const nextUrl = searchParams.get('next') || '/dashboard';
      navigate(nextUrl);
      return;
    }

    // ✅ Real login
    try {
      const success = await login({ email: formData.email, password: formData.password });
      if (success) {
        toast({
          title: t('common.success'),
          description: 'Successfully logged in!',
        });
        const nextUrl = searchParams.get('next') || '/dashboard';
        navigate(nextUrl);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
      toast({
        title: t('common.error'),
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Background */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${authBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-80"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center p-12 text-white">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">{t('brand.name')}</h1>
            <p className="text-xl opacity-90">{t('brand.slogan')}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold gradient-text">
              {t('brand.name')}
            </Link>
            <LanguageToggle />
          </div>

          <Card className="glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="heading-md">{t('auth.login.title')}</CardTitle>
              <CardDescription>{t('auth.login.subtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <p className="text-sm text-destructive mb-2 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </p>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div>
                  <Label htmlFor="email">{t('auth.login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                {/* Password */}
                <div>
                  <Label htmlFor="password">{t('auth.login.password')}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Checkbox
                    id="remember"
                    checked={formData.remember}
                    onCheckedChange={(c) =>
                      setFormData({ ...formData, remember: c as boolean })
                    }
                  />
                  <Label htmlFor="remember">{t('auth.login.remember')}</Label>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full glow-effect" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      {t('common.loading')}
                    </div>
                  ) : (
                    <>
                      {t('auth.login.submit')}
                      <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Demo Info */}
          <Alert>
            <AlertCircle className="h-4 w-4 text-accent" />
            <AlertDescription>
              <strong>Demo:</strong> Use <code>demo@avocat.law / demo123</code> for demo login.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
