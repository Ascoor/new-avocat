import type { ServiceProcedure } from '@/types'

export const createProcedure = async (
  data: Partial<ServiceProcedure>
): Promise<ServiceProcedure> => {
  return { id: 1, title: '', ...data } as ServiceProcedure
}

export const updateProcedure = async (
  id: string | number,
  data: Partial<ServiceProcedure>
): Promise<ServiceProcedure> => {
  return { id, ...data } as ServiceProcedure
}

