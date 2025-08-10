import { useEffect, PropsWithChildren } from 'react';
import i18n from '@/i18n/i18n';

export default function DirectionProvider({ children }: PropsWithChildren) {
  const lang = i18n.language || 'ar';
  const dir = i18n.dir(lang);

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute('lang', lang);
    html.setAttribute('dir', dir);
    html.classList.toggle('rtl', dir === 'rtl');
    html.classList.toggle('ltr', dir === 'ltr');
  }, [lang, dir]);

  useEffect(() => {
    const handleLanguageChange = (l: string) => {
      const d = i18n.dir(l);
      const html = document.documentElement;
      html.setAttribute('lang', l);
      html.setAttribute('dir', d);
      html.classList.toggle('rtl', d === 'rtl');
      html.classList.toggle('ltr', d === 'ltr');
      localStorage.setItem('lang', l);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, []);

  return <>{children}</>;
}
