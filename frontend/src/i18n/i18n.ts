import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from './ar.json';
import en from './en.json';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['ar', 'en'],
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'avocat_language',
      caches: ['localStorage'],
    },
  });

i18n.on('languageChanged', (lng) => {
  const dir = i18n.dir(lng);
  document.documentElement.setAttribute('dir', dir);
  document.documentElement.setAttribute('lang', lng);
});

const initialDir = i18n.dir(i18n.language);
document.documentElement.setAttribute('dir', initialDir);
document.documentElement.setAttribute('lang', i18n.language);

export default i18n;
