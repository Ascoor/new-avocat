export interface Procedure {
  id?: string | number;
  title: string;
  note?: string;
}

export const proceduresApi = {
  async create(data: Partial<Procedure>): Promise<Procedure> {
    return { id: 1, title: '', ...data } as Procedure;
  },
  async update(id: string | number, data: Partial<Procedure>): Promise<Procedure> {
    return { id, ...data } as Procedure;
  },
};
