import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const setLang = (lng: 'ar' | 'en') => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="inline-flex gap-2">
      <button
        onClick={() => setLang('ar')}
        className="px-2 py-1 rounded border"
      >
        العربية
      </button>
      <button
        onClick={() => setLang('en')}
        className="px-2 py-1 rounded border"
      >
        English
      </button>
    </div>
  );
}
