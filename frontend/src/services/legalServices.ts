import { AxiosResponse } from 'axios';
import apiClient from './apiClient';

export interface Service {
  id: string;
  name: string;
  description: string;
  type?: string;
}

export const getServices = (): Promise<AxiosResponse<{ services: Service[] }>> =>
  apiClient.get('/services');

export const getServiceById = (id: string): Promise<AxiosResponse<Service>> =>
  apiClient.get(`/services/${id}`);

export const createService = (data: Partial<Service>): Promise<AxiosResponse<Service>> =>
  apiClient.post('/services', data);

export const updateService = (
  id: string,
  data: Partial<Service>
): Promise<AxiosResponse<Service>> => apiClient.put(`/services/${id}`, data);

export const deleteService = (id: string): Promise<AxiosResponse<void>> =>
  apiClient.delete(`/services/${id}`);
