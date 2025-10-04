import type { FC, ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

import BrandLogo from '@/components/common/BrandLogo';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import LanguageToggle from '@/components/ui/language-toggle';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

import authBackground from '@/assets/auth-background.jpg';

export type AuthHighlight = {
  icon: LucideIcon;
  text: ReactNode;
};

export type AuthStat = {
  value: ReactNode;
  label: ReactNode;
};

type AuthHero = {
  badge?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  highlights?: AuthHighlight[];
  stats?: AuthStat[];
  bottom?: ReactNode;
};

type AuthCard = {
  icon?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  content: ReactNode;
  footer?: ReactNode;
};

type AuthLayoutProps = {
  heroSide?: 'left' | 'right';
  hero: AuthHero;
  card: AuthCard;
  toolbar?: ReactNode;
};

const AuthLayout: FC<AuthLayoutProps> = ({ heroSide = 'left', hero, card, toolbar }) => {
  const { direction, isRTL, language } = useLanguage();

  const toolbarContent = toolbar ?? <LanguageToggle />;

  return (
    <div className="relative min-h-screen bg-[hsl(var(var(--background)))]" dir={direction}>
      <div
        className={cn(
          'fixed top-6 z-50 flex items-center gap-2',
          isRTL ? 'left-6 flex-row-reverse' : 'right-6'
        )}
      >
        {toolbarContent}
      </div>

      <div
        className={cn(
          'relative flex min-h-screen flex-col',
          heroSide === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        <section className="relative hidden flex-1 overflow-hidden lg:flex">
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${authBackground})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'brightness(0.6)',
              }}
            />
            <div className="absolute inset-0" style={{ background: 'var(var(--gradient-hero))' }} />
          </div>

          <div className="relative z-10 flex w-full flex-col justify-between px-12 py-16 text-[hsl(var(var(var(--foreground))))] lg:px-16">
            <div className="flex items-center justify-between">
              <BrandLogo variant="text" className="h-12" lang={language} dark />
              {hero.badge ? (
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-white/80 backdrop-blur">
                  {hero.badge}
                </div>
              ) : null}
            </div>

            <div
              className={cn(
                'mt-12 flex flex-col gap-6',
                isRTL ? 'items-end text-right' : 'items-start text-left'
              )}
            >
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold leading-tight lg:text-5xl xl:text-6xl">
                  {hero.title}
                </h1>
                {hero.description ? (
                  <p className="max-w-xl text-base leading-relaxed text-white/85 lg:text-lg">
                    {hero.description}
                  </p>
                ) : null}
              </div>

              {hero.highlights && hero.highlights.length > 0 ? (
                <div className="grid w-full max-w-xl gap-3">
                  {hero.highlights.map(({ icon: Icon, text }, index) => (
                    <div
                      key={`highlight-${index}`}
                      className={cn(
                        'flex items-start gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 dark:border-white/10 dark:bg-black/20 dark:hover:bg-black/10',
                        isRTL ? 'flex-row-reverse text-right' : 'text-left'
                      )}
                    >
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 dark:bg-white/5">
                        <Icon className="h-5 w-5" style={{ color: 'hsl(var(var(--gold-light)))' }} />
                      </span>
                      <span className="text-sm leading-relaxed text-white/90">{text}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              {hero.bottom}
            </div>

            {hero.stats && hero.stats.length > 0 ? (
              <div className="mt-12 grid w-full max-w-xl gap-4 text-white/90 sm:grid-cols-2">
                {hero.stats.map(({ value, label }, index) => (
                  <div
                    key={`stat-${index}`}
                    className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-lg dark:border-white/10 dark:bg-black/20"
                  >
                    <p className="text-3xl font-bold">{value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.35em] text-white/70">{label}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </section>

        <section className="relative flex flex-1 items-center justify-center px-6 py-16 lg:px-12">
          <div className="absolute inset-0 bg-[hsl(var(var(--background)))]/90 lg:bg-transparent" />
          <div className="relative z-10 w-full max-w-md space-y-8">
            <div className="overflow-hidden rounded-3xl border border-border/40 bg-[hsl(var(var(--card)))] shadow-[var(var(--shadow-elegant))] lg:hidden">
              <div className="relative">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url(${authBackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'brightness(0.6)',
                  }}
                />
                <div className="absolute inset-0" style={{ background: 'var(var(--gradient-hero))' }} />
                <div className="relative z-10 space-y-4 px-6 py-8 text-[hsl(var(var(var(--foreground))))]">
                  <BrandLogo variant="text" className="h-10" lang={language} dark />
                  <h1 className="text-3xl font-semibold leading-snug">{hero.title}</h1>
                  {hero.description ? (
                    <p className="text-sm leading-relaxed text-white/80">{hero.description}</p>
                  ) : null}

                  {hero.highlights && hero.highlights.length > 0 ? (
                    <div className="space-y-3">
                      {hero.highlights.map(({ icon: Icon, text }, index) => (
                        <div
                          key={`mobile-highlight-${index}`}
                          className={cn(
                            'flex items-start gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md dark:border-white/10 dark:bg-black/30',
                            isRTL ? 'flex-row-reverse text-right' : 'text-left'
                          )}
                        >
                          <span className="mt-1 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/15 dark:bg-white/5">
                            <Icon className="h-4 w-4" style={{ color: 'hsl(var(var(--gold-light)))' }} />
                          </span>
                          <span className="text-xs leading-relaxed text-white/85">{text}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <Card
              className="relative w-full overflow-hidden border border-border/60 backdrop-blur-sm"
              style={{
                background: 'hsl(var(var(--card)))',
                boxShadow: 'var(var(--shadow-card))',
              }}
            >
              <div className="pointer-events-none absolute -top-32 left-1/2 h-60 w-60 -translate-x-1/2 rounded-full bg-[hsl(var(var(--primary)))]/12 blur-3xl" />

              {(card.icon || card.title || card.description) && (
                <CardHeader className="relative space-y-4 text-center">
                  {card.icon}
                  {card.title ? (
                    <CardTitle className="text-2xl font-semibold text-[hsl(var(var(--foreground)))]">
                      {card.title}
                    </CardTitle>
                  ) : null}
                  {card.description ? (
                    <CardDescription className="text-sm text-[hsl(var(var(--slate-light)))]">
                      {card.description}
                    </CardDescription>
                  ) : null}
                </CardHeader>
              )}

              <CardContent className="relative space-y-6">{card.content}</CardContent>

              {card.footer ? (
                <CardFooter className="relative flex flex-col items-center justify-center gap-2 border-t border-border/40 bg-[hsl(var(--surface-muted))] py-4 text-sm text-[hsl(var(var(--slate-light)))]">
                  {card.footer}
                </CardFooter>
              ) : null}
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AuthLayout;
