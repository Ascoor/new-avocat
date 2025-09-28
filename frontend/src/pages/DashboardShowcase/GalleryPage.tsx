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
import { cn } from '@/lib/utils';

const getLocalizedText = (language: Language, value: LocalizedText) => value[language];

const buildCategoryIndex = (catalog: DashboardCatalog) => {
  const map = new Map<string, LocalizedText>();
  catalog.forEach((dashboard) => {
    map.set(dashboard.category.en, dashboard.category);
  });
  return Array.from(map.values());
};

const classes = {
  shell: cn(
    'relative min-h-screen overflow-hidden text-slate-100',
    'bg-[radial-gradient(circle_at_top,_hsl(var(--primary)_/_0.18),_transparent_65%)]'
  ),
  overlayPrimary:
    'pointer-events-none absolute inset-0 opacity-[0.35] bg-[linear-gradient(130deg,_hsl(var(--background))_15%,_hsl(var(--secondary))_100%)]',
  overlayAurora: 'pointer-events-none absolute inset-0 opacity-20 bg-[var(--gradient-aurora)]',
  content:
    'relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 pb-24 pt-12 sm:px-6 lg:px-8',
  header: 'flex flex-wrap items-center justify-between gap-4',
  actions: 'flex items-center gap-2',
  hero: 'mt-12 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]',
  heroCard: 'rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl backdrop-blur',
  statsGrid: 'grid gap-6 sm:grid-cols-2',
  stat: 'space-y-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm text-slate-200 shadow-lg',
  search: 'flex w-full max-w-xl items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-2 backdrop-blur',
  searchInput: 'border-0 bg-transparent text-sm text-white placeholder:text-slate-400 focus-visible:ring-0',
  filters: 'flex flex-wrap gap-2',
  grid: 'grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3',
  empty:
    'col-span-full flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 p-12 text-center text-slate-300',
  card: cn(
    'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 text-white shadow-xl transition-all duration-500',
    'hover:-translate-y-1 hover:shadow-[0_28px_60px_-18px_rgba(14,116,144,0.35)] hover:border-[rgba(99,102,241,0.45)]'
  ),
  cardPreview: 'relative aspect-[16/9] overflow-hidden',
  cardPreviewGradient: 'absolute inset-0 transition-opacity duration-500 group-hover:opacity-[0.65]',
  cardPreviewOverlay:
    'absolute inset-0 bg-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.35]',
  cardPreviewContent: 'relative z-10 flex h-full flex-col justify-between p-6',
  cardBadge:
    'inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-black/30 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em]',
  cardCategory: 'text-sm font-medium text-slate-200',
  cardHeader: 'space-y-3 px-6 pt-6',
  cardTitle: 'text-2xl font-semibold text-white',
  cardSummary: 'text-sm text-slate-200',
  cardContent: 'space-y-6 px-6 pb-6',
  cardFeatures: 'space-y-3 rounded-2xl border border-white/10 bg-white/5 p-5 text-sm text-slate-200',
  cardMetrics:
    'flex items-center justify-between rounded-2xl border border-indigo-300/30 bg-indigo-500/10 px-5 py-3 text-sm text-indigo-100',
  cardCta: 'w-full rounded-full',
  statHeading: 'text-xs font-semibold uppercase tracking-[0.4em] text-indigo-200',
  statParagraph: 'text-slate-300',
  statStrong: 'text-4xl font-bold text-white',
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
    <div className={classes.shell} dir={direction}>
      <div aria-hidden className={classes.overlayPrimary} />
      <div aria-hidden className={classes.overlayAurora} />
      <div className={classes.content}>
        <header className={classes.header}>
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo variant="text" className="h-12" lang={language} />
            <span className="text-sm font-medium text-slate-400">
              {t('showcase.header.tagline')}
            </span>
          </Link>
          <div className={classes.actions}>
            <ThemeToggle />
            <LanguageToggle />
            <Button variant="outline" asChild>
              <Link to="/">{t('showcase.actions.backToLanding')}</Link>
            </Button>
          </div>
        </header>

        <section className={classes.hero}>
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

          <div className={classes.heroCard}>
            <div className={classes.statsGrid}>
              <div className={classes.stat}>
                <h3 className={classes.statHeading}>{t('showcase.stats.totalDashboards')}</h3>
                <strong className={classes.statStrong}>25</strong>
                <p className={classes.statParagraph}>{t('showcase.stats.totalDashboardsHint')}</p>
              </div>
              <div className={classes.stat}>
                <h3 className={classes.statHeading}>{t('showcase.stats.uniqueIndustries')}</h3>
                <strong className={classes.statStrong}>{categories.length}</strong>
                <p className={classes.statParagraph}>{t('showcase.stats.uniqueIndustriesHint')}</p>
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
            <div className={classes.search}>
              <Search className="h-4 w-4 text-slate-300" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('showcase.filters.searchPlaceholder')}
                className={classes.searchInput}
              />
            </div>
            <div className={classes.filters} dir={direction}>
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

          <div className={classes.grid}>
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
              <div className={classes.empty}>
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
    <Card className={classes.card}>
      <div className={classes.cardPreview}>
        <div className={cn(classes.cardPreviewGradient, 'bg-gradient-to-br', dashboard.preview.gradient)} />
        <div className={classes.cardPreviewOverlay} />
        <div className={classes.cardPreviewContent}>
          <Badge variant="outline" className={cn(classes.cardBadge, dashboard.preview.accentText)}>
            {localizedBadge}
          </Badge>
          <span className={classes.cardCategory}>{localizedCategory}</span>
        </div>
      </div>
      <CardHeader className={classes.cardHeader}>
        <h2 className={classes.cardTitle}>{localizedTitle}</h2>
        <p className={classes.cardSummary}>{localizedSummary}</p>
      </CardHeader>
      <CardContent className={classes.cardContent}>
        <ul className={classes.cardFeatures}>
          {dashboard.features.slice(0, 3).map((feature) => (
            <li key={feature.en} className="flex items-start gap-3">
              <span className="mt-[0.35rem] h-2 w-2 flex-shrink-0 rounded-full bg-[hsl(225_100%_85%/_0.85)]" />
              <span>{getLocalizedText(language, feature)}</span>
            </li>
          ))}
          {dashboard.features.length > 3 ? (
            <li className="flex items-center justify-center text-indigo-100">
              +{dashboard.features.length - 3}
            </li>
          ) : null}
        </ul>
        <div className={classes.cardMetrics}>
          <span>{getLocalizedText(language, dashboard.metrics.label)}</span>
          <strong>{getLocalizedText(language, dashboard.metrics.value)}</strong>
        </div>
        <Button asChild variant="accent" className={classes.cardCta}>
          <Link to={`/showcase/${dashboard.slug}`}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardGalleryPage;
