export interface CaseFormData {
  id?: string;
  title: string;
  caseNumber: string;
  client: string;
  status: 'pending' | 'active' | 'closed' | 'on_hold';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  nextHearing: string;
  assignedLawyer: string;
  notes: string;
}

export interface SessionFormData {
  id?: string;
  caseTitle: string;
  clientName: string;
  sessionDate: string; // YYYY-MM-DD
  sessionTime: string; // HH:mm
  duration: number;
  sessionType: 'consultation' | 'hearing' | 'meeting' | 'phone_call';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no_show';
  notes: string;
}

export interface ListResponse<T> {
  [key: string]: T[];
}
