import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { Unclient } from '@/types/unclients';

const unclientSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
  phone_number: z.string().min(4, { message: 'Phone is required' }),
  address: z.string().optional().or(z.literal('')),
  work: z.string().optional().or(z.literal('')),
  emergency_number: z.string().optional().or(z.literal('')),
  date_of_birth: z.string().min(4, { message: 'Date of birth is required' }),
  gender: z.enum(['ذكر', 'أنثى']).optional().or(z.literal('')),
  religion: z.enum(['مسلم', 'مسيحي']).optional().or(z.literal('')),
  identity_number: z.string().min(4, { message: 'Identity is required' })
});

export type UnclientFormValues = z.infer<typeof unclientSchema>;

interface UnclientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Unclient;
  onSubmit: (values: UnclientFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const UnclientFormDialog = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting = false
}: UnclientFormDialogProps) => {
  const { t } = useLanguage();

  const form = useForm<UnclientFormValues>({
    resolver: zodResolver(unclientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      work: '',
      emergency_number: '',
      date_of_birth: '',
      gender: '',
      religion: '',
      identity_number: ''
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        email: initialData.email ?? '',
        phone_number: initialData.phone_number,
        address: initialData.address ?? '',
        work: initialData.work ?? '',
        emergency_number: initialData.emergency_number ?? '',
        date_of_birth: initialData.date_of_birth,
        gender: initialData.gender ?? '',
        religion: initialData.religion ?? '',
        identity_number: initialData.identity_number
      });
    } else {
      form.reset({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        work: '',
        emergency_number: '',
        date_of_birth: '',
        gender: '',
        religion: '',
        identity_number: ''
      });
    }
  }, [form, initialData]);

  const title = initialData
    ? t('clientManagement.unclients.actions.editTitle')
    : t('clientManagement.unclients.actions.addTitle');
  const description = initialData
    ? t('clientManagement.unclients.actions.editDescription')
    : t('clientManagement.unclients.actions.addDescription');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async values => {
              await onSubmit(values);
            })}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('clientManagement.form.name')}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.email')}</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.phone')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('clientManagement.form.address')}</FormLabel>
                  <FormControl>
                    <Textarea rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="work"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.work')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emergency_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.emergency')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="date_of_birth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.birthDate')}</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="identity_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.identity')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.gender')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('clientManagement.form.genderPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">
                          {t('clientManagement.form.genderNotSet')}
                        </SelectItem>
                        <SelectItem value="ذكر">
                          {t('clientManagement.form.genderMale')}
                        </SelectItem>
                        <SelectItem value="أنثى">
                          {t('clientManagement.form.genderFemale')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.religion')}</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value ?? ''}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('clientManagement.form.religionPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="">
                          {t('clientManagement.form.religionNotSet')}
                        </SelectItem>
                        <SelectItem value="مسلم">
                          {t('clientManagement.form.religionMuslim')}
                        </SelectItem>
                        <SelectItem value="مسيحي">
                          {t('clientManagement.form.religionChristian')}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? t('clientManagement.form.submitting')
                  : t('clientManagement.form.submit')}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UnclientFormDialog;
