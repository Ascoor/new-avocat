import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createService,
  deleteService,
  getServiceById,
  getServices,
  updateService,
} from '@/api/services.service';
import type { ServiceFormInput, ServiceRecord } from '@/components/services/types';

export const useServices = () =>
  useQuery<ServiceRecord[], Error>({
    queryKey: ['services'],
    queryFn: async () => {
      const { data } = await getServices();
      if (Array.isArray(data)) return data as unknown as ServiceRecord[];
      return data.services ?? [];
    },
  });

export const useService = (id?: string) =>
  useQuery<ServiceRecord, Error>({
    queryKey: ['services', id],
    queryFn: async () => {
      const { data } = await getServiceById(String(id));
      return data.service;
    },
    enabled: !!id,
  });

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ServiceFormInput) => createService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ServiceFormInput }) =>
      updateService(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', variables.id] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteService(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', id] });
    },
  });
};
