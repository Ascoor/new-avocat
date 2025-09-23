import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeftRight,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  User,
  UserPlus,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';
import BrandLogo from '@/components/common/BrandLogo';
import LanguageToggle from '@/components/ui/language-toggle';
import { cn } from '@/lib/utils';
import authBackground from '@/assets/auth-background.jpg';

const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mirrored, setMirrored] = useState(false);

  const { signup } = useAuth();
  const { t, isRTL, direction, language } = useLanguage();
  const navigate = useNavigate();

  const heroCopy = useMemo(() => {
    if (isRTL) {
      return {
        badge: 'انطلاقة مساحة عملك',
        headline: 'ابدأ مركز تشغيلك القانوني الآمن',
        subheadline:
          'سجّل مكتبك، وادعُ الشركاء، ونظّم القضايا من منصة موحدة ومشفرة تدعم نموك.',
        highlights: [
          { icon: ShieldCheck, text: 'حماية بمستوى المؤسسات مع مراقبة امتثال مستمرة.' },
          { icon: Sparkles, text: 'تهيئة موجهة وفق حجم مكتبك وتدفقات عملك.' },
          { icon: UserPlus, text: 'حسابات تعاونية للشركاء والعملاء والمساعدين من اليوم الأول.' },
        ],
        stats: [
          { value: '٣ دقائق', label: 'متوسط التسجيل' },
          { value: '٢٤/٧', label: 'دعم تهيئة متخصص' },
        ],
      };
    }

    return {
      badge: 'Launch your workspace',
      headline: 'Start your secure legal operations hub',
      subheadline:
        'Register your firm, invite partners, and orchestrate matters from a centralized, encrypted platform.',
      highlights: [
        { icon: ShieldCheck, text: 'Enterprise-grade security with continuous compliance monitoring.' },
        { icon: Sparkles, text: 'Guided onboarding tailored to your practice size and workflows.' },
        { icon: UserPlus, text: 'Collaborative accounts ready for partners, clients, and assistants.' },
      ],
      stats: [
        { value: '3 min', label: 'Average signup time' },
        { value: '24/7', label: 'Specialist onboarding support' },
      ],
    };
  }, [isRTL]);

  const shouldReverse = useMemo(() => (isRTL ? !mirrored : mirrored), [isRTL, mirrored]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: t('common.error'),
        description: t('auth.validation.password_mismatch'),
        variant: 'destructive',
      });
      return;
    }

    if (password.length < 6) {
      toast({
        title: t('common.error'),
        description: t('auth.validation.password_length'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await signup(email, password, name);
      toast({
        title: t('auth.signup.success_title'),
        description: t('auth.signup.success_message'),
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: t('common.error'),
        description: error instanceof Error ? error.message : t('auth.signup.error_message'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background/95 to-background"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute bottom-12 right-16 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute -bottom-28 left-16 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      </div>

      <div
        className={cn(
          'fixed top-6 z-50 flex items-center gap-2',
          isRTL ? 'left-6 flex-row-reverse' : 'right-6'
        )}
      >
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-border/50 bg-background/70 text-xs font-medium backdrop-blur"
          onClick={() => setMirrored((prev) => !prev)}
          aria-pressed={mirrored}
          aria-label={t('auth.login.swap_layout_aria')}
        >
          <ArrowLeftRight className="h-4 w-4" />
          <span>{t('auth.login.swap_layout')}</span>
        </Button>
        <LanguageToggle />
      </div>

      <div
        className={cn(
          'relative z-10 flex min-h-screen flex-col lg:flex-row',
          shouldReverse ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        <section
          className={cn(
            'relative hidden flex-1 overflow-hidden lg:flex',
            shouldReverse ? 'rounded-br-[48px]' : 'rounded-bl-[48px]'
          )}
        >
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
                Avocat Digital Suite
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

        <section className="relative flex flex-1 items-center justify-center px-6 py-14 lg:px-12">
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/85 to-background/95 lg:bg-transparent" />
          <div className="relative z-10 w-full max-w-lg space-y-10" dir={direction}>
            <div className="space-y-5 text-center text-white lg:hidden">
              <BrandLogo variant="text" className="mx-auto h-12" lang={language} />
              <h1 className="text-3xl font-display font-semibold text-foreground">{heroCopy.headline}</h1>
              <p className="text-base text-white/80">{heroCopy.subheadline}</p>
            </div>

            <Card className="relative overflow-hidden border border-border/60 bg-card/90 shadow-2xl backdrop-blur">
              <div className="pointer-events-none absolute -top-32 left-0 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
              <CardHeader className="relative space-y-4 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <BrandLogo variant="icon" className="h-8 w-8" lang={language} />
                </div>
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-semibold">{t('auth.signup.title')}</CardTitle>
                  <CardDescription>{t('auth.signup.subtitle')}</CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="space-y-2">
                    <Label htmlFor="name">{t('auth.signup.name')}</Label>
                    <div className="relative">
                      <User
                        className={cn(
                          'absolute top-3 h-4 w-4 text-muted-foreground',
                          isRTL ? 'right-3' : 'left-3'
                        )}
                      />
                      <Input
                        id="name"
                        type="text"
                        placeholder={t('auth.signup.name_placeholder')}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={cn(isRTL ? 'pr-10' : 'pl-10')}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t('auth.signup.email')}</Label>
                    <div className="relative">
                      <Mail
                        className={cn(
                          'absolute top-3 h-4 w-4 text-muted-foreground',
                          isRTL ? 'right-3' : 'left-3'
                        )}
                      />
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('auth.signup.email_placeholder')}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={cn(isRTL ? 'pr-10' : 'pl-10')}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">{t('auth.signup.password')}</Label>
                    <div className="relative">
                      <Lock
                        className={cn(
                          'absolute top-3 h-4 w-4 text-muted-foreground',
                          isRTL ? 'right-3' : 'left-3'
                        )}
                      />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder={t('auth.signup.password_placeholder')}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={cn(isRTL ? 'pl-12 pr-10' : 'pl-10 pr-12')}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'absolute top-0 h-full px-3 py-2 hover:bg-transparent',
                          isRTL ? 'left-0' : 'right-0'
                        )}
                        onClick={() => setShowPassword((prev) => !prev)}
                        aria-pressed={showPassword}
                        aria-label={
                          showPassword ? t('auth.login.hide_password') : t('auth.login.show_password')
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">{t('auth.signup.confirm_password')}</Label>
                    <div className="relative">
                      <Lock
                        className={cn(
                          'absolute top-3 h-4 w-4 text-muted-foreground',
                          isRTL ? 'right-3' : 'left-3'
                        )}
                      />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder={t('auth.signup.confirm_password_placeholder')}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={cn(isRTL ? 'pl-12 pr-10' : 'pl-10 pr-12')}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'absolute top-0 h-full px-3 py-2 hover:bg-transparent',
                          isRTL ? 'left-0' : 'right-0'
                        )}
                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                        aria-pressed={showConfirmPassword}
                        aria-label={
                          showConfirmPassword
                            ? t('auth.login.hide_password')
                            : t('auth.login.show_password')
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button type="submit" className="w-full glow-effect" disabled={loading}>
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 animate-spin rounded-full border-b-2 border-white" />
                        {t('common.loading')}
                      </span>
                    ) : (
                      <>
                        {t('auth.signup.submit')}
                        <ArrowRight className={`ml-2 h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </Button>
                </form>

                <div className="space-y-2 text-center text-sm text-muted-foreground">
                  <p>
                    {t('auth.signup.have_account')}{' '}
                    <Link to="/login" className="font-medium text-primary hover:underline">
                      {t('auth.login.submit')}
                    </Link>
                  </p>
                  <p>
                    <Link to="/" className="font-medium text-primary hover:underline">
                      {t('auth.signup.back_to_home')}
                    </Link>
                  </p>
                </div>

                <div
                  className={cn(
                    'flex items-center gap-3 rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 backdrop-blur',
                    isRTL ? 'flex-row-reverse text-right' : 'text-left'
                  )}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm">
                    <p className="font-semibold text-foreground">{t('auth.signup.security_title')}</p>
                    <p className="text-muted-foreground">{t('auth.signup.security_description')}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Signup;
