import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLegCases,
  getLegCaseById,
  createLegCase,
  updateLegCase,
  deleteLegCase,
} from "@/api/legalCases.service";
import { LegalCase, LegalCaseCreateDTO, LegalCaseUpdateDTO } from "@/types/legalCase";

// 🟢 fetch all cases
export const useLegalCases = () =>
  useQuery<LegalCase[], Error>({
    queryKey: ["legal-cases"],
    queryFn: async () => {
      const { data } = await getLegCases();
      return data;
    },
  });

// 🟢 fetch one case by id
export const useLegalCase = (id: string) =>
  useQuery<LegalCase, Error>({
    queryKey: ["legal-cases", id],
    queryFn: async () => {
      const { data } = await getLegCaseById(id);
      return data;
    },
    enabled: !!id,
  });

// 🟡 create case
export const useCreateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCase: LegalCaseCreateDTO) => createLegCase(newCase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};

// 🟡 update case
export const useUpdateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LegalCaseUpdateDTO }) =>
      updateLegCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};

// 🔴 delete case
export const useDeleteLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLegCase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getLegCases,
  getLegCaseById,
  createLegCase,
  updateLegCase,
  deleteLegCase,
} from "@/api/legalCases.service";
import { LegalCase, LegalCaseCreateDTO, LegalCaseUpdateDTO } from "@/types/legalCase";

// 🟢 fetch all cases
export const useLegalCases = () =>
  useQuery<LegalCase[], Error>({
    queryKey: ["legal-cases"],
    queryFn: async () => {
      const { data } = await getLegCases();
      return data;
    },
  });

// 🟢 fetch one case by id
export const useLegalCase = (id: string) =>
  useQuery<LegalCase, Error>({
    queryKey: ["legal-cases", id],
    queryFn: async () => {
      const { data } = await getLegCaseById(id);
      return data;
    },
    enabled: !!id,
  });

// 🟡 create case
export const useCreateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newCase: LegalCaseCreateDTO) => createLegCase(newCase),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};

// 🟡 update case
export const useUpdateLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: LegalCaseUpdateDTO }) =>
      updateLegCase(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};

// 🔴 delete case
export const useDeleteLegalCase = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteLegCase(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["legal-cases"] });
    },
  });
};

