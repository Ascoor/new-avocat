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

  const featuredDashboard = DASHBOARD_CATALOG[0];
  const firstDashboardSlug = featuredDashboard?.slug ?? 'dashboard-1';

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

  const uniqueIndustries = useMemo(
    () => new Set(DASHBOARD_CATALOG.map((dashboard) => dashboard.category.en)).size,
    [],
  );

  const heroStats = useMemo(
    () => [
      {
        label: t('showcase.stats.totalDashboards'),
        hint: t('showcase.stats.totalDashboardsHint'),
        value: `${DASHBOARD_CATALOG.length}`,
      },
      {
        label: t('showcase.stats.uniqueIndustries'),
        hint: t('showcase.stats.uniqueIndustriesHint'),
        value: `${uniqueIndustries}`,
      },
    ],
    [t, uniqueIndustries],
  );

  const featuredContent = useMemo(() => {
    if (!featuredDashboard) {
      return null;
    }

    return {
      title: getLocalizedText(language, featuredDashboard.title),
      summary: getLocalizedText(language, featuredDashboard.summary),
      badge: getLocalizedText(language, featuredDashboard.badge),
      category: getLocalizedText(language, featuredDashboard.category),
      features: featuredDashboard.features.slice(0, 3).map((feature) =>
        getLocalizedText(language, feature),
      ),
    };
  }, [featuredDashboard, language]);

  return (
    <div className="gallery-shell" data-gallery-root dir={direction}>
      <div className="gallery-content">
        <header className="gallery-header">
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandLogo variant="text" className="h-12" lang={language} />
            <span className="text-sm font-medium text-muted-foreground">
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
          <div className="gallery-hero__content">
            <span className="gallery-hero__badge">
              <Sparkles className="h-4 w-4" />
              {t('showcase.hero.badge')}
            </span>
            <h1 className="gallery-hero__title">{t('showcase.hero.title')}</h1>
            <p className="gallery-hero__subtitle">{t('showcase.hero.subtitle')}</p>
            <p className="gallery-hero__description">{t('showcase.hero.description')}</p>
            <div className="gallery-hero__cta">
              <Button size="lg" asChild>
                <Link to={`/showcase/${firstDashboardSlug}`}>
                  {t('showcase.actions.jumpToExample')}
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/dashboard">{t('showcase.actions.goToApp')}</Link>
              </Button>
            </div>
            <dl className="gallery-hero__stats">
              {heroStats.map((stat) => (
                <div key={stat.label} className="gallery-hero__statsCard">
                  <dt className="gallery-hero__statsLabel">{stat.label}</dt>
                  <dd className="gallery-hero__statsValue">{stat.value}</dd>
                  <dd className="gallery-hero__statsHint">{stat.hint}</dd>
                </div>
              ))}
            </dl>
          </div>

          {featuredDashboard && featuredContent ? (
            <aside
              className="gallery-hero__showcase"
              aria-label={featuredContent.title}
            >
              <div className="gallery-hero__showcasePreview">
                <span
                  aria-hidden
                  className={cn(
                    'gallery-hero__showcaseAccent bg-gradient-to-br',
                    featuredDashboard.accent,
                  )}
                />
                <span
                  aria-hidden
                  className={cn(
                    'gallery-hero__showcaseBackdrop bg-gradient-to-br',
                    featuredDashboard.preview.gradient,
                  )}
                />
                <span aria-hidden className="gallery-hero__showcaseOverlay" />
                <div className="gallery-hero__showcaseContent">
                  <Badge
                    variant="outline"
                    className={cn(
                      'gallery-hero__showcaseBadge',
                      featuredDashboard.preview.accentText,
                    )}
                  >
                    {featuredContent.badge}
                  </Badge>
                  <span className="gallery-hero__showcaseMeta">
                    {featuredContent.category}
                  </span>
                  <h3 className="gallery-hero__showcaseTitle">
                    {featuredContent.title}
                  </h3>
                </div>
              </div>
              <div className="gallery-hero__showcaseBody">
                <p className="gallery-hero__showcaseDescription">
                  {featuredContent.summary}
                </p>
                <ul className="gallery-hero__showcaseList">
                  {featuredContent.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
              <Button asChild variant="ghost" className="gallery-hero__showcaseAction">
                <Link to={`/showcase/${featuredDashboard.slug}`}>
                  {t('showcase.actions.jumpToExample')}
                </Link>
              </Button>
            </aside>
          ) : null}
        </section>

        <section className="gallery-collection">
          <div className="gallery-collection__toolbar">
            <div className="gallery-collection__toolbarPrimary">
              <div className="gallery-search">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={t('showcase.filters.searchPlaceholder')}
                  className="gallery-search__input"
                />
              </div>
              <div className="gallery-collection__meta" role="status">
                <span className="gallery-collection__metaValue">
                  {filteredDashboards.length}
                </span>
                <span className="gallery-collection__metaLabel">
                  {t('showcase.stats.totalDashboards')}
                </span>
              </div>
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
                <Sparkles className="mb-4 h-10 w-10 text-primary" />
                <h2 className="text-2xl font-semibold text-foreground">
                  {t('showcase.empty.title')}
                </h2>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
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
      <span
        aria-hidden
        className={cn('gallery-card__accent bg-gradient-to-br', dashboard.accent)}
      />
      <div className="gallery-card__preview">
        <div
          className={cn(
            'gallery-card__previewGradient bg-gradient-to-br',
            dashboard.preview.gradient,
          )}
        />
        <div className="gallery-card__previewOverlay" />
        <div className="gallery-card__previewContent">
          <Badge
            variant="outline"
            className={cn('gallery-card__previewBadge', dashboard.preview.accentText)}
          >
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
            <li className="gallery-card__feature gallery-card__feature--more">
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
