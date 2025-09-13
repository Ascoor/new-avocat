export interface Client {
  id?: string;
  name: string;
  identity_number?: string;
  address?: string;
  phone?: string;
  phone_number?: string;
  date_of_birth?: string;
  email?: string;
  relation?: string;
}

export const clientsApi = {
  async createClient(data: Partial<Client>): Promise<Client> {
    return { id: '1', name: '', ...data } as Client;
  },
  async updateClient(id: string, data: Partial<Client>): Promise<Client> {
    return { id, ...data } as Client;
  },
};
