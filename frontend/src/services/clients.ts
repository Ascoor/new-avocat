
import { AxiosResponse } from 'axios';
import apiClient from './apiClient';
import { Client } from '@/types';

// Re-export Client type for other modules
export type { Client } from '@/types';

export const getClients = (): Promise<AxiosResponse<{ clients: Client[] }>> =>
  apiClient.get('/api/clients');

export const getUnClients = (): Promise<AxiosResponse<{ clients: Client[] }>> =>
  apiClient.get('/api/unclients');

export const getClientById = (id: string): Promise<AxiosResponse<Client>> =>
  apiClient.get(`/api/clients/${id}`);

export const createClient = (data: Partial<Client>): Promise<AxiosResponse<Client>> =>
  apiClient.post('/api/clients', data);

export const updateClient = (
  id: string,
  data: Partial<Client>
): Promise<AxiosResponse<Client>> => apiClient.put(`/api/clients/${id}`, data);

export const deleteClient = (id: string): Promise<AxiosResponse<void>> =>
  apiClient.delete(`/api/clients/${id}`);

export const updateClientStatus = (
  id: string,
  status: string
): Promise<AxiosResponse<Client>> =>
  apiClient.put(`/api/clients/${id}`, { status });
