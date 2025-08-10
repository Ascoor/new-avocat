import apiClient from '../../shared/libs/axios';

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  notes?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientRequest {
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  address?: string;
  nationalId?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female';
  notes?: string;
}

export interface UpdateClientRequest extends Partial<CreateClientRequest> {
  status?: 'active' | 'inactive';
}

export interface ClientsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  sortBy?: 'firstName' | 'lastName' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ClientsResponse {
  clients: Client[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Clients API
export const clientsApi = {
  /**
   * Get all clients with pagination and filters
   */
  async getClients(params: ClientsQueryParams = {}): Promise<ClientsResponse> {
    const response = await apiClient.get('/api/clients', { params });
    return response.data;
  },

  /**
   * Get single client by ID
   */
  async getClient(id: string): Promise<Client> {
    const response = await apiClient.get(`/api/clients/${id}`);
    return response.data;
  },

  /**
   * Create new client
   */
  async createClient(clientData: CreateClientRequest): Promise<Client> {
    const response = await apiClient.post('/api/clients', clientData);
    return response.data;
  },

  /**
   * Update existing client
   */
  async updateClient(id: string, updates: UpdateClientRequest): Promise<Client> {
    const response = await apiClient.put(`/api/clients/${id}`, updates);
    return response.data;
  },

  /**
   * Delete client
   */
  async deleteClient(id: string): Promise<void> {
    await apiClient.delete(`/api/clients/${id}`);
  },

  /**
   * Search clients by name or email
   */
  async searchClients(query: string): Promise<Client[]> {
    const response = await apiClient.get(`/api/clients/search`, {
      params: { q: query }
    });
    return response.data;
  }
};