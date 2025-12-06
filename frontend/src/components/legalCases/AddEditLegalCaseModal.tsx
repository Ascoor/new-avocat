import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  getCaseTypes,
  getCaseSubTypes,
} from '@/api/legalCases.service';
import {
  useCreateLegalCase,
  useUpdateLegalCase,
} from '@/hooks/useLegalCases';
import {
  LegalCase,
  CaseType,
  CaseSubType,
  LegalCaseCreateDTO,
} from '@/types/legalCase';
import { cn } from '@/lib/utils';

interface AddEditLegalCaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: LegalCase | null;
}

type FormState = Required<Pick<LegalCaseCreateDTO, 'slug' | 'title'>> &
  Pick<
    LegalCaseCreateDTO,
    | 'description'
    | 'case_type_id'
    | 'case_sub_type_id'
    | 'client_capacity'
    | 'litigants_name'
    | 'litigants_phone'
    | 'litigants_lawyer_name'
    | 'litigants_lawyer_phone'
  >;

const DEFAULT_FORM: FormState = {
  slug: '',
  title: '',
  description: '',
  case_type_id: '',
  case_sub_type_id: '',
  client_capacity: '',
  litigants_name: '',
  litigants_phone: '',
  litigants_lawyer_name: '',
  litigants_lawyer_phone: '',
};

const clientCapacityOptions = [
  { id: 'مدعى عليه', name: 'مدعى عليه' },
  { id: 'مجنى عليه', name: 'مجنى عليه' },
  { id: 'مدعى', name: 'مدعى' },
  { id: 'متهم', name: 'متهم' },
];

const AddEditLegalCaseModal = ({
  isOpen,
  onClose,
  initialData = null,
}: AddEditLegalCaseModalProps) => {
  const { user } = useAuth();
  const { direction, isRTL } = useLanguage();
  const { toast } = useToast();
  const [formState, setFormState] = useState<FormState>(DEFAULT_FORM);
  const [caseTypes, setCaseTypes] = useState<CaseType[]>([]);
  const [caseSubTypes, setCaseSubTypes] = useState<CaseSubType[]>([]);
  const [loadingTypes, setLoadingTypes] = useState(false);

  const createCase = useCreateLegalCase();
  const updateCase = useUpdateLegalCase();

  useEffect(() => {
    if (!isOpen) return;
    const fetchTypes = async () => {
      setLoadingTypes(true);
      try {
        const [{ data: types }, { data: subTypes }] = await Promise.all([
          getCaseTypes(),
          getCaseSubTypes(),
        ]);
        setCaseTypes(types);
        setCaseSubTypes(subTypes);
      } catch (error) {
        console.error('Error fetching case types', error);
        toast({
          title: 'خطأ في تحميل البيانات',
          description: 'تعذر تحميل أنواع القضايا، حاول مرة أخرى لاحقًا.',
          variant: 'destructive',
        });
      } finally {
        setLoadingTypes(false);
      }
    };

    fetchTypes();
  }, [isOpen, toast]);

  useEffect(() => {
    if (initialData && isOpen) {
      setFormState({
        slug: initialData.slug || '',
        title: initialData.title || '',
        description: initialData.description || '',
        case_type_id: initialData.case_type_id || initialData.case_type?.id || '',
        case_sub_type_id:
          initialData.case_sub_type_id || initialData.case_sub_type?.id || '',
        client_capacity: initialData.client_capacity || '',
        litigants_name: initialData.litigants_name || '',
        litigants_phone: initialData.litigants_phone || '',
        litigants_lawyer_name: initialData.litigants_lawyer_name || '',
        litigants_lawyer_phone: initialData.litigants_lawyer_phone || '',
      });
    } else if (!initialData && isOpen) {
      setFormState(DEFAULT_FORM);
    }
  }, [initialData, isOpen]);

  const availableSubTypes = useMemo(() => {
    if (!formState.case_type_id) return caseSubTypes;
    return caseSubTypes.filter(
      (subType) => subType.case_type_id?.toString() === formState.case_type_id,
    );
  }, [caseSubTypes, formState.case_type_id]);

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
      ...(field === 'case_type_id'
        ? { case_sub_type_id: '' }
        : null),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.slug.trim() || !formState.title.trim()) {
      toast({
        title: 'بيانات مطلوبة',
        description: 'رقم الملف وموضوع الدعوى حقول إلزامية.',
        variant: 'destructive',
      });
      return;
    }

    try {
      if (initialData?.id) {
        await updateCase.mutateAsync({
          id: initialData.id,
          data: {
            ...formState,
            updated_by: user?.id,
          },
        });
        toast({ title: 'تم تحديث بيانات القضية بنجاح.' });
      } else {
        await createCase.mutateAsync({
          ...formState,
          created_by: user?.id,
        });
        toast({ title: 'تم إضافة القضية بنجاح.' });
      }
      onClose();
    } catch (error) {
      console.error('Error saving legal case', error);
      toast({
        title: 'تعذر حفظ البيانات',
        description: 'يرجى التحقق من البيانات والمحاولة مرة أخرى.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        dir={direction}
        lang={direction === 'rtl' ? 'ar' : 'en'}
        className={cn(
          'max-w-3xl space-y-4 rounded-2xl border border-border/80 bg-card/95 text-foreground shadow-2xl backdrop-blur',
          'sm:space-y-6'
        )}
      >
        <DialogHeader>
          <DialogTitle className="font-display text-balance text-xl font-semibold leading-tight tracking-tight">
            {initialData ? 'تعديل بيانات القضية' : 'إضافة قضية جديدة'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" dir={direction}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="رقم الملف" required direction={direction}>
              <Input
                value={formState.slug}
                onChange={(event) => handleChange('slug', event.target.value)}
                placeholder="أدخل رقم الملف"
                required
                className="text-sm"
              />
            </Field>
            <Field label="صفة الإدعاء" required direction={direction}>
              <select
                value={formState.client_capacity}
                onChange={(event) => handleChange('client_capacity', event.target.value)}
                className={cn(
                  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30',
                  isRTL ? 'text-right' : 'text-left'
                )}
                required
              >
                <option value="">اختر صفة الإدعاء</option>
                {clientCapacityOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="نوع القضية" required direction={direction}>
              <select
                value={formState.case_type_id}
                onChange={(event) => handleChange('case_type_id', event.target.value)}
                className={cn(
                  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30',
                  isRTL ? 'text-right' : 'text-left'
                )}
                required
                disabled={loadingTypes}
              >
                <option value="">اختر نوع القضية</option>
                {caseTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="نوع القضية الفرعي" required direction={direction}>
              <select
                value={formState.case_sub_type_id}
                onChange={(event) => handleChange('case_sub_type_id', event.target.value)}
                className={cn(
                  'w-full rounded-lg border border-input bg-background px-3 py-2 text-sm transition focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30',
                  isRTL ? 'text-right' : 'text-left'
                )}
                required
                disabled={!formState.case_type_id}
              >
                <option value="">اختر النوع الفرعي</option>
                {availableSubTypes.map((subType) => (
                  <option key={subType.id} value={subType.id}>
                    {subType.name}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="موضوع الدعوى" required direction={direction}>
            <Input
              value={formState.title}
              onChange={(event) => handleChange('title', event.target.value)}
              placeholder="أدخل موضوع الدعوى"
              required
              className="text-sm"
            />
          </Field>

          <Field label="الوصف" direction={direction}>
            <Textarea
              value={formState.description}
              onChange={(event) => handleChange('description', event.target.value)}
              rows={3}
              className="text-sm"
            />
          </Field>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="الخصم" direction={direction}>
              <Input
                value={formState.litigants_name}
                onChange={(event) => handleChange('litigants_name', event.target.value)}
                className="text-sm"
              />
            </Field>
            <Field label="رقم هاتف الخصم" direction={direction}>
              <Input
                value={formState.litigants_phone}
                onChange={(event) => handleChange('litigants_phone', event.target.value)}
                type="tel"
                inputMode="tel"
                className="text-sm"
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="وكيل الخصم" direction={direction}>
              <Input
                value={formState.litigants_lawyer_name}
                onChange={(event) =>
                  handleChange('litigants_lawyer_name', event.target.value)
                }
                className="text-sm"
              />
            </Field>
            <Field label="رقم هاتف وكيل الخصم" direction={direction}>
              <Input
                value={formState.litigants_lawyer_phone}
                onChange={(event) =>
                  handleChange('litigants_lawyer_phone', event.target.value)
                }
                type="tel"
                inputMode="tel"
                className="text-sm"
              />
            </Field>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={onClose}>
              إلغاء
            </Button>
            <Button type="submit" disabled={createCase.isPending || updateCase.isPending}>
              {initialData ? 'تحديث' : 'حفظ'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  direction?: 'ltr' | 'rtl';
}

const Field: React.FC<FieldProps> = ({ label, children, required, direction = 'ltr' }) => (
  <label
    className={cn(
      'flex flex-col gap-2 text-sm font-medium text-foreground',
      direction === 'rtl' ? 'items-end text-right' : 'text-left'
    )}
  >
    <span className="inline-flex items-center gap-1 font-semibold">
      <span className="text-base leading-tight">{label}</span>
      {required && <span className="text-destructive">*</span>}
    </span>
    {children}
  </label>
);

export default AddEditLegalCaseModal;
