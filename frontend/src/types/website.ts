export type Locale = 'ar' | 'en';

export interface Localized<T> {
  ar: T | null;
  en: T | null;
}

export interface ContentBlock<T = unknown> {
  id?: number;
  key: string;
  type: string | null;
  value: Localized<T>;
}

export interface PageContent {
  id: number;
  slug: string;
  title: Localized<string | null>;
  content_blocks: ContentBlock[];
  content: ContentBlock[];
  created_at?: string | null;
  updated_at?: string | null;
}

export interface TeamMemberApi {
  id: number;
  name: Localized<string>;
  position: Localized<string>;
  bio: Localized<string | null>;
  highlights: Localized<string[]>;
  image: string | null;
}

export interface AchievementApi {
  id: number;
  title: Localized<string>;
  number: number;
}

export interface ArticleApi {
  id: number;
  title: Localized<string>;
  tag: Localized<string | null>;
  summary: Localized<string | null>;
  body: Localized<string>;
  slug: string;
  cover_image: string | null;
}
