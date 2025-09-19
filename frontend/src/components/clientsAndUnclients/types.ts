import type { Client } from '@/types/clients';
import type { Unclient } from '@/types/unclients';

export type ClientFormMode = 'create' | 'edit' | 'view';
export type UnclientFormMode = 'create' | 'edit' | 'view';

export type ClientRecord = Client;
export type UnclientRecord = Unclient;
