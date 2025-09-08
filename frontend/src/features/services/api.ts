import apiClient from '../../services/apiClient';
import type { Service, ServiceProcedure } from '@/types';

export const servicesApi = {
  async getAll(params?: any): Promise<Service[]> {
    const res = await apiClient.get('/services', { params });
    return res.data;
  },
  async getById(id: string): Promise<Service> {
    const res = await apiClient.get(`/services/${id}`);
    return res.data;
  },
  async create(data: Partial<Service>): Promise<Service> {
    const res = await apiClient.post('/services', data);
    return res.data;
  },
  async update(id: string, data: Partial<Service>): Promise<Service> {
    const res = await apiClient.put(`/services/${id}`, data);
    return res.data;
  },
  async remove(id: string): Promise<void> {
    await apiClient.delete(`/services/${id}`);
  },
  async getProceduresByServiceId(serviceId: string): Promise<ServiceProcedure[]> {
    const res = await apiClient.get(`/service-procedures/${serviceId}`);
    return res.data;
  },
  async createProcedure(data: Partial<ServiceProcedure>): Promise<ServiceProcedure> {
    const res = await apiClient.post('/service-procedures', data);
    return res.data;
  },
  async updateProcedure(id: string, data: Partial<ServiceProcedure>): Promise<ServiceProcedure> {
    const res = await apiClient.put(`/service-procedures/${id}`, data);
    return res.data;
  },
  async removeProcedure(id: string): Promise<void> {
    await apiClient.delete(`/service-procedure/${id}`);
  },
  async getServiceTypes(): Promise<any[]> {
    const res = await apiClient.get('/service-types');
    return res.data;
  },
  async getServiceTypeById(id: string): Promise<any> {
    const res = await apiClient.get(`/service-types/${id}`);
    return res.data;
  },
  async createServiceType(data: any): Promise<any> {
    const res = await apiClient.post('/service-types', data);
    return res.data;
  },
  async updateServiceType(id: string, data: any): Promise<any> {
    const res = await apiClient.put(`/service-types/${id}`, data);
    return res.data;
  },
  async removeServiceType(id: string): Promise<void> {
    await apiClient.delete(`/service-types/${id}`);
  }
};
export type { Service, ServiceProcedure };
