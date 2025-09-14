import content from '@/content/site-content.json';

// Validate the shape of the content file to prevent runtime errors
export const ContentGuard = () => {
  // Root-level keys expected
  const requiredRoot = ['hero'] as const;
  for (const key of requiredRoot) {
    if (!(key in content)) {
      throw new Error(`Missing required content key: ${key}`);
    }
  }

  // Sections container
  if (!('sections' in content)) {
    throw new Error(`Missing required content key: sections`);
  }
const requiredSectionKeys = ['about', 'services', 'contact'];

interface SiteContent {
  hero?: unknown;
  sections?: Record<string, unknown>;
}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sections = (content as any).sections || {};
  const data = content as SiteContent;

  if (!('hero' in data)) {
    throw new Error('Missing required content key: hero');
  }

  if (!('sections' in data)) {
    throw new Error('Missing required content key: sections');
  }

  for (const key of requiredSectionKeys) {
    if (!(key in data.sections!)) {
      throw new Error(`Missing required content key in sections: ${key}`);
    }
  }

  return true;
};

export default ContentGuard;
