import React from 'react';
import { useI18n, I18nProvider } from '@/hooks/useI18n';
import ContentGuard from '@/utils/contentGuard';

ContentGuard();

const LandingContent: React.FC = () => {
  const { t, dir, locale, setLocale } = useI18n();
  const navItems: string[] = t('nav') || [];
  const hero = t('hero');
  const about = t('about');
  const services: string[] = t('services');
  const capabilities: string[] = t('capabilities');
  const aiLegal = t('ai_legal');
  const digital = t('digital_transformation');
  const cyber = t('cybercrime');
  const challenges: string[] = t('challenges');
  const whyUs: string[] = t('why_us');
  const cases = t('case_highlights');
  const team = t('team');
  const contact = t('contact');
  const footer = t('footer');
  const titleChallenges = t('titles.challenges');
  const titleWhyUs = t('titles.why_us');

  return (
    <div dir={dir} className="font-cairo">
      <header className="flex justify-between items-center p-4 border-b">
        <nav className="space-x-4">
          {navItems.map((item, idx) => (
            <a key={idx} href={`#section-${idx}`} className="mx-2">
              {item}
            </a>
          ))}
        </nav>
        <button
          onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')}
          className="border px-3 py-1 rounded"
        >
          {locale === 'ar' ? 'English' : 'العربية'}
        </button>
      </header>

      <section id="hero" className="p-10 text-center">
        <h1 className="text-3xl font-bold mb-4">{hero.headline}</h1>
        <p className="mb-4">{hero.subheadline}</p>
        <div className="space-x-4">
          <a href="#contact" className="bg-blue-600 text-white px-4 py-2 rounded">
            {hero.primaryCta}
          </a>
          <a href="#about" className="border px-4 py-2 rounded">
            {hero.secondaryCta}
          </a>
        </div>
      </section>

      <section id="about" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{navItems[1]}</h2>
        <p className="mb-2">{about.vision}</p>
        <p className="mb-2">{about.philosophy}</p>
        <p className="mb-2">{about.client_commitment}</p>
      </section>

      <section id="services" className="p-10">
        <h2 className="text-2xl font-semibold mb-4">{navItems[2]}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {services.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>

      <section id="capabilities" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{navItems[3]}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {capabilities.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      <section id="ai-legal" className="p-10">
        <h2 className="text-2xl font-semibold mb-4">{aiLegal.title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {aiLegal.points.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="digital" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{digital.title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {digital.bullets.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="cyber" className="p-10">
        <h2 className="text-2xl font-semibold mb-4">{cyber.title}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {cyber.bullets.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="challenges" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{titleChallenges}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {challenges.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="why-us" className="p-10">
        <h2 className="text-2xl font-semibold mb-4">{titleWhyUs}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {whyUs.map((p: string, i: number) => (
            <li key={i}>{p}</li>
          ))}
        </ul>
      </section>

      <section id="cases" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{navItems[7]}</h2>
        <ul className="space-y-4">
          {cases.map((c: any, i: number) => (
            <li key={i} className="border p-4 rounded">
              <h3 className="font-bold mb-2">{c.title}</h3>
              <p>{c.summary}</p>
            </li>
          ))}
        </ul>
        <p className="text-sm mt-4">{t('legal_disclaimer')}</p>
      </section>

      <section id="team" className="p-10">
        <h2 className="text-2xl font-semibold mb-4">{navItems[8]}</h2>
        <p className="mb-4">{team.intro}</p>
        <ul className="space-y-4">
          {team.members.map((m: any, i: number) => (
            <li key={i} className="border p-4 rounded">
              <h3 className="font-bold">{m.name}</h3>
              <p className="text-sm">{m.role}</p>
              <p className="text-sm">{m.bio}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="contact" className="p-10 bg-gray-50">
        <h2 className="text-2xl font-semibold mb-4">{navItems[9]}</h2>
        <p>{contact.address}</p>
        <p>{contact.phone.join(', ')}</p>
        <p>{contact.email}</p>
      </section>

      <footer className="p-4 text-center border-t">
        {footer}
      </footer>
    </div>
  );
};

const LandingPage: React.FC = () => (
  <I18nProvider>
    <LandingContent />
  </I18nProvider>
);

export default LandingPage;
