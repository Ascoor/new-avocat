import { useLanguage } from '@/contexts/LanguageContext';
import siteContent from '@/content/site-content.json';

export const useI18n = () => {
  const { language } = useLanguage();

  const t = (path: string): string => {
    const keys = path.split('.');
    let current: any = siteContent;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return path; // Return the key if not found
      }
    }
    
    // If it's an object with language keys, return the appropriate language
    if (current && typeof current === 'object' && language in current) {
      return current[language];
    }
    
    return current || path;
  };

  const getArray = (path: string): string[] => {
    const result = t(path);
    return Array.isArray(result) ? result : [];
  };

  const getLocalizedArray = (path: string): string[] => {
    const keys = path.split('.');
    let current: any = siteContent;
    
    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        return [];
      }
    }
    
    if (current && typeof current === 'object' && language in current) {
      return Array.isArray(current[language]) ? current[language] : [];
    }
    
    return Array.isArray(current) ? current : [];
  };

  return { t, getArray, getLocalizedArray, language };
};