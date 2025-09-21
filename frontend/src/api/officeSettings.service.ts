import api from '@/api/axiosConfig';

export interface ExpenseCategory {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ExpenseCategoryInput {
  name: string;
}

const extractCollection = <T>(raw: unknown): T[] => {
  if (Array.isArray(raw)) {
    if (raw.length === 1 && Array.isArray(raw[0])) {
      return raw[0] as T[];
    }

    if (raw.every((item) => typeof item === 'object' || typeof item === 'string')) {
      return raw as T[];
    }
  }

  if (raw && typeof raw === 'object') {
    const record = raw as Record<string, unknown>;
    if (Array.isArray(record.data)) {
      return record.data as T[];
    }
    if (Array.isArray(record.items)) {
      return record.items as T[];
    }
  }

  return [];
};

export const getExpenseCategories = async (): Promise<ExpenseCategory[]> => {
  const { data } = await api.get('/api/expense_categories');
  return extractCollection<ExpenseCategory>(data);
};

export const createExpenseCategory = async (payload: ExpenseCategoryInput) => {
  const { data } = await api.post('/api/expense_categories', payload);
  return data as ExpenseCategory;
};

export const updateExpenseCategory = async (id: number, payload: ExpenseCategoryInput) => {
  const { data } = await api.put(`/api/expense_categories/${id}`, payload);
  return data as ExpenseCategory;
};

export const deleteExpenseCategory = async (id: number) => {
  await api.delete(`/api/expense_categories/${id}`);
};

