import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';

import BrandLogo from '@/components/common/BrandLogo';
import ThemeToggle from '@/components/ui/theme-toggle';
import LanguageToggle from '@/components/ui/language-toggle';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import type { Language } from '@/contexts/LanguageContext';
import {
  DASHBOARD_CATALOG,
  type DashboardDefinition,
  type DashboardCatalog,
  type LocalizedText,
} from '@/data/dashboard-showcase';

const getLocalizedText = (language: Language, value: LocalizedText) => value[language];

const buildCategoryIndex = (catalog: DashboardCatalog) => {
  const map = new Map<string, LocalizedText>();
  catalog.forEach((dashboard) => {
    map.set(dashboard.category.en, dashboard.category);
  });
  return Array.from(map.values());
};

const DashboardGalleryPage = () => {
  const { language, direction, t } = useLanguage();
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const firstDashboardSlug = DASHBOARD_CATALOG[0]?.slug ?? 'dashboard-1';

  useEffect(() => {
    document.title = t('showcase.pageTitle');
  }, [t, language]);

  const categories = useMemo(() => buildCategoryIndex(DASHBOARD_CATALOG), []);

  const filteredDashboards = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return DASHBOARD_CATALOG.filter((dashboard) => {
      const matchesCategory =
        activeCategory === 'all' || dashboard.category.en === activeCategory;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const localizedStrings = [
        dashboard.title,
        dashboard.description,
        dashboard.summary,
        dashboard.category,
        dashboard.badge,
        dashboard.metrics.label,
        dashboard.metrics.value,
      ]
        .map((value) => getLocalizedText(language, value))
        .join(' ')
        .toLowerCase();

      return matchesCategory && localizedStrings.includes(normalizedQuery);
    });
  }, [activeCategory, language, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100" dir={direction}>
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-20 pt-10 sm:px-6 lg:px-8">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo variant="text" className="h-12" lang={language} />
            <span className="text-sm font-medium text-slate-400">
              {t('showcase.header.tagline')}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LanguageToggle />
            <Button variant="outline" asChild>
              <Link to="/">{t('showcase.actions.backToLanding')}</Link>
            </Button>
          </div>
        </header>

        <section className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-indigo-200">
              <Sparkles className="h-4 w-4" />
              {t('showcase.hero.badge')}
            </div>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
              {t('showcase.hero.title')}
            </h1>
            <p className="max-w-2xl text-lg text-slate-300 sm:text-xl">
              {t('showcase.hero.subtitle')}
            </p>
            <p className="max-w-2xl text-base text-slate-400">
              {t('showcase.hero.description')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link to={`/showcase/${firstDashboardSlug}`}>
                  {t('showcase.actions.jumpToExample')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">
                  {t('showcase.actions.goToApp')}
                </Link>
              </Button>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-sm text-slate-300">{t('showcase.stats.totalDashboards')}</p>
                <p className="text-4xl font-bold text-white">25</p>
                <p className="text-xs text-slate-400">{t('showcase.stats.totalDashboardsHint')}</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-slate-300">{t('showcase.stats.uniqueIndustries')}</p>
                <p className="text-4xl font-bold text-white">{categories.length}</p>
                <p className="text-xs text-slate-400">{t('showcase.stats.uniqueIndustriesHint')}</p>
              </div>
            </div>
            <div className="mt-8 grid gap-3">
              {categories.slice(0, 6).map((category) => (
                <div
                  key={category.en}
                  className="flex items-center justify-between rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  <span>{getLocalizedText(language, category)}</span>
                  <span className="text-xs text-indigo-200">
                    {t('showcase.labels.industryTag')}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-14 space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2">
              <Search className="h-4 w-4 text-slate-300" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('showcase.filters.searchPlaceholder')}
                className="border-0 bg-transparent text-sm text-white placeholder:text-slate-400 focus-visible:ring-0"
              />
            </div>
            <div className="flex flex-wrap gap-2" dir={direction}>
              <Button
                type="button"
                variant={activeCategory === 'all' ? 'accent' : 'ghost'}
                className="rounded-full"
                onClick={() => setActiveCategory('all')}
              >
                {t('showcase.filters.all')}
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.en}
                  type="button"
                  variant={activeCategory === category.en ? 'accent' : 'ghost'}
                  className="rounded-full"
                  onClick={() => setActiveCategory(category.en)}
                >
                  {getLocalizedText(language, category)}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {filteredDashboards.length > 0 ? (
              filteredDashboards.map((dashboard) => (
                <GalleryCard
                  key={dashboard.slug}
                  dashboard={dashboard}
                  language={language}
                  ctaLabel={t('showcase.actions.viewDashboard')}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300">
                <Sparkles className="mb-4 h-10 w-10 text-indigo-200" />
                <h2 className="text-2xl font-semibold text-white">
                  {t('showcase.empty.title')}
                </h2>
                <p className="mt-2 max-w-md text-sm text-slate-400">
                  {t('showcase.empty.subtitle')}
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

interface GalleryCardProps {
  dashboard: DashboardDefinition;
  language: Language;
  ctaLabel: string;
}

const GalleryCard = ({ dashboard, language, ctaLabel }: GalleryCardProps) => {
  const localizedTitle = getLocalizedText(language, dashboard.title);
  const localizedSummary = getLocalizedText(language, dashboard.summary);
  const localizedCategory = getLocalizedText(language, dashboard.category);
  const localizedBadge = getLocalizedText(language, dashboard.badge);

  return (
    <Card className="group relative overflow-hidden border border-white/10 bg-white/5 text-white shadow-xl transition-all hover:-translate-y-1 hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:shadow-2xl">
      <div className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br ${dashboard.accent}`}></div>
      <CardHeader className="relative space-y-4">
        <div className="flex items-center justify-between">
          <Badge className="bg-white/10 text-indigo-100">
            {localizedBadge}
          </Badge>
          <span className="text-xs text-indigo-200">{localizedCategory}</span>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-white">{localizedTitle}</h2>
          <p className="text-sm text-slate-200">{localizedSummary}</p>
        </div>
      </CardHeader>
      <CardContent className="relative space-y-5">
        <ul className="space-y-2 text-sm text-slate-200">
          {dashboard.features.slice(0, 3).map((feature) => (
            <li key={feature.en} className="flex items-start gap-2 text-sm">
              <span className="mt-1 h-2 w-2 rounded-full bg-indigo-300"></span>
              <span>{getLocalizedText(language, feature)}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm text-indigo-200">
          <span>{getLocalizedText(language, dashboard.metrics.label)}</span>
          <strong>{getLocalizedText(language, dashboard.metrics.value)}</strong>
        </div>
        <Button asChild variant="accent" className="w-full rounded-full">
          <Link to={`/showcase/${dashboard.slug}`}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardGalleryPage;
