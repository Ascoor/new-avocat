import content from '@/content/site-content.json';

const requiredKeys = ['hero', 'about', 'services', 'contact'];

export const ContentGuard = () => {
  for (const key of requiredKeys) {
    if (!(key in content)) {
      throw new Error(`Missing required content key: ${key}`);
    }
  }
  return true;
};

export default ContentGuard;
