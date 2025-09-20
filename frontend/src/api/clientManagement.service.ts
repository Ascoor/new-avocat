import { Client } from '@/types/clients';
import { Unclient } from '@/types/unclients';

const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

const generateSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const now = () => new Date().toISOString();

export type ClientInput = {
  name: string;
  email?: string;
  phone_number?: string;
  address?: string;
  nationality?: string;
  work?: string;
  emergency_number?: string;
  date_of_birth?: string;
  gender: 'ذكر' | 'أنثى';
  religion: 'مسلم' | 'مسيحي';
  identity_number?: string;
  status: 'active' | 'inactive';
};

export type UnclientInput = {
  name: string;
  email?: string;
  phone_number: string;
  address?: string;
  work?: string;
  emergency_number?: string;
  date_of_birth: string;
  gender?: 'ذكر' | 'أنثى';
  religion?: 'مسلم' | 'مسيحي';
  identity_number: string;
};

let clients: Client[] = [
  {
    id: 1,
    slug: 'ahmed-al-harbi',
    name: 'Ahmed Al Harbi',
    email: 'ahmed.harbi@example.com',
    phone_number: '+966501234567',
    address: 'Riyadh, Saudi Arabia',
    nationality: 'Saudi',
    work: 'Entrepreneur',
    emergency_number: '+966501234568',
    date_of_birth: '1985-04-12',
    gender: 'ذكر',
    religion: 'مسلم',
    identity_number: '1012334455',
    status: 'active',
    created_at: '2024-01-10T09:20:00.000Z',
    updated_at: '2024-01-10T09:20:00.000Z'
  },
  {
    id: 2,
    slug: 'noura-al-qahtani',
    name: 'Noura Al Qahtani',
    email: 'noura.qahtani@example.com',
    phone_number: '+966502345678',
    address: 'Jeddah, Saudi Arabia',
    nationality: 'Saudi',
    work: 'Marketing Manager',
    emergency_number: '+966502345679',
    date_of_birth: '1990-09-21',
    gender: 'أنثى',
    religion: 'مسلم',
    identity_number: '1019988776',
    status: 'inactive',
    created_at: '2024-02-05T12:15:00.000Z',
    updated_at: '2024-02-05T12:15:00.000Z'
  }
];

let unclients: Unclient[] = [
  {
    id: 1,
    slug: 'mohammed-salem',
    name: 'Mohammed Salem',
    email: 'm.salem@example.com',
    phone_number: '+966503456789',
    address: 'Dammam, Saudi Arabia',
    work: 'Consultant',
    emergency_number: '+966503456788',
    date_of_birth: '1982-11-02',
    gender: 'ذكر',
    religion: 'مسلم',
    identity_number: '1023344556',
    created_at: '2024-01-20T08:45:00.000Z',
    updated_at: '2024-01-20T08:45:00.000Z'
  },
  {
    id: 2,
    slug: 'sara-hassan',
    name: 'Sara Hassan',
    email: 'sara.hassan@example.com',
    phone_number: '+966504567890',
    address: 'Riyadh, Saudi Arabia',
    work: 'Project Coordinator',
    emergency_number: '+966504567891',
    date_of_birth: '1993-06-15',
    gender: 'أنثى',
    religion: 'مسيحي',
    identity_number: '1024455667',
    created_at: '2024-03-12T14:30:00.000Z',
    updated_at: '2024-03-12T14:30:00.000Z'
  }
];

const clone = <T,>(data: T): T => structuredClone(data);

export const clientManagementService = {
  async listClients(): Promise<Client[]> {
    await delay();
    return clone(clients);
  },

  async getClient(id: number): Promise<Client | undefined> {
    await delay();
    return clone(clients.find(client => client.id === id));
  },

  async createClient(payload: ClientInput): Promise<Client> {
    await delay();

    const id = clients.length ? Math.max(...clients.map(client => client.id)) + 1 : 1;
    const timestamp = now();
    const newClient: Client = {
      id,
      slug: generateSlug(payload.name),
      name: payload.name,
      email: payload.email,
      phone_number: payload.phone_number,
      address: payload.address ?? '',
      nationality: payload.nationality,
      work: payload.work,
      emergency_number: payload.emergency_number,
      date_of_birth: payload.date_of_birth,
      gender: payload.gender,
      religion: payload.religion,
      identity_number: payload.identity_number,
      status: payload.status,
      created_at: timestamp,
      updated_at: timestamp
    };

    clients = [newClient, ...clients];
    return clone(newClient);
  },

  async updateClient(id: number, payload: ClientInput): Promise<Client> {
    await delay();

    const index = clients.findIndex(client => client.id === id);
    if (index === -1) {
      throw new Error('Client not found');
    }

    const updated: Client = {
      ...clients[index],
      ...payload,
      address: payload.address ?? '',
      updated_at: now()
    };

    clients[index] = updated;
    return clone(updated);
  },

  async deleteClient(id: number): Promise<void> {
    await delay();
    clients = clients.filter(client => client.id !== id);
  },

  async listUnclients(): Promise<Unclient[]> {
    await delay();
    return clone(unclients);
  },

  async getUnclient(id: number): Promise<Unclient | undefined> {
    await delay();
    return clone(unclients.find(unclient => unclient.id === id));
  },

  async createUnclient(payload: UnclientInput): Promise<Unclient> {
    await delay();

    const id = unclients.length ? Math.max(...unclients.map(unclient => unclient.id)) + 1 : 1;
    const timestamp = now();
    const newUnclient: Unclient = {
      id,
      slug: generateSlug(payload.name),
      name: payload.name,
      email: payload.email,
      phone_number: payload.phone_number,
      address: payload.address,
      work: payload.work,
      emergency_number: payload.emergency_number,
      date_of_birth: payload.date_of_birth,
      gender: payload.gender,
      religion: payload.religion,
      identity_number: payload.identity_number,
      created_at: timestamp,
      updated_at: timestamp
    };

    unclients = [newUnclient, ...unclients];
    return clone(newUnclient);
  },

  async updateUnclient(id: number, payload: UnclientInput): Promise<Unclient> {
    await delay();

    const index = unclients.findIndex(unclient => unclient.id === id);
    if (index === -1) {
      throw new Error('Unclient not found');
    }

    const updated: Unclient = {
      ...unclients[index],
      ...payload,
      updated_at: now()
    };

    unclients[index] = updated;
    return clone(updated);
  },

  async deleteUnclient(id: number): Promise<void> {
    await delay();
    unclients = unclients.filter(unclient => unclient.id !== id);
  }
};
