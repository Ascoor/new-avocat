import { AxiosPromise } from 'axios';
import apiClient from './apiClient';
import { Service } from '@/types';

// Export the type for external use
export type { Service };

export const getServices = (): AxiosPromise<Service[]> => apiClient.get('/services');
export const createService = (data: Partial<Service>): AxiosPromise<Service> => 
  apiClient.post('/service', data);
export const updateService = (id: string, data: Partial<Service>): AxiosPromise<Service> => 
  apiClient.put(`/service/${id}`, data);

// Service procedure types and functions
export interface ServiceProcedure {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  note?: string;
  [key: string]: unknown;
}

export const createServiceProcedure = (data: Partial<ServiceProcedure>): AxiosPromise<ServiceProcedure> => 
  apiClient.post('/service-procedure', data);
export const updateServiceProcedure = (id: string, data: Partial<ServiceProcedure>): AxiosPromise<ServiceProcedure> => 
  apiClient.put(`/service-procedure/${id}`, data);
