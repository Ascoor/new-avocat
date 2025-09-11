import { useLanguage } from '@/contexts/LanguageContext';

export default function LanguageSwitcher() {
  const { language, changeLanguage, languages } = useLanguage();

  return (
    <div className="inline-flex gap-2">
      {languages.map((lng) => (
        <button
          key={lng.code}
          onClick={() => changeLanguage(lng.code)}
          className={`px-2 py-1 rounded border text-sm ${
            language === lng.code
              ? 'bg-primary text-primary-foreground'
              : ''
          }`}
        >
          {lng.name}
        </button>
      ))}
    </div>
  );
}
