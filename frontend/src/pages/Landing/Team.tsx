import { useCallback, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useWebsiteContent } from '@/hooks/useWebsiteContent';
import { useWebsiteCollection } from '@/hooks/useWebsiteCollection';
import type { Locale, TeamMemberApi } from '@/types/website';
import { GraduationCap, Scale, ShieldCheck, UserCircle2 } from 'lucide-react';

const leadershipIcons = [Scale, GraduationCap, ShieldCheck];

const Team: React.FC = () => {
  const { language } = useLanguage();
  const locale = language as Locale;
  const isArabic = language === 'ar';
  const { getValueForLocale } = useWebsiteContent('team');
  const { data: teamData } = useWebsiteCollection<TeamMemberApi>('/api/website/team');

  const getString = useCallback(
    (key: string, fallback = ''): string =>
      getValueForLocale<string>(key, locale) ?? fallback,
    [getValueForLocale, locale]
  );

  const header = {
    badge: getString('team_badge'),
    title: getString('team_title'),
    description: getString('team_description'),
  };

  const leadershipBadges = useMemo(() => {
    return leadershipIcons
      .map((Icon, index) => ({
        Icon,
        text: getString(`team_leadership_badge_${index + 1}`),
      }))
      .filter((badge) => badge.text);
  }, [getString, locale]);

  const members = useMemo(() => {
    if (Array.isArray(teamData)) {
      return teamData;
    }
    const nested = (teamData as { data?: TeamMemberApi[] } | null)?.data;
    return Array.isArray(nested) ? nested : [];
  }, [teamData]);

  return (
    <section id="team" className="bg-surface-highlight/70 py-24">
      <div className="container mx-auto px-4 lg:px-8">
        
        {/* Header */}
        <div className="mb-16 text-center" dir={isArabic ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2 text-xs font-semibold text-muted-foreground">
            <span className={isArabic ? 'font-arabic' : 'font-english'}>
              {header.badge}
            </span>
          </div>
          <h2
            className={`mt-6 text-4xl font-display font-bold lg:text-5xl ${
              isArabic
                ? 'text-accent font-arabic'
                : 'text-foreground font-english'
            }`}
          >
            {header.title}
          </h2>
          <p
            className={`mt-4 text-lg lg:text-xl leading-relaxed text-muted-foreground ${
              isArabic
                ? 'font-arabic text-accent/90'
                : 'font-english'
            }`}
          >
            {header.description}
          </p>
        </div>

        {/* Members */}
        <div className="grid gap-10 lg:grid-cols-2">
          {members.map((member) => {
            const name = member.name[locale] ?? member.name.en ?? '';
            const role = member.position[locale] ?? member.position.en ?? '';
            const bio = member.bio[locale] ?? member.bio.en ?? '';
            const highlights = member.highlights[locale] ?? member.highlights.en ?? [];

            return (
              <div
                key={`${member.id}-${member.name.en}`}
                className="flex h-full flex-col gap-6 rounded-3xl border border-border bg-card/80 p-8 shadow-elevated backdrop-blur transition-transform duration-500 hover:-translate-y-2 hover:shadow-premium"
                dir={isArabic ? 'rtl' : 'ltr'}
              >
                {/* Card Header */}
                <div className="flex items-start gap-4">
                  <div className="rounded-3xl bg-gradient-gold p-4 text-accent-foreground shadow-gold">
                    <UserCircle2 className="h-10 w-10" />
                  </div>
                  <div>
                    <h3
                      className={`text-2xl font-semibold ${
                        isArabic
                          ? 'font-arabic text-accent'
                          : 'font-english text-foreground'
                      }`}
                    >
                      {name}
                    </h3>
                    <p className="mt-2 text-sm uppercase tracking-widest text-muted-foreground">
                      {role}
                    </p>
                  </div>
                </div>

                {/* Bio + Highlights */}
                <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                  <p className={isArabic ? 'font-arabic' : 'font-english'}>
                    {bio}
                  </p>
                  
            <ul
  className={`space-y-3 pl-5 ${
    isArabic ? 'border-r-2 border-accent pr-5' : 'border-l-2 border-accent'
  }`}
>
  {highlights.map((highlight, i) => (
    <li key={i} className="relative">
      <span
        className={`absolute top-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-accent bg-card text-xs font-bold text-accent
          ${isArabic ? 'right-[-18px]' : 'left-[-18px]'}`}
      >
        {i + 1}
      </span>

      <span
        className={`leading-relaxed ${
          isArabic ? 'font-arabic text-right pr-6' : 'font-english text-left pl-6'
        }`}
      >
        {highlight}
      </span>
    </li>
  ))}
</ul>

                </div>

                {/* Leadership Badges */}
                <div className="grid gap-4 md:grid-cols-3">
                  {leadershipBadges.map(({ Icon, text }) => (
                    <div
                      key={`${member.id}-${text}`}
                      className="rounded-2xl border border-border bg-background/70 p-4 text-center"
                    >
                      <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <p className="text-xs font-semibold text-muted-foreground">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Team;
