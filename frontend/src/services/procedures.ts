import { AxiosPromise } from 'axios'
import apiClient from './apiClient'

export interface Procedure {
  id?: string | number
  title: string
  note?: string
}

export const getProcedures = (): AxiosPromise<Procedure[] | { procedures: Procedure[] }> => apiClient.get('/procedures')
export const getProcedureById = (id: string | number): AxiosPromise<Procedure> => apiClient.get(`/procedures/${id}`)
export const createProcedure = (data: Partial<Procedure>): AxiosPromise<Procedure> => apiClient.post('/procedures', data)
export const updateProcedure = (id: string | number, data: Partial<Procedure>): AxiosPromise<Procedure> => apiClient.put(`/procedures/${id}`, data)
export const deleteProcedure = (id: string | number): AxiosPromise<void> => apiClient.delete(`/procedures/${id}`)
