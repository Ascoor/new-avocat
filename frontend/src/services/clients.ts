import { AxiosPromise } from 'axios'
import apiClient from '@/services/apiClient'

export interface Client {
  id?: string
  name: string
  identity_number?: string
  address?: string
  phone?: string
  phone_number?: string
  date_of_birth?: string
  email?: string
  relation?: string
  status?: 'active' | 'inactive' | string
  slug?: string
}

export interface Unclient extends Omit<Client, 'relation'> {}

// Clients endpoints
export const getClients = (): AxiosPromise<Client[]> => apiClient.get('/clients')
export const getClientById = (id: string): AxiosPromise<Client> => apiClient.get(`/clients/${id}`)
export const createClient = (data: Partial<Client>): AxiosPromise<Client> => apiClient.post('/clients', data)
export const updateClient = (id: string, data: Partial<Client>): AxiosPromise<Client> => apiClient.put(`/clients/${id}`, data)
export const deleteClient = (id: string): AxiosPromise<void> => apiClient.delete(`/clients/${id}`)

// Unclients endpoints
export const getUnclients = (): AxiosPromise<Unclient[]> => apiClient.get('/unclients')
export const getUnclientById = (id: string): AxiosPromise<Unclient> => apiClient.get(`/unclients/${id}`)
export const createUnclient = (data: Partial<Unclient>): AxiosPromise<Unclient> => apiClient.post('/unclients', data)
export const updateUnclient = (id: string, data: Partial<Unclient>): AxiosPromise<Unclient> => apiClient.put(`/unclients/${id}`, data)
export const deleteUnclient = (id: string): AxiosPromise<void> => apiClient.delete(`/unclients/${id}`)
