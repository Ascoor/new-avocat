// src/pages/auth/LoginPage.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/auth/hooks';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { LanguageToggle } from '@/components/ui/language-toggle';
import { Eye, EyeOff, ArrowRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import authBackground from '@/assets/auth-background.jpg';
import BrandLogo from '@/components/common/BrandLogo';
import { cn } from '@/lib/utils';

type FormErrors = Partial<{ email: string; password: string }>;
const emailRegex = /\S+@\S+\.\S+/;

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    email:
      (typeof window !== 'undefined' ? localStorage.getItem('rememberEmail') || '' : '') || '',
    password: '',
    remember: !!(typeof window !== 'undefined' && localStorage.getItem('rememberEmail')),
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // helpers
  const setField = <K extends keyof typeof formData>(key: K, value: (typeof formData)[K]) =>
    setFormData((s) => ({ ...s, [key]: value }));

  const validate = (data = formData): FormErrors => {
    const e: FormErrors = {};
    const email = data.email.trim();
    if (!email) e.email = t('auth.validation.required');
    else if (!emailRegex.test(email)) e.email = t('auth.validation.email_invalid');
    if (!data.password) e.password = t('auth.validation.required');
    return e;
  };

  // inline validation while typing
  useEffect(() => {
    setErrors(validate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.email, formData.password]);

  const isValid = useMemo(
    () => Object.keys(errors).length === 0 && formData.email !== '' && formData.password !== '',
    [errors, formData.email, formData.password]
  );

  // contextual toasts
  useEffect(() => {
    if (searchParams.get('registered') === '1') {
      toast({
        title: t('common.success'),
        description: t('auth.login.after_register') || 'Account created. Please log in.',
      });
    }
    if (searchParams.get('session') === 'expired') {
      toast({
        title: t('common.info'),
        description: t('auth.session_expired') || 'Your session has expired. Please sign in again.',
      });
    }
  }, [searchParams, toast, t]);

  const firstInvalidRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length) {
      if (errs.email) firstInvalidRef.current?.focus();
      else document.getElementById('password')?.focus();
      return;
    }

    try {
      const email = formData.email.trim();
      const password = formData.password;

      if (formData.remember) localStorage.setItem('rememberEmail', email);
      else localStorage.removeItem('rememberEmail');

      await login({ email, password });

      toast({
        title: t('common.success'),
        description: t('auth.login.success'),
      });

      const nextUrl = searchParams.get('next') || '/dashboard';
      navigate(nextUrl, { replace: true });
    } catch (err: unknown) {
      const message =
        (err as { message?: string })?.message ||
        t('auth.errors.invalid_credentials') ||
        t('auth.login.error') ||
        'Something went wrong.';
      toast({
        title: t('common.error'),
        description: message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className={cn('min-h-screen flex', isRTL ? 'flex-row-reverse' : '')} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Background Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${authBackground})` }}
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-80"></div>
        </div>
        
        <div className="relative z-10 flex items-center justify-center p-6">
          <div className="text-white text-center max-w-md">
<BrandLogo variant='full'/>
      
          </div>
        </div>
      </div>


      {/* Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link to="/" className="text-2xl font-bold gradient-text">
              {t('brand.name')}
            </Link>
            <LanguageToggle />
          </div>

          {/* Login Card */}
          <Card className="glass-card animate-fade-in">
            <CardHeader className="text-center">
              <CardTitle className="heading-md">{t('auth.login.title')}</CardTitle>
              <CardDescription>{t('auth.login.subtitle')}</CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">{t('auth.login.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    ref={firstInvalidRef}
                    onChange={(e) => setField('email', e.target.value)}
                    className={errors.email ? 'border-destructive' : ''}
                    placeholder={t('auth.login.email_placeholder')}
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      role="alert"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">{t('auth.login.password')}</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setField('password', e.target.value)}
                      className={errors.password ? 'border-destructive pr-10' : 'pr-10'}
                      placeholder={t('auth.login.password_placeholder')}
                      autoComplete="current-password"
                      aria-invalid={!!errors.password}
                      aria-describedby={errors.password ? 'password-error' : undefined}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-pressed={showPassword}
                      aria-label={
                        showPassword
                          ? t('auth.login.hide_password') || 'Hide password'
                          : t('auth.login.show_password') || 'Show password'
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p
                      id="password-error"
                      role="alert"
                      className="text-sm text-destructive flex items-center gap-1"
                    >
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 rtl:space-x-reverse">
                    <Checkbox
                      id="remember"
                      checked={formData.remember}
                      onCheckedChange={(checked) => setField('remember', Boolean(checked))}
                    />
                    <Label htmlFor="remember" className="text-sm">
                      {t('auth.login.remember')}
                    </Label>
                  </div>
                  <Button asChild variant="link" className="px-0 text-sm">
                    <Link to="/forgot-password">{t('auth.login.forgot')}</Link>
                  </Button>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full glow-effect" disabled={!isValid || isLoading}>
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                      {t('common.loading')}
                    </span>
                  ) : (
                    <>
                      {t('auth.login.submit')}
                      <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </Button>

                {/* Register CTA */}
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {(t('auth.login.register_prompt') ||
                      t('auth.login.register_link')?.split('?')[0] ||
                      '')?.toString()}{' '}
                    <Link to="/register" className="text-primary hover:underline font-medium">
                      {(t('auth.login.register_cta') ||
                        t('auth.login.register_link')?.split('? ')[1] ||
                        t('auth.register.title') ||
                        'Create account')?.toString()}
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* no demo alert */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
