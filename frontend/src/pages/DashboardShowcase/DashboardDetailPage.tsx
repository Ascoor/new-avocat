import { useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ExternalLink, LayoutDashboard, Sparkles } from 'lucide-react';

import BrandLogo from '@/components/common/BrandLogo';
import ThemeToggle from '@/components/ui/theme-toggle';
import LanguageToggle from '@/components/ui/language-toggle';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';
import { DASHBOARD_CATALOG, type LocalizedText } from '@/data/dashboard-showcase';

const getLocalizedText = (language: Language, value: LocalizedText) => value[language];

const DashboardDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language, direction, t } = useLanguage();

  const { dashboard, previous, next } = useMemo(() => {
    const index = DASHBOARD_CATALOG.findIndex((item) => item.slug === slug);
    const current = index >= 0 ? DASHBOARD_CATALOG[index] : undefined;
    return {
      dashboard: current,
      previous: index > 0 ? DASHBOARD_CATALOG[index - 1] : undefined,
      next: index >= 0 && index < DASHBOARD_CATALOG.length - 1 ? DASHBOARD_CATALOG[index + 1] : undefined,
    };
  }, [slug]);

  useEffect(() => {
    if (dashboard) {
      document.title = `${getLocalizedText(language, dashboard.title)} — ${t('showcase.pageTitle')}`;
    } else {
      document.title = t('showcase.pageTitle');
    }
  }, [dashboard, language, t]);

  if (!dashboard) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" dir={direction}>
        <div className="max-w-lg rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-100 shadow-xl backdrop-blur">
          <Sparkles className="mx-auto mb-6 h-12 w-12 text-indigo-200" />
          <h1 className="text-3xl font-bold text-white">{t('showcase.notFound.title')}</h1>
          <p className="mt-3 text-sm text-slate-300">{t('showcase.notFound.subtitle')}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild variant="accent">
              <Link to="/showcase">{t('showcase.actions.backToGallery')}</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/">{t('showcase.actions.backToLanding')}</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const localizedTitle = getLocalizedText(language, dashboard.title);
  const localizedDescription = getLocalizedText(language, dashboard.description);
  const localizedBadge = getLocalizedText(language, dashboard.badge);
  const localizedCategory = getLocalizedText(language, dashboard.category);
  const localizedMetricsLabel = getLocalizedText(language, dashboard.metrics.label);
  const localizedMetricsValue = getLocalizedText(language, dashboard.metrics.value);
  const features = dashboard.features;
  const previewUrl = `/dashboards/${dashboard.slug}.html`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100" dir={direction}>
      <div className="mx-auto flex w-full max-w-7xl flex-col px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="ghost" className="rounded-full border border-white/10 bg-white/5 px-5" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4" />
              {t('showcase.actions.backToGallery')}
            </Button>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2">
              <BrandLogo variant="text" className="h-10" lang={language} />
              <Badge className="bg-indigo-500/20 text-indigo-100">{localizedBadge}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="hidden sm:flex"
              asChild
            >
              <Link to="/showcase">
                <LayoutDashboard className="h-4 w-4" />
              </Link>
            </Button>
            {previous ? (
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link to={`/showcase/${previous.slug}`}>
                  <ArrowLeft className="h-4 w-4" />
                  <span>{getLocalizedText(language, previous.title)}</span>
                </Link>
              </Button>
            ) : null}
            {next ? (
              <Button variant="ghost" className="hidden sm:flex" asChild>
                <Link to={`/showcase/${next.slug}`}>
                  <span>{getLocalizedText(language, next.title)}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <ThemeToggle />
            <LanguageToggle />
            <Button variant="outline" asChild>
              <Link to="/">{t('showcase.actions.backToLanding')}</Link>
            </Button>
          </div>
        </header>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-6">
            <Card className="border-white/10 bg-white/5 text-white shadow-xl backdrop-blur">
              <CardHeader className="space-y-4">
                <div className="flex flex-wrap items-center gap-3 text-sm text-indigo-200">
                  <span className="rounded-full border border-indigo-400/40 bg-indigo-500/10 px-3 py-1 text-xs font-semibold">
                    {localizedCategory}
                  </span>
                  <span>{t('showcase.detail.badgeLabel')}</span>
                </div>
                <h1 className="text-4xl font-bold leading-tight">{localizedTitle}</h1>
                <p className="text-base text-slate-200">{localizedDescription}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="rounded-2xl border border-white/5 bg-white/5 p-5 text-sm text-slate-200">
                  <div className="flex items-center justify-between">
                    <span>{localizedMetricsLabel}</span>
                    <strong className="text-xl text-white">{localizedMetricsValue}</strong>
                  </div>
                </div>
                <div className="space-y-3">
                  <h2 className="text-lg font-semibold text-white">{t('showcase.detail.featuresTitle')}</h2>
                  <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-2">
                    {features.map((feature) => (
                      <li
                        key={feature.en}
                        className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3"
                      >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-200">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <span>{getLocalizedText(language, feature)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-3">
                  {previous ? (
                    <Button variant="outline" asChild className="rounded-full">
                      <Link to={`/showcase/${previous.slug}`}>
                        <ArrowLeft className="h-4 w-4" />
                        {t('showcase.actions.previousDashboard')}
                      </Link>
                    </Button>
                  ) : null}
                  {next ? (
                    <Button variant="outline" asChild className="rounded-full">
                      <Link to={`/showcase/${next.slug}`}>
                        {t('showcase.actions.nextDashboard')}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl backdrop-blur">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-white">{t('showcase.detail.previewTitle')}</h2>
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" className="rounded-full">
                    <a href={previewUrl} target="_blank" rel="noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {t('showcase.actions.openInNewTab')}
                    </a>
                  </Button>
                </div>
              </div>
              <p className="mt-2 text-xs text-slate-300">{t('showcase.detail.previewHint')}</p>
              <AspectRatio ratio={16 / 9}>
                <iframe
                  src={previewUrl}
                  title={localizedTitle}
                  className="h-full w-full rounded-2xl border border-white/10 bg-white/5"
                />
              </AspectRatio>
            </div>
            <Card className="border-white/10 bg-white/5 text-white shadow-xl backdrop-blur">
              <CardContent className="space-y-3 text-sm text-slate-200">
                <p>{t('showcase.detail.footerLead')}</p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="accent" asChild className="rounded-full">
                    <Link to="/showcase">{t('showcase.actions.backToGallery')}</Link>
                  </Button>
                  <Button variant="outline" asChild className="rounded-full">
                    <Link to="/">{t('showcase.actions.backToLanding')}</Link>
                  </Button>
                  <Button variant="ghost" asChild className="rounded-full">
                    <Link to="/dashboard">{t('showcase.actions.goToApp')}</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardDetailPage;
