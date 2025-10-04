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

export type PageStatus = 'draft' | 'preview' | 'published' | 'unlinked';

export interface PageContent {
  id: number;
  slug: string;
  title: Localized<string | null>;
  content_blocks: ContentBlock[];
  content: ContentBlock[];
  status?: PageStatus;
  draft_updated_at?: string | null;
  published_at?: string | null;
  preview_url?: string | null;
  last_edited_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

export interface PageHistoryEntry {
  id: number;
  version: number;
  status: PageStatus;
  created_at: string;
  updated_at?: string | null;
  editor?: string | null;
  notes?: string | null;
}

export interface WebsiteReportSection {
  slug: string;
  title: string;
  status: PageStatus;
  completion: number;
  updated_at: string | null;
}

export interface WebsiteReportSummary {
  completionRate: number;
  completedPages: number;
  totalPages: number;
  pendingDrafts: number;
  lastEditedAt: string | null;
  apiHealthy: boolean;
  sections: WebsiteReportSection[];
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

export interface TestimonialApi {
  id: number;
  name: Localized<string>;
  quote: Localized<string>;
  position: Localized<string | null>;
  avatar: string | null;
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
