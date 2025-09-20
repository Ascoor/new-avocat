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
import { Client } from '@/types/clients';

const clientSchema = z.object({
  name: z.string().min(2, { message: 'Name is required' }),
  email: z
    .string()
    .email({ message: 'Invalid email' })
    .optional()
    .or(z.literal('')),
  phone_number: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  nationality: z.string().optional().or(z.literal('')),
  work: z.string().optional().or(z.literal('')),
  emergency_number: z.string().optional().or(z.literal('')),
  date_of_birth: z.string().optional().or(z.literal('')),
  gender: z.enum(['ذكر', 'أنثى']),
  religion: z.enum(['مسلم', 'مسيحي']),
  identity_number: z.string().optional().or(z.literal('')),
  status: z.enum(['active', 'inactive'])
});

export type ClientFormValues = z.infer<typeof clientSchema>;

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Client;
  onSubmit: (values: ClientFormValues) => Promise<void> | void;
  isSubmitting?: boolean;
}

const ClientFormDialog = ({
  open,
  onOpenChange,
  initialData,
  onSubmit,
  isSubmitting = false
}: ClientFormDialogProps) => {
  const { t } = useLanguage();

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      address: '',
      nationality: '',
      work: '',
      emergency_number: '',
      date_of_birth: '',
      gender: 'ذكر',
      religion: 'مسلم',
      identity_number: '',
      status: 'active'
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        email: initialData.email ?? '',
        phone_number: initialData.phone_number ?? '',
        address: initialData.address ?? '',
        nationality: initialData.nationality ?? '',
        work: initialData.work ?? '',
        emergency_number: initialData.emergency_number ?? '',
        date_of_birth: initialData.date_of_birth ?? '',
        gender: initialData.gender,
        religion: initialData.religion,
        identity_number: initialData.identity_number ?? '',
        status: initialData.status
      });
    } else {
      form.reset({
        name: '',
        email: '',
        phone_number: '',
        address: '',
        nationality: '',
        work: '',
        emergency_number: '',
        date_of_birth: '',
        gender: 'ذكر',
        religion: 'مسلم',
        identity_number: '',
        status: 'active'
      });
    }
  }, [form, initialData]);

  const title = initialData
    ? t('clientManagement.clients.actions.editTitle')
    : t('clientManagement.clients.actions.addTitle');
  const description = initialData
    ? t('clientManagement.clients.actions.editDescription')
    : t('clientManagement.clients.actions.addDescription');

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
                name="nationality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.nationality')}</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
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
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('clientManagement.form.genderPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('clientManagement.form.religionPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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

            <div className="grid gap-4 sm:grid-cols-2">
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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('clientManagement.form.status')}</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('clientManagement.form.statusPlaceholder')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">{t('status.active')}</SelectItem>
                        <SelectItem value="inactive">{t('status.inactive')}</SelectItem>
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

export default ClientFormDialog;
