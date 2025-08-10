
import { create } from 'zustand';
import { Client } from '../types';
import { getClients, updateClientStatus } from '../services/clients';

interface ClientsState {
  clients: Client[];
  loading: boolean;
  error: string | null;
  fetchClients: () => Promise<void>;
  updateClientStatusAsync: (id: string, status: string) => Promise<void>;
  updateClientStatusInStore: (id: string, status: string) => void;
}

export const useClientsStore = create<ClientsState>((set, get) => ({
  clients: [],
  loading: false,
  error: null,

  fetchClients: async () => {
    set({ loading: true });
    try {
      const response = await getClients();
      set({ clients: response.data.clients, error: null });
    } catch (error) {
      set({ error: 'Error fetching clients' });
    } finally {
      set({ loading: false });
    }
  },

  updateClientStatusInStore: (id, status) => {
    set(state => ({
      clients: state.clients.map(c => 
        c.id === id 
          ? { ...c, status: status as 'active' | 'inactive' } 
          : c
      )
    }));
  },

  updateClientStatusAsync: async (id, status) => {
    try {
      const response = await updateClientStatus(id, status);
      get().updateClientStatusInStore(id, response.data.status);
    } catch (error) {
      console.error('Error updating client status:', error);
    }
  }
}));
