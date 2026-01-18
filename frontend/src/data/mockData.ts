export interface Case {
  id: string;
  title: string;
  titleAr: string;
  client: string;
  clientAr: string;
  status: 'active' | 'pending' | 'closed' | 'urgent';
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  assigned: string;
  type: string;
  typeAr: string;
  createdAt: string;
  description: string;
  descriptionAr: string;
}

export interface Task {
  id: string;
  title: string;
  titleAr: string;
  caseId: string;
  status: 'todo' | 'inProgress' | 'review' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  assignedTo: string;
  description: string;
  descriptionAr: string;
}

export interface Document {
  id: string;
  name: string;
  nameAr: string;
  caseId: string;
  type: string;
  securityLevel: 'confidential' | 'internal' | 'clientReady';
  uploadedAt: string;
  uploadedBy: string;
  size: string;
  tags: string[];
}

export interface Client {
  id: string;
  name: string;
  nameAr: string;
  company: string;
  companyAr: string;
  email: string;
  phone: string;
  totalCases: number;
  totalBilled: number;
  status: 'active' | 'inactive';
}

export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  caseId: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  issueDate: string;
  dueDate: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  nameAr: string;
  email: string;
  role: 'admin' | 'partner' | 'associate' | 'paralegal' | 'clientViewer';
  avatar: string;
  department: string;
  departmentAr: string;
  activeCases: number;
  tasksCompleted: number;
}

export interface Activity {
  id: string;
  type: 'case_update' | 'document_upload' | 'invoice_issued' | 'task_completed' | 'note_added';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  timestamp: string;
  user: string;
  caseId?: string;
}

// Mock Cases
export const mockCases: Case[] = [
  {
    id: 'CASE-2024-001',
    title: 'Corporate Merger Agreement - TechCorp & InnovateLtd',
    titleAr: 'اتفاقية اندماج الشركات - تيك كورب وإنوفيت المحدودة',
    client: 'TechCorp Industries',
    clientAr: 'صناعات تيك كورب',
    status: 'active',
    priority: 'high',
    deadline: '2024-02-15',
    assigned: 'Sarah Mitchell',
    type: 'Corporate Law',
    typeAr: 'قانون الشركات',
    createdAt: '2024-01-05',
    description: 'Major merger agreement requiring due diligence and regulatory compliance.',
    descriptionAr: 'اتفاقية اندماج كبرى تتطلب العناية الواجبة والامتثال التنظيمي.'
  },
  {
    id: 'CASE-2024-002',
    title: 'Intellectual Property Dispute - Patent Infringement',
    titleAr: 'نزاع الملكية الفكرية - انتهاك براءة الاختراع',
    client: 'Global Pharma Inc.',
    clientAr: 'جلوبال فارما',
    status: 'urgent',
    priority: 'high',
    deadline: '2024-01-25',
    assigned: 'Michael Chen',
    type: 'IP Law',
    typeAr: 'قانون الملكية الفكرية',
    createdAt: '2024-01-10',
    description: 'Defending against patent infringement claims in pharmaceutical sector.',
    descriptionAr: 'الدفاع ضد دعاوى انتهاك براءات الاختراع في قطاع الأدوية.'
  },
  {
    id: 'CASE-2024-003',
    title: 'Employment Dispute Resolution',
    titleAr: 'تسوية نزاع العمل',
    client: 'Sunrise Hotels Group',
    clientAr: 'مجموعة فنادق صن رايز',
    status: 'pending',
    priority: 'medium',
    deadline: '2024-02-28',
    assigned: 'Emma Rodriguez',
    type: 'Employment Law',
    typeAr: 'قانون العمل',
    createdAt: '2024-01-08',
    description: 'Class action employment dispute regarding overtime compensation.',
    descriptionAr: 'نزاع عمالي جماعي بشأن تعويض العمل الإضافي.'
  },
  {
    id: 'CASE-2024-004',
    title: 'Real Estate Development Contract',
    titleAr: 'عقد تطوير عقاري',
    client: 'Metropolitan Developers',
    clientAr: 'المطورون الحضريون',
    status: 'active',
    priority: 'medium',
    deadline: '2024-03-10',
    assigned: 'David Park',
    type: 'Real Estate',
    typeAr: 'العقارات',
    createdAt: '2024-01-12',
    description: 'Drafting and negotiating development contracts for mixed-use project.',
    descriptionAr: 'صياغة والتفاوض على عقود التطوير لمشروع متعدد الاستخدامات.'
  },
  {
    id: 'CASE-2024-005',
    title: 'Securities Compliance Review',
    titleAr: 'مراجعة الامتثال للأوراق المالية',
    client: 'Alpha Investment Fund',
    clientAr: 'صندوق ألفا للاستثمار',
    status: 'active',
    priority: 'high',
    deadline: '2024-02-05',
    assigned: 'Sarah Mitchell',
    type: 'Securities Law',
    typeAr: 'قانون الأوراق المالية',
    createdAt: '2024-01-15',
    description: 'Regulatory compliance review for new investment fund structure.',
    descriptionAr: 'مراجعة الامتثال التنظيمي لهيكل صندوق الاستثمار الجديد.'
  },
  {
    id: 'CASE-2024-006',
    title: 'Trade Secret Litigation',
    titleAr: 'دعوى الأسرار التجارية',
    client: 'Quantum Technologies',
    clientAr: 'كوانتم للتقنيات',
    status: 'active',
    priority: 'high',
    deadline: '2024-01-30',
    assigned: 'Michael Chen',
    type: 'IP Law',
    typeAr: 'قانون الملكية الفكرية',
    createdAt: '2024-01-03',
    description: 'Litigation involving alleged theft of proprietary algorithms.',
    descriptionAr: 'دعوى قضائية تتعلق بسرقة مزعومة لخوارزميات مملوكة.'
  },
  {
    id: 'CASE-2024-007',
    title: 'Joint Venture Agreement - Energy Sector',
    titleAr: 'اتفاقية مشروع مشترك - قطاع الطاقة',
    client: 'Green Energy Partners',
    clientAr: 'شركاء الطاقة الخضراء',
    status: 'pending',
    priority: 'medium',
    deadline: '2024-03-20',
    assigned: 'Emma Rodriguez',
    type: 'Corporate Law',
    typeAr: 'قانون الشركات',
    createdAt: '2024-01-18',
    description: 'Structuring joint venture for renewable energy project.',
    descriptionAr: 'هيكلة مشروع مشترك لمشروع الطاقة المتجددة.'
  },
  {
    id: 'CASE-2024-008',
    title: 'Data Privacy Compliance',
    titleAr: 'الامتثال لخصوصية البيانات',
    client: 'Digital Services Corp',
    clientAr: 'شركة الخدمات الرقمية',
    status: 'active',
    priority: 'medium',
    deadline: '2024-02-20',
    assigned: 'David Park',
    type: 'Privacy Law',
    typeAr: 'قانون الخصوصية',
    createdAt: '2024-01-20',
    description: 'GDPR and data protection compliance assessment.',
    descriptionAr: 'تقييم الامتثال للائحة العامة لحماية البيانات.'
  },
  {
    id: 'CASE-2024-009',
    title: 'Construction Dispute Arbitration',
    titleAr: 'تحكيم نزاع البناء',
    client: 'BuildRight Construction',
    clientAr: 'بيلد رايت للإنشاءات',
    status: 'closed',
    priority: 'low',
    deadline: '2024-01-10',
    assigned: 'Sarah Mitchell',
    type: 'Construction Law',
    typeAr: 'قانون البناء',
    createdAt: '2023-11-15',
    description: 'Arbitration case resolved - contract dispute settled.',
    descriptionAr: 'تم حل قضية التحكيم - تسوية نزاع العقد.'
  },
  {
    id: 'CASE-2024-010',
    title: 'International Trade Agreement',
    titleAr: 'اتفاقية التجارة الدولية',
    client: 'Export Masters LLC',
    clientAr: 'إكسبورت ماسترز',
    status: 'active',
    priority: 'low',
    deadline: '2024-04-01',
    assigned: 'Michael Chen',
    type: 'International Law',
    typeAr: 'القانون الدولي',
    createdAt: '2024-01-22',
    description: 'Cross-border trade agreement with Asian markets.',
    descriptionAr: 'اتفاقية تجارة عبر الحدود مع الأسواق الآسيوية.'
  },
  {
    id: 'CASE-2024-011',
    title: 'Bankruptcy Restructuring',
    titleAr: 'إعادة هيكلة الإفلاس',
    client: 'Legacy Retail Group',
    clientAr: 'مجموعة ليجاسي للتجزئة',
    status: 'urgent',
    priority: 'high',
    deadline: '2024-01-28',
    assigned: 'Emma Rodriguez',
    type: 'Bankruptcy Law',
    typeAr: 'قانون الإفلاس',
    createdAt: '2024-01-02',
    description: 'Chapter 11 restructuring and creditor negotiations.',
    descriptionAr: 'إعادة الهيكلة بموجب الفصل 11 ومفاوضات الدائنين.'
  },
  {
    id: 'CASE-2024-012',
    title: 'Healthcare Regulatory Compliance',
    titleAr: 'الامتثال التنظيمي للرعاية الصحية',
    client: 'MedTech Solutions',
    clientAr: 'حلول ميد تك',
    status: 'active',
    priority: 'medium',
    deadline: '2024-02-25',
    assigned: 'David Park',
    type: 'Healthcare Law',
    typeAr: 'قانون الرعاية الصحية',
    createdAt: '2024-01-14',
    description: 'FDA compliance and medical device regulations.',
    descriptionAr: 'الامتثال لإدارة الغذاء والدواء ولوائح الأجهزة الطبية.'
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    title: 'Review merger documents',
    titleAr: 'مراجعة وثائق الاندماج',
    caseId: 'CASE-2024-001',
    status: 'inProgress',
    priority: 'high',
    dueDate: '2024-01-25',
    assignedTo: 'Sarah Mitchell',
    description: 'Complete review of all merger documentation.',
    descriptionAr: 'إكمال مراجعة جميع وثائق الاندماج.'
  },
  {
    id: 'TASK-002',
    title: 'Prepare court filing',
    titleAr: 'إعداد الملف القضائي',
    caseId: 'CASE-2024-002',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-01-24',
    assignedTo: 'Michael Chen',
    description: 'Draft and prepare court documents.',
    descriptionAr: 'صياغة وإعداد الوثائق القضائية.'
  },
  {
    id: 'TASK-003',
    title: 'Client meeting preparation',
    titleAr: 'التحضير لاجتماع العميل',
    caseId: 'CASE-2024-003',
    status: 'review',
    priority: 'medium',
    dueDate: '2024-01-26',
    assignedTo: 'Emma Rodriguez',
    description: 'Prepare presentation and talking points.',
    descriptionAr: 'إعداد العرض ونقاط النقاش.'
  },
  {
    id: 'TASK-004',
    title: 'Due diligence research',
    titleAr: 'بحث العناية الواجبة',
    caseId: 'CASE-2024-001',
    status: 'inProgress',
    priority: 'high',
    dueDate: '2024-01-28',
    assignedTo: 'David Park',
    description: 'Complete financial and legal due diligence.',
    descriptionAr: 'إكمال العناية الواجبة المالية والقانونية.'
  },
  {
    id: 'TASK-005',
    title: 'Contract draft review',
    titleAr: 'مراجعة مسودة العقد',
    caseId: 'CASE-2024-004',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-01-20',
    assignedTo: 'Sarah Mitchell',
    description: 'Review and mark up contract draft.',
    descriptionAr: 'مراجعة وتعليق على مسودة العقد.'
  },
  {
    id: 'TASK-006',
    title: 'Witness interview',
    titleAr: 'مقابلة الشاهد',
    caseId: 'CASE-2024-006',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-01-27',
    assignedTo: 'Michael Chen',
    description: 'Conduct witness interviews for deposition prep.',
    descriptionAr: 'إجراء مقابلات الشهود للتحضير للإفادة.'
  },
  {
    id: 'TASK-007',
    title: 'Compliance checklist',
    titleAr: 'قائمة التحقق من الامتثال',
    caseId: 'CASE-2024-005',
    status: 'inProgress',
    priority: 'medium',
    dueDate: '2024-01-30',
    assignedTo: 'Emma Rodriguez',
    description: 'Complete regulatory compliance checklist.',
    descriptionAr: 'إكمال قائمة التحقق من الامتثال التنظيمي.'
  },
  {
    id: 'TASK-008',
    title: 'Settlement negotiation',
    titleAr: 'مفاوضات التسوية',
    caseId: 'CASE-2024-003',
    status: 'todo',
    priority: 'high',
    dueDate: '2024-02-01',
    assignedTo: 'David Park',
    description: 'Prepare settlement proposal and negotiate.',
    descriptionAr: 'إعداد مقترح التسوية والتفاوض.'
  },
  {
    id: 'TASK-009',
    title: 'Patent research',
    titleAr: 'بحث براءات الاختراع',
    caseId: 'CASE-2024-002',
    status: 'done',
    priority: 'medium',
    dueDate: '2024-01-18',
    assignedTo: 'Sarah Mitchell',
    description: 'Research prior art and patent history.',
    descriptionAr: 'البحث في الفن السابق وتاريخ براءات الاختراع.'
  },
  {
    id: 'TASK-010',
    title: 'Data mapping exercise',
    titleAr: 'تمرين تعيين البيانات',
    caseId: 'CASE-2024-008',
    status: 'review',
    priority: 'medium',
    dueDate: '2024-02-05',
    assignedTo: 'Michael Chen',
    description: 'Complete data flow mapping for GDPR.',
    descriptionAr: 'إكمال تعيين تدفق البيانات للائحة GDPR.'
  },
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: 'DOC-001',
    name: 'Merger Agreement Draft v3.docx',
    nameAr: 'مسودة اتفاقية الاندماج النسخة 3',
    caseId: 'CASE-2024-001',
    type: 'docx',
    securityLevel: 'confidential',
    uploadedAt: '2024-01-20T10:30:00',
    uploadedBy: 'Sarah Mitchell',
    size: '2.4 MB',
    tags: ['merger', 'draft', 'contract']
  },
  {
    id: 'DOC-002',
    name: 'Patent Filing Documentation.pdf',
    nameAr: 'وثائق تسجيل براءة الاختراع',
    caseId: 'CASE-2024-002',
    type: 'pdf',
    securityLevel: 'confidential',
    uploadedAt: '2024-01-18T14:15:00',
    uploadedBy: 'Michael Chen',
    size: '8.1 MB',
    tags: ['patent', 'filing', 'IP']
  },
  {
    id: 'DOC-003',
    name: 'Employment Records Summary.xlsx',
    nameAr: 'ملخص سجلات التوظيف',
    caseId: 'CASE-2024-003',
    type: 'xlsx',
    securityLevel: 'internal',
    uploadedAt: '2024-01-15T09:00:00',
    uploadedBy: 'Emma Rodriguez',
    size: '1.2 MB',
    tags: ['employment', 'records', 'summary']
  },
  {
    id: 'DOC-004',
    name: 'Due Diligence Report.pdf',
    nameAr: 'تقرير العناية الواجبة',
    caseId: 'CASE-2024-001',
    type: 'pdf',
    securityLevel: 'confidential',
    uploadedAt: '2024-01-22T16:45:00',
    uploadedBy: 'David Park',
    size: '5.7 MB',
    tags: ['due diligence', 'report', 'financial']
  },
  {
    id: 'DOC-005',
    name: 'Client Presentation.pptx',
    nameAr: 'عرض العميل',
    caseId: 'CASE-2024-004',
    type: 'pptx',
    securityLevel: 'clientReady',
    uploadedAt: '2024-01-21T11:30:00',
    uploadedBy: 'Sarah Mitchell',
    size: '3.8 MB',
    tags: ['presentation', 'client', 'meeting']
  },
];

// Mock Clients
export const mockClients: Client[] = [
  {
    id: 'CLIENT-001',
    name: 'John Richardson',
    nameAr: 'جون ريتشاردسون',
    company: 'TechCorp Industries',
    companyAr: 'صناعات تيك كورب',
    email: 'j.richardson@techcorp.com',
    phone: '+1 (555) 123-4567',
    totalCases: 3,
    totalBilled: 245000,
    status: 'active'
  },
  {
    id: 'CLIENT-002',
    name: 'Dr. Lisa Wong',
    nameAr: 'د. ليزا وونغ',
    company: 'Global Pharma Inc.',
    companyAr: 'جلوبال فارما',
    email: 'lwong@globalpharma.com',
    phone: '+1 (555) 234-5678',
    totalCases: 2,
    totalBilled: 180000,
    status: 'active'
  },
  {
    id: 'CLIENT-003',
    name: 'Ahmed Hassan',
    nameAr: 'أحمد حسن',
    company: 'Sunrise Hotels Group',
    companyAr: 'مجموعة فنادق صن رايز',
    email: 'a.hassan@sunrisehotels.com',
    phone: '+971 50 123 4567',
    totalCases: 1,
    totalBilled: 75000,
    status: 'active'
  },
  {
    id: 'CLIENT-004',
    name: 'Maria Santos',
    nameAr: 'ماريا سانتوس',
    company: 'Metropolitan Developers',
    companyAr: 'المطورون الحضريون',
    email: 'm.santos@metrodev.com',
    phone: '+1 (555) 345-6789',
    totalCases: 2,
    totalBilled: 320000,
    status: 'active'
  },
  {
    id: 'CLIENT-005',
    name: 'Robert Kim',
    nameAr: 'روبرت كيم',
    company: 'Alpha Investment Fund',
    companyAr: 'صندوق ألفا للاستثمار',
    email: 'rkim@alphafund.com',
    phone: '+1 (555) 456-7890',
    totalCases: 1,
    totalBilled: 95000,
    status: 'active'
  },
];

// Mock Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'INV-2024-001',
    clientId: 'CLIENT-001',
    clientName: 'TechCorp Industries',
    caseId: 'CASE-2024-001',
    amount: 45000,
    status: 'sent',
    issueDate: '2024-01-15',
    dueDate: '2024-02-15',
    description: 'Legal services - Merger Agreement'
  },
  {
    id: 'INV-2024-002',
    clientId: 'CLIENT-002',
    clientName: 'Global Pharma Inc.',
    caseId: 'CASE-2024-002',
    amount: 32000,
    status: 'paid',
    issueDate: '2024-01-10',
    dueDate: '2024-02-10',
    description: 'IP Litigation - Patent Defense'
  },
  {
    id: 'INV-2024-003',
    clientId: 'CLIENT-003',
    clientName: 'Sunrise Hotels Group',
    caseId: 'CASE-2024-003',
    amount: 18500,
    status: 'overdue',
    issueDate: '2023-12-20',
    dueDate: '2024-01-20',
    description: 'Employment Dispute - Initial Review'
  },
  {
    id: 'INV-2024-004',
    clientId: 'CLIENT-004',
    clientName: 'Metropolitan Developers',
    caseId: 'CASE-2024-004',
    amount: 55000,
    status: 'draft',
    issueDate: '2024-01-22',
    dueDate: '2024-02-22',
    description: 'Real Estate - Contract Negotiation'
  },
  {
    id: 'INV-2024-005',
    clientId: 'CLIENT-005',
    clientName: 'Alpha Investment Fund',
    caseId: 'CASE-2024-005',
    amount: 28000,
    status: 'sent',
    issueDate: '2024-01-18',
    dueDate: '2024-02-18',
    description: 'Securities Compliance Review'
  },
];

// Mock Team Members
export const mockTeamMembers: TeamMember[] = [
  {
    id: 'TEAM-001',
    name: 'Sarah Mitchell',
    nameAr: 'سارة ميتشل',
    email: 's.mitchell@avocat.com',
    role: 'partner',
    avatar: 'SM',
    department: 'Corporate Law',
    departmentAr: 'قانون الشركات',
    activeCases: 4,
    tasksCompleted: 28
  },
  {
    id: 'TEAM-002',
    name: 'Michael Chen',
    nameAr: 'مايكل تشن',
    email: 'm.chen@avocat.com',
    role: 'partner',
    avatar: 'MC',
    department: 'IP & Litigation',
    departmentAr: 'الملكية الفكرية والتقاضي',
    activeCases: 4,
    tasksCompleted: 35
  },
  {
    id: 'TEAM-003',
    name: 'Emma Rodriguez',
    nameAr: 'إيما رودريغيز',
    email: 'e.rodriguez@avocat.com',
    role: 'associate',
    avatar: 'ER',
    department: 'Employment Law',
    departmentAr: 'قانون العمل',
    activeCases: 3,
    tasksCompleted: 22
  },
  {
    id: 'TEAM-004',
    name: 'David Park',
    nameAr: 'ديفيد بارك',
    email: 'd.park@avocat.com',
    role: 'associate',
    avatar: 'DP',
    department: 'Real Estate',
    departmentAr: 'العقارات',
    activeCases: 3,
    tasksCompleted: 19
  },
  {
    id: 'TEAM-005',
    name: 'Lisa Thompson',
    nameAr: 'ليزا طومسون',
    email: 'l.thompson@avocat.com',
    role: 'paralegal',
    avatar: 'LT',
    department: 'Corporate Law',
    departmentAr: 'قانون الشركات',
    activeCases: 0,
    tasksCompleted: 45
  },
  {
    id: 'TEAM-006',
    name: 'James Wilson',
    nameAr: 'جيمس ويلسون',
    email: 'j.wilson@avocat.com',
    role: 'admin',
    avatar: 'JW',
    department: 'Administration',
    departmentAr: 'الإدارة',
    activeCases: 0,
    tasksCompleted: 0
  },
];

// Mock Activities
export const mockActivities: Activity[] = [
  {
    id: 'ACT-001',
    type: 'document_upload',
    title: 'Document uploaded',
    titleAr: 'تم رفع مستند',
    description: 'Merger Agreement Draft v3 uploaded to CASE-2024-001',
    descriptionAr: 'تم رفع مسودة اتفاقية الاندماج النسخة 3 إلى القضية CASE-2024-001',
    timestamp: '2024-01-22T10:30:00',
    user: 'Sarah Mitchell',
    caseId: 'CASE-2024-001'
  },
  {
    id: 'ACT-002',
    type: 'case_update',
    title: 'Case status updated',
    titleAr: 'تم تحديث حالة القضية',
    description: 'CASE-2024-002 marked as urgent',
    descriptionAr: 'تم تعليم القضية CASE-2024-002 كعاجلة',
    timestamp: '2024-01-22T09:15:00',
    user: 'Michael Chen',
    caseId: 'CASE-2024-002'
  },
  {
    id: 'ACT-003',
    type: 'invoice_issued',
    title: 'Invoice issued',
    titleAr: 'تم إصدار فاتورة',
    description: 'Invoice INV-2024-004 drafted for $55,000',
    descriptionAr: 'تم إعداد الفاتورة INV-2024-004 بمبلغ 55,000 دولار',
    timestamp: '2024-01-22T08:45:00',
    user: 'Lisa Thompson'
  },
  {
    id: 'ACT-004',
    type: 'task_completed',
    title: 'Task completed',
    titleAr: 'تم إكمال المهمة',
    description: 'Patent research completed for CASE-2024-002',
    descriptionAr: 'تم إكمال بحث براءات الاختراع للقضية CASE-2024-002',
    timestamp: '2024-01-21T16:30:00',
    user: 'Sarah Mitchell',
    caseId: 'CASE-2024-002'
  },
  {
    id: 'ACT-005',
    type: 'note_added',
    title: 'Note added',
    titleAr: 'تمت إضافة ملاحظة',
    description: 'Client meeting notes added to CASE-2024-003',
    descriptionAr: 'تمت إضافة ملاحظات اجتماع العميل إلى القضية CASE-2024-003',
    timestamp: '2024-01-21T14:00:00',
    user: 'Emma Rodriguez',
    caseId: 'CASE-2024-003'
  },
];

// Chart Data
export const casesByStatusData = [
  { status: 'Active', statusAr: 'نشط', count: 8, fill: 'hsl(var(--success))' },
  { status: 'Pending', statusAr: 'قيد الانتظار', count: 2, fill: 'hsl(var(--warning))' },
  { status: 'Urgent', statusAr: 'عاجل', count: 2, fill: 'hsl(var(--destructive))' },
  { status: 'Closed', statusAr: 'مغلق', count: 1, fill: 'hsl(var(--muted-foreground))' },
];

export const deadlinesTimelineData = [
  { date: 'Jan 24', dateAr: '24 يناير', count: 2 },
  { date: 'Jan 25', dateAr: '25 يناير', count: 3 },
  { date: 'Jan 27', dateAr: '27 يناير', count: 2 },
  { date: 'Jan 28', dateAr: '28 يناير', count: 2 },
  { date: 'Jan 30', dateAr: '30 يناير', count: 2 },
  { date: 'Feb 01', dateAr: '1 فبراير', count: 1 },
  { date: 'Feb 05', dateAr: '5 فبراير', count: 2 },
];

export const revenueData = [
  { month: 'Sep', monthAr: 'سبتمبر', revenue: 185000, billed: 210000 },
  { month: 'Oct', monthAr: 'أكتوبر', revenue: 220000, billed: 245000 },
  { month: 'Nov', monthAr: 'نوفمبر', revenue: 195000, billed: 230000 },
  { month: 'Dec', monthAr: 'ديسمبر', revenue: 280000, billed: 310000 },
  { month: 'Jan', monthAr: 'يناير', revenue: 178500, billed: 205000 },
];

export const teamWorkloadData = [
  { name: 'Sarah M.', nameAr: 'سارة م.', cases: 4, tasks: 8, hours: 145 },
  { name: 'Michael C.', nameAr: 'مايكل ت.', cases: 4, tasks: 10, hours: 168 },
  { name: 'Emma R.', nameAr: 'إيما ر.', cases: 3, tasks: 6, hours: 120 },
  { name: 'David P.', nameAr: 'ديفيد ب.', cases: 3, tasks: 7, hours: 135 },
];