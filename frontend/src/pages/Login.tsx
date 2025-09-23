// src/pages/auth/Login.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import LanguageToggle from '@/components/ui/language-toggle';
import { Eye, EyeOff, ArrowRight, AlertCircle, ShieldCheck, Fingerprint, Clock3, Lock, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import authBackground from '@/assets/auth-background.jpg';
import BrandLogo from '@/components/common/BrandLogo';
import { cn } from '@/lib/utils';

type FormErrors = Partial<{ email: string; password: string }>;
const emailRegex = /\S+@\S+\.\S+/;

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { isRTL, language, direction } = useLanguage();
  const { login, loading } = useAuth();
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
        description: t('auth.login.after_register'),
      });
    }
    if (searchParams.get('session') === 'expired') {
      toast({
        title: t('common.info'),
        description: t('auth.session_expired'),
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
await login(email, password);


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
        t('auth.login.error');
      toast({
        title: t('common.error'),
        description: message,
        variant: 'destructive',
      });
    }
  };

  const heroCopy = useMemo(() => {
    if (isRTL) {
      return {
        badge: 'ولوج رقمي مؤمن',
        headline: 'دخول آمن يواكب سرعتك القانونية',
        subheadline:
          'إدارة القضايا، مراقبة لوحات التحكم، والتعاون مع الشركاء بضغطة واحدة عبر منصة أفوكات السحابية.',
        highlights: [
          { icon: ShieldCheck, text: 'مصادقة متعددة العوامل مع مراقبة فورية للتهديدات' },
          { icon: Fingerprint, text: 'بصمة رقمية وتدقيق ذكي للهوية دون تعطيل التجربة' },
          { icon: Clock3, text: 'تشغيل فوري ودعم تنفيذي على مدار الساعة' },
        ],
        stats: [
          { value: '99.99%', label: 'جاهزية الخدمة' },
          { value: '≤ 2 دقيقة', label: 'متوسط تسجيل الدخول' },
        ],
      };
    }

    return {
      badge: 'Trusted Digital Access',
      headline: 'Secure entry for high-stakes legal operations',
      subheadline:
        'Command matters, monitor dashboards, and collaborate instantly inside Avocat’s encrypted workspace.',
      highlights: [
        { icon: ShieldCheck, text: 'Adaptive MFA with live threat monitoring' },
        { icon: Fingerprint, text: 'Biometric-ready identity checks without friction' },
        { icon: Clock3, text: 'Instant onboarding and 24/7 concierge support' },
      ],
      stats: [
        { value: '99.99%', label: 'Cloud uptime' },
        { value: '≤ 2 min', label: 'Average sign-in time' },
      ],
    };
  }, [isRTL]);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {/* ambient gradients */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute bottom-12 right-16 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute -bottom-28 left-16 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
      </div>

      {/* language toggle */}
      <div className={cn('fixed top-6 z-50', isRTL ? 'left-6' : 'right-6')}>
        <LanguageToggle />
      </div>

      <div
        className={cn(
          'relative z-10 flex min-h-screen flex-col lg:flex-row',
          isRTL ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        {/* Hero / Storytelling side */}
        <section className="relative hidden flex-1 overflow-hidden rounded-br-[48px] lg:flex">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-70"
              style={{ backgroundImage: `url(${authBackground})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/55 to-background/95" />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between px-8 py-14 lg:px-16" dir={direction}>
            <div className="flex items-center justify-between">
              <BrandLogo variant="text" className="h-12" lang={language} dark />
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[11px] uppercase tracking-[0.4rem] text-white/80">
                Avocat Cloud Access
              </span>
            </div>

            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
                <Sparkles className="h-4 w-4 text-accent" />
                <span>{heroCopy.badge}</span>
              </div>
              <h1 className="text-4xl font-display font-semibold text-white drop-shadow-xl lg:text-5xl xl:text-6xl">
                {heroCopy.headline}
              </h1>
              <p className="max-w-xl text-lg text-white/85 lg:text-xl">{heroCopy.subheadline}</p>

              <div className="grid gap-4 lg:grid-cols-2">
                {heroCopy.highlights.map(({ icon: HighlightIcon, text }) => (
                  <div
                    key={text}
                    className={cn(
                      'group flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/10',
                      isRTL ? 'flex-row-reverse text-right' : 'text-left'
                    )}
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white">
                      <HighlightIcon className="h-5 w-5" />
                    </span>
                    <p className="text-sm leading-relaxed text-white/85">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 text-white/90">
              {heroCopy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg"
                >
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-widest text-white/70">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Form side */}
        <section className="relative flex flex-1 items-center justify-center px-6 py-14 lg:px-12">
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95 lg:bg-transparent" />
          <div className="relative z-10 w-full max-w-lg space-y-10" dir={direction}>
            {/* mobile hero snippet */}
            <div className="space-y-5 text-center text-white lg:hidden">
              <BrandLogo variant="text" className="mx-auto h-12" lang={language} />
              <h1 className="text-3xl font-display font-semibold text-foreground">
                {heroCopy.headline}
              </h1>
              <p className="text-base text-white/80">{heroCopy.subheadline}</p>
            </div>

            <Card className="relative overflow-hidden border border-border/60 bg-card/90 shadow-2xl backdrop-blur">
              <div className="pointer-events-none absolute -top-32 right-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
              <CardHeader className="relative space-y-3 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Lock className="h-6 w-6" />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-semibold">
                    {t('auth.login.title')}
                  </CardTitle>
                  <CardDescription>{t('auth.login.subtitle')}</CardDescription>
                </div>
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
                      aria-label={showPassword ? t('auth.login.hide_password') : t('auth.login.show_password')}
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
                <Button type="submit" className="w-full glow-effect" disabled={!isValid || loading}>
                  {loading ? (
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
                    {t('auth.login.register_prompt')}{' '}
                    <Link to="/signup" className="font-medium text-primary hover:underline">
                      {t('auth.login.register_cta')}
                    </Link>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>
          {/* no demo alert */}
        </div>
        
    </section>
      </div>
    </div>
  );
};

export default Login;
