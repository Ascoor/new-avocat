import api from '@/api/axiosConfig';
import type { PageContent, TeamMemberApi, AchievementApi, Localized } from '@/types/website';

const unwrap = <T>(payload: unknown): T => {
  if (payload && typeof payload === 'object' && 'data' in (payload as Record<string, unknown>)) {
    return (payload as Record<string, unknown>).data as T;
  }

  return payload as T;
};

const unwrapCollection = <T>(payload: unknown): T[] => {
  const data = unwrap<unknown>(payload);
  if (Array.isArray(data)) {
    return data as T[];
  }

  return [];
};

export interface AdminContentBlockPayload {
  key: string;
  type?: string | null;
  value: Localized<unknown>;
}

export interface PageUpdatePayload {
  title_en?: string | null;
  title_ar?: string | null;
  content_blocks?: AdminContentBlockPayload[];
}

export const listWebsitePages = async (): Promise<PageContent[]> => {
  const { data } = await api.get('/api/admin/website/pages');
  return unwrapCollection<PageContent>(data);
};

export const getWebsitePage = async (slug: string): Promise<PageContent> => {
  const { data } = await api.get(`/api/admin/website/pages/${slug}`);
  return unwrap<PageContent>(data);
};

export const updateWebsitePage = async (slug: string, payload: PageUpdatePayload): Promise<PageContent> => {
  const { data } = await api.put(`/api/admin/website/pages/${slug}`, payload);
  return unwrap<PageContent>(data);
};

export const getWebsiteSettings = async (): Promise<PageContent> => getWebsitePage('settings');

export interface TeamMemberInput {
  name_ar: string;
  name_en: string;
  position_ar: string;
  position_en: string;
  bio_ar?: string | null;
  bio_en?: string | null;
  highlights_ar?: string[];
  highlights_en?: string[];
  image?: string | null;
}

export const listTeamMembers = async (): Promise<TeamMemberApi[]> => {
  const { data } = await api.get('/api/website/team');
  return unwrapCollection<TeamMemberApi>(data);
};

export const createTeamMember = async (payload: TeamMemberInput): Promise<TeamMemberApi> => {
  const { data } = await api.post('/api/website/team', payload);
  return unwrap<TeamMemberApi>(data);
};

export const updateTeamMember = async (id: number, payload: TeamMemberInput): Promise<TeamMemberApi> => {
  const { data } = await api.put(`/api/website/team/${id}`, payload);
  return unwrap<TeamMemberApi>(data);
};

export const deleteTeamMember = async (id: number): Promise<void> => {
  await api.delete(`/api/website/team/${id}`);
};

export interface AchievementInput {
  title_ar: string;
  title_en: string;
  number?: number | null;
}

export const listAchievements = async (): Promise<AchievementApi[]> => {
  const { data } = await api.get('/api/website/achievements');
  return unwrapCollection<AchievementApi>(data);
};

export const createAchievement = async (payload: AchievementInput): Promise<AchievementApi> => {
  const { data } = await api.post('/api/website/achievements', payload);
  return unwrap<AchievementApi>(data);
};

export const updateAchievement = async (id: number, payload: AchievementInput): Promise<AchievementApi> => {
  const { data } = await api.put(`/api/website/achievements/${id}`, payload);
  return unwrap<AchievementApi>(data);
};

export const deleteAchievement = async (id: number): Promise<void> => {
  await api.delete(`/api/website/achievements/${id}`);
};
