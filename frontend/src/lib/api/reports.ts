export const BASE_URL = 'http://127.0.0.1:8000';

export interface SearchCourtData {
  search_degrees: { id: number; degree_value: string; degree_name: string }[];
  search_courts: { id: number; degree_value: string; court_value: string; court_name: string }[];
  search_case_types: { id: number; degree_value: string; court_value: string; case_type_value: string; case_type_name: string }[];
}

export async function fetchSearchCourtData(): Promise<SearchCourtData> {
  const res = await fetch(`${BASE_URL}/api/search-court`);
  if (!res.ok) {
    throw new Error('Failed to load court data');
  }
  return res.json();
}

export interface SearchCourtParams {
  degree: string;
  court: string;
  caseType: string;
  caseYear: string;
  caseNumber: string;
}

export async function searchCourt(params: SearchCourtParams): Promise<string> {
  const res = await fetch('https://search-api.avocat.live/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });
  if (!res.ok) {
    throw new Error('Search failed');
  }
  return res.text();
}

export interface ProcedureSearchParams {
  date_start?: string;
  date_end?: string;
  lawyer_id?: string;
  court_id?: string;
  procedure_type_id?: string;
  status?: string;
}

export async function fetchProcedureOptions() {
  const [typesRes, lawyersRes, courtsRes] = await Promise.all([
    fetch(`${BASE_URL}/api/procedure_types`),
    fetch(`${BASE_URL}/api/lawyers`),
    fetch(`${BASE_URL}/api/courts`),
  ]);
  if (!typesRes.ok || !lawyersRes.ok || !courtsRes.ok) {
    throw new Error('Failed to load options');
  }
  return {
    procedureTypes: await typesRes.json(),
    lawyers: await lawyersRes.json(),
    courts: await courtsRes.json(),
  };
}

export async function searchProcedures(params: ProcedureSearchParams) {
  const url = new URL(`${BASE_URL}/api/procedures-search`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, String(value));
  });
  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error('Failed to fetch procedures');
  }
  return res.json();
}
