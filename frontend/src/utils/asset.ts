import API_CONFIG from '@/config/config';

export function resolveAssetUrl(path?: string | null): string | undefined {
  if (!path) {
    return undefined;
  }

  if (/^(?:https?:)?\/\//.test(path) || path.startsWith('data:')) {
    return path;
  }

  const baseUrl = API_CONFIG.baseURL.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;

  return `${baseUrl}${normalized}`;
}
