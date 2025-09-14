import { AxiosPromise } from 'axios'
import apiClient from './apiClient'
import type { ServiceProcedure } from '@/types'

export const getServiceProceduresByServiceId = (serviceId: string | number): AxiosPromise<ServiceProcedure[] | { procedures: ServiceProcedure[] }> =>
  apiClient.get(`/service-procedures/${serviceId}`)

export const createServiceProcedure = (data: Partial<ServiceProcedure>): AxiosPromise<ServiceProcedure> =>
  apiClient.post('/service-procedures', data)

export const updateServiceProcedure = (id: string | number, data: Partial<ServiceProcedure>): AxiosPromise<ServiceProcedure> =>
  apiClient.put(`/service-procedures/${id}`, data)

export const deleteServiceProcedure = (procedureId: string | number): AxiosPromise<void> =>
  apiClient.delete(`/service-procedure/${procedureId}`)

export const getServiceTypes = (): AxiosPromise<any> => apiClient.get('/service-types')
export const getServiceTypeById = (id: string | number): AxiosPromise<any> => apiClient.get(`/service-types/${id}`)
export const createServiceType = (data: any): AxiosPromise<any> => apiClient.post('/service-types', data)
export const updateServiceType = (id: string | number, data: any): AxiosPromise<any> => apiClient.put(`/service-types/${id}`, data)
export const deleteServiceType = (id: string | number): AxiosPromise<void> => apiClient.delete(`/service-types/${id}`)
