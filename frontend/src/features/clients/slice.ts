import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { clientsApi, Client, ClientsQueryParams, CreateClientRequest, UpdateClientRequest } from './api';

export interface ClientsState {
  clients: Client[];
  currentClient: Client | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: {
    status?: 'active' | 'inactive';
    sortBy?: 'firstName' | 'lastName' | 'createdAt';
    sortOrder?: 'asc' | 'desc';
  };
}

const initialState: ClientsState = {
  clients: [],
  currentClient: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  isLoading: false,
  error: null,
  searchQuery: '',
  filters: {
    sortBy: 'firstName',
    sortOrder: 'asc'
  }
};

// Async thunks
export const fetchClients = createAsyncThunk(
  'clients/fetchClients',
  async (params: ClientsQueryParams = {}, { rejectWithValue, getState }) => {
    try {
      const state = getState() as { clients: ClientsState };
      const queryParams = {
        ...state.clients.filters,
        search: state.clients.searchQuery || undefined,
        ...params
      };
      
      const response = await clientsApi.getClients(queryParams);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch clients');
    }
  }
);

export const fetchClient = createAsyncThunk(
  'clients/fetchClient',
  async (id: string, { rejectWithValue }) => {
    try {
      const client = await clientsApi.getClient(id);
      return client;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch client');
    }
  }
);

export const createClient = createAsyncThunk(
  'clients/createClient',
  async (clientData: CreateClientRequest, { rejectWithValue }) => {
    try {
      const client = await clientsApi.createClient(clientData);
      return client;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create client');
    }
  }
);

export const updateClient = createAsyncThunk(
  'clients/updateClient',
  async ({ id, updates }: { id: string; updates: UpdateClientRequest }, { rejectWithValue }) => {
    try {
      const client = await clientsApi.updateClient(id, updates);
      return client;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to update client');
    }
  }
);

export const deleteClient = createAsyncThunk(
  'clients/deleteClient',
  async (id: string, { rejectWithValue }) => {
    try {
      await clientsApi.deleteClient(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to delete client');
    }
  }
);

// Clients slice
const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ClientsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentClient: (state) => {
      state.currentClient = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch clients
    builder
      .addCase(fetchClients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = action.payload.clients;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Fetch single client
    builder
      .addCase(fetchClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentClient = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Create client
    builder
      .addCase(createClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients.unshift(action.payload);
        state.total += 1;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Update client
    builder
      .addCase(updateClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateClient.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.clients.findIndex(client => client.id === action.payload.id);
        if (index !== -1) {
          state.clients[index] = action.payload;
        }
        if (state.currentClient?.id === action.payload.id) {
          state.currentClient = action.payload;
        }
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

    // Delete client
    builder
      .addCase(deleteClient.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.clients = state.clients.filter(client => client.id !== action.payload);
        state.total -= 1;
        if (state.currentClient?.id === action.payload) {
          state.currentClient = null;
        }
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const {
  setSearchQuery,
  setFilters,
  setPage,
  setLimit,
  clearError,
  clearCurrentClient
} = clientsSlice.actions;

export default clientsSlice.reducer;