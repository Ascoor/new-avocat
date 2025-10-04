import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import {
  createTestimonial,
  deleteTestimonial,
  listTestimonials,
  updateTestimonial,
  type TestimonialInput,
} from '@/api/websiteAdmin.service';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import type { TestimonialApi } from '@/types/website';
import UploadMedia from './UploadMedia';
import ConfirmDialog from '@/components/common/ConfirmDialog';

interface TestimonialFormValues {
  name_en: string;
  name_ar: string;
  quote_en: string;
  quote_ar: string;
  position_en: string;
  position_ar: string;
  avatar: string;
}

const emptyTestimonial: TestimonialFormValues = {
  name_en: '',
  name_ar: '',
  quote_en: '',
  quote_ar: '',
  position_en: '',
  position_ar: '',
  avatar: '',
};

const toPayload = (values: TestimonialFormValues): TestimonialInput => ({
  name_en: values.name_en.trim(),
  name_ar: values.name_ar.trim(),
  quote_en: values.quote_en.trim(),
  quote_ar: values.quote_ar.trim(),
  position_en: values.position_en.trim() || null,
  position_ar: values.position_ar.trim() || null,
  avatar: values.avatar.trim() || null,
});

const toFormValues = (testimonial: TestimonialApi | null): TestimonialFormValues => {
  if (!testimonial) {
    return emptyTestimonial;
  }

  return {
    name_en: testimonial.name.en ?? '',
    name_ar: testimonial.name.ar ?? '',
    quote_en: testimonial.quote.en ?? '',
    quote_ar: testimonial.quote.ar ?? '',
    position_en: testimonial.position.en ?? '',
    position_ar: testimonial.position.ar ?? '',
    avatar: testimonial.avatar ?? '',
  };
};

const TestimonialsManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const testimonialsQuery = useQuery({
    queryKey: ['admin-website-testimonials'],
    queryFn: listTestimonials,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialApi | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TestimonialApi | null>(null);

  const form = useForm<TestimonialFormValues>({
    defaultValues: emptyTestimonial,
  });

  useEffect(() => {
    form.reset(toFormValues(editingTestimonial));
  }, [editingTestimonial, form]);

  const saveMutation = useMutation({
    mutationFn: async ({ id, payload }: { id?: number; payload: TestimonialInput }) => {
      if (id) {
        return updateTestimonial(id, payload);
      }
      return createTestimonial(payload);
    },
    onSuccess: () => {
      toast({ title: 'Testimonial saved' });
      queryClient.invalidateQueries({ queryKey: ['admin-website-testimonials'] });
      setDialogOpen(false);
      setEditingTestimonial(null);
    },
    onError: () => {
      toast({ title: 'Failed to save testimonial', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTestimonial(id),
    onSuccess: () => {
      toast({ title: 'Testimonial removed' });
      queryClient.invalidateQueries({ queryKey: ['admin-website-testimonials'] });
    },
    onError: () => {
      toast({ title: 'Unable to delete testimonial', variant: 'destructive' });
    },
    onSettled: () => setPendingDelete(null),
  });

  const handleSubmit = (values: TestimonialFormValues) => {
    const payload = toPayload(values);
    if (!payload.name_en || !payload.name_ar || !payload.quote_en || !payload.quote_ar) {
      toast({ title: 'Name and quote are required in both languages', variant: 'destructive' });
      return;
    }

    const id = editingTestimonial?.id;
    saveMutation.mutate({ id, payload });
  };

  const handleOpenDialog = (testimonial: TestimonialApi | null = null) => {
    setEditingTestimonial(testimonial);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTestimonial(null);
  };

  const testimonials = useMemo(() => testimonialsQuery.data ?? [], [testimonialsQuery.data]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Testimonials</CardTitle>
          <CardDescription>Manage client stories displayed on the landing page testimonials slider.</CardDescription>
        </div>
        <Button type="button" onClick={() => handleOpenDialog(null)}>
          <Plus className="mr-2 h-4 w-4" /> New testimonial
        </Button>
      </CardHeader>
      <CardContent>
        {testimonialsQuery.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : testimonials.length === 0 ? (
          <p className="text-sm text-muted-foreground">No testimonials found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name (EN)</TableHead>
                  <TableHead>الاسم (AR)</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial.id}>
                    <TableCell className="font-medium">{testimonial.name.en}</TableCell>
                    <TableCell>{testimonial.name.ar}</TableCell>
                    <TableCell>{testimonial.position.en ?? testimonial.position.ar ?? '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(testimonial)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setPendingDelete(testimonial)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingTestimonial ? 'Edit testimonial' : 'Create testimonial'}</DialogTitle>
          </DialogHeader>

          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name_en">Name (EN)</Label>
                <Input id="name_en" {...form.register('name_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name_ar">الاسم (AR)</Label>
                <Input id="name_ar" dir="rtl" {...form.register('name_ar')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position_en">Position (EN)</Label>
                <Input id="position_en" {...form.register('position_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="position_ar">المنصب (AR)</Label>
                <Input id="position_ar" dir="rtl" {...form.register('position_ar')} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quote_en">Quote (EN)</Label>
                <Textarea id="quote_en" rows={4} {...form.register('quote_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="quote_ar">الشهادة (AR)</Label>
                <Textarea id="quote_ar" rows={4} dir="rtl" {...form.register('quote_ar')} />
              </div>
            </div>

            <UploadMedia
              value={form.watch('avatar')}
              label="Avatar image"
              description="Upload a square avatar (512x512 recommended)."
              onChange={(url) => form.setValue('avatar', url, { shouldDirty: true })}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving…' : 'Save testimonial'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete testimonial"
        description="This action cannot be undone."
        confirmLabel="Delete"
        loading={deleteMutation.isPending}
        onConfirm={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
        onOpenChange={(open) => {
          if (!open) {
            setPendingDelete(null);
          }
        }}
      />
    </Card>
  );
};

export default TestimonialsManager;
