import type { LegalCase } from '@/types'

export const casesApi = {
  async create(data: LegalCase): Promise<LegalCase> {
    return { id: 1, ...data }
  },
  async update(id: string | number, data: LegalCase): Promise<LegalCase> {
    return { id, ...data }
  }
}

