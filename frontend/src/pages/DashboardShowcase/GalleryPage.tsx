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

import './gallery.css';

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
    <div className="gallery-shell" dir={direction}>
      <div className="gallery-content">
        <header className="gallery-header">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo variant="text" className="h-12" lang={language} />
            <span className="text-sm font-medium text-slate-400">
              {t('showcase.header.tagline')}
            </span>
          </Link>
          <div className="gallery-actions">
            <ThemeToggle />
            <LanguageToggle />
            <Button variant="outline" asChild>
              <Link to="/">{t('showcase.actions.backToLanding')}</Link>
            </Button>
          </div>
        </header>

        <section className="gallery-hero">
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

          <div className="gallery-hero-card">
            <div className="gallery-stats-grid">
              <div className="gallery-stat">
                <h3>{t('showcase.stats.totalDashboards')}</h3>
                <strong>25</strong>
                <p>{t('showcase.stats.totalDashboardsHint')}</p>
              </div>
              <div className="gallery-stat">
                <h3>{t('showcase.stats.uniqueIndustries')}</h3>
                <strong>{categories.length}</strong>
                <p>{t('showcase.stats.uniqueIndustriesHint')}</p>
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
            <div className="gallery-search">
              <Search className="h-4 w-4 text-slate-300" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('showcase.filters.searchPlaceholder')}
                className="gallery-search__input"
              />
            </div>
            <div className="gallery-filters" dir={direction}>
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

          <div className="gallery-grid">
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
              <div className="gallery-empty">
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
    <Card className="gallery-card">
      <div className="gallery-card__preview">
        <div className={cn('gallery-card__previewGradient bg-gradient-to-br', dashboard.preview.gradient)} />
        <div className="gallery-card__previewOverlay" />
        <div className="gallery-card__previewContent">
          <Badge variant="outline" className={cn('gallery-card__previewBadge', dashboard.preview.accentText)}>
            {localizedBadge}
          </Badge>
          <span className="gallery-card__previewCategory">{localizedCategory}</span>
        </div>
      </div>
      <CardHeader className="gallery-card__header">
        <h2 className="gallery-card__title">{localizedTitle}</h2>
        <p className="gallery-card__summary">{localizedSummary}</p>
      </CardHeader>
      <CardContent className="gallery-card__content">
        <ul className="gallery-card__features">
          {dashboard.features.slice(0, 3).map((feature) => (
            <li key={feature.en} className="gallery-card__feature">
              {getLocalizedText(language, feature)}
            </li>
          ))}
          {dashboard.features.length > 3 ? (
            <li className="gallery-card__feature gallery-card__feature--more text-indigo-100">
              +{dashboard.features.length - 3}
            </li>
          ) : null}
        </ul>
        <div className="gallery-card__metrics">
          <span>{getLocalizedText(language, dashboard.metrics.label)}</span>
          <strong>{getLocalizedText(language, dashboard.metrics.value)}</strong>
        </div>
        <Button asChild variant="accent" className="gallery-card__cta">
          <Link to={`/showcase/${dashboard.slug}`}>{ctaLabel}</Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default DashboardGalleryPage;
