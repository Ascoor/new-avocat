// ----------------------
// أنواع فرعية
// ----------------------
export interface Client {
  id: string;
  name: string;
  phone?: string;
  email?: string;
}

export interface Court {
  id: string;
  name: string;
  city?: string;
}

export interface Lawyer {
  id: string;
  name: string;
  licenseNo?: string;
}

export interface CaseType {
  id: string;
  name: string;
  description?: string;
}

export interface CaseSubType {
  id: string;
  name: string;
  typeId: string; // مرتبط بنوع القضية
}

// ----------------------
// القضايا
// ----------------------
export interface LegalCase {
  id: string;
  slug: string;              // رقم الملف
  title: string;             // موضوع القضية
  status: string;            // الحالة
  client_capacity?: string;  // صفة الموكل
  case_type?: CaseType;
  case_sub_type?: CaseSubType;
  clients?: Client[];
  courts?: Court[];
  lawyers?: Lawyer[];
  createdAt?: string;
  updatedAt?: string;
}

// DTOs (Data Transfer Objects) لعمليات CRUD
export interface LegalCaseCreateDTO {
  slug: string;
  title: string;
  client_capacity?: string;
  case_type?: string;
  case_sub_type?: string;
  clients?: string[];
  courts?: string[];
  lawyers?: string[];
}

export interface LegalCaseUpdateDTO extends Partial<LegalCaseCreateDTO> {}
