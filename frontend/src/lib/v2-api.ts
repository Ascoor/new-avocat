import type { Client } from '@/types/clients';
import type { LegalCase, LegalAd, Procedure, LegalSession } from '@/types/legalCase';
import type { ServiceRecord } from '@/components/services/types';

import { getClients } from '@/api/clients.service';
import { getLegCases } from '@/api/legalCases.service';
import { getServices, getServiceById } from '@/api/services.service';
import { getProceduresByLegCaseId } from '@/api/procedures.service';
import { getSessionsByLegCaseId } from '@/api/sessions.service';
import { getLegalAdsByLegCaseId } from '@/api/legalAds.service';

export const fetchClients = async (): Promise<Client[]> => {
  const response = await getClients();
  return response.data;
};

export const fetchLegalCases = async (): Promise<LegalCase[]> => {
  const response = await getLegCases();
  return response.data ?? [];
};

export const fetchServices = async (): Promise<ServiceRecord[]> => {
  const response = await getServices();
  return response.data?.services ?? [];
};

export const fetchServiceDetail = async (serviceId: string) => {
  const response = await getServiceById(serviceId);
  return response.data?.service ?? null;
};

export const fetchCaseProcedures = async (caseId: string): Promise<Procedure[]> => {
  const response = await getProceduresByLegCaseId(caseId);
  return response.data ?? [];
};

export const fetchCaseSessions = async (caseId: string): Promise<LegalSession[]> => {
  const response = await getSessionsByLegCaseId(caseId);
  return response.data?.data ?? [];
};

export const fetchCaseAds = async (caseId: string): Promise<LegalAd[]> => {
  const response = await getLegalAdsByLegCaseId(caseId);
  return response.data ?? [];
};
