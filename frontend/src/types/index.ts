
export interface Client {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  phone_number?: string;
  identity_number: string;
  address: string;
  company?: string;
  notes?: string;
  status: 'active' | 'inactive';
  createdAt: string;
  updatedAt: string;
  // Additional fields for backward compatibility
  date_of_birth?: string;
  gender?: string;
  religion?: string;
  nationality?: string;
  work?: string;
  emergency_number?: string;
  relation?: string;
  slug?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'lawyer' | 'admin' | 'client';
  avatar?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LegalCase {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'closed' | 'pending' | 'on_hold';
  clientId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  court?: string;
  nextHearing?: string;
  caseNumber?: string;
  client?: string;
  assignedLawyer?: string;
  notes?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface Service {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  clientId: string;
  clientName: string;
  createdAt: string;
  updatedAt: string;
  price?: number;
  dueDate?: string;
  slug?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface LegalService extends Service {
  // Alias for backward compatibility
}

export interface Session {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  date: string;
  time: string;
  duration: number;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes?: string;
  type: 'consultation' | 'meeting' | 'court' | 'phone';
  // Additional fields for Sessions page
  caseTitle?: string;
  sessionDate?: string;
  sessionType?: 'consultation' | 'meeting' | 'phone_call' | 'hearing';
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface LegalSession extends Session {
  // Alias for backward compatibility
}

export interface Court {
  id: string;
  name: string;
  type: string;
  location: string;
  contact?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface Procedure {
  id: number;
  title: string;
  note?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface ServiceProcedure {
  id: string;
  title: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  serviceId: string;
  createdAt: string;
  updatedAt: string;
  note?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface LegalAd {
  id: number;
  description: string;
  status: string;
  sendDate?: string;
  receiveDate?: string;
  [key: string]: unknown; // Index signature for GlobalTable compatibility
}

export interface Report {
  id: string;
  title: string;
  type: 'cases' | 'services' | 'sessions' | 'procedures' | 'ads';
  createdAt: string;
  data: unknown;
}
