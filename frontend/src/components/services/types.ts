import type { ServiceProcedure } from '@/types/service_procedures';

export interface ServiceTypeOption {
  id: string;
  name: string;
}

export interface ServiceAssociation {
  id: string;
  name: string;
}

export interface UserSummary {
  id: number;
  name?: string | null;
  email?: string | null;
}

export interface ServiceRecord {
  id: number;
  slug: string;
  description?: string;
  service_place_name?: string;
  service_year?: string;
  status?: string;
  service_type?: ServiceTypeOption;
  service_type_id?: string;
  clients?: ServiceAssociation[];
  unclients?: ServiceAssociation[];
  procedures?: ServiceProcedure[];
  created_by?: number;
  updated_by?: number;
  createdBy?: UserSummary;
  updatedBy?: UserSummary;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceFormInput {
  slug: string;
  service_type_id: string;
  description: string;
  service_place_name: string;
  service_year: string;
  status: string;
  client_id?: string | null;
  unclient_id?: string | null;
  created_by?: number | string;
  updated_by?: number | string;
}

export type ServiceDialogMode = 'create' | 'edit' | 'view';
