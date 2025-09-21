import { useEffect, useMemo, useState } from 'react';
import { Building2, Pencil, Plus, Settings2, Trash2 } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import PageHeader from '@/components/common/PageHeader';
import ConfirmDialog from '@/components/common/ConfirmDialog';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import {
  createExpenseCategory,
  deleteExpenseCategory,
  getExpenseCategories,
  updateExpenseCategory,
  type ExpenseCategory,
} from '@/api/officeSettings.service';

const ITEMS_PER_PAGE = 5;

type ExpenseCategoryDialogMode = 'create' | 'edit';

const ExpenseCategoriesSection = () => {
  const { t, isRTL } = useLanguage();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<ExpenseCategoryDialogMode>('create');
  const [selectedCategory, setSelectedCategory] = useState<ExpenseCategory | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ExpenseCategory | null>(null);
  const [page, setPage] = useState(1);
  const [name, setName] = useState('');

  const expenseCategoriesQuery = useQuery({
    queryKey: ['expense-categories'],
    queryFn: getExpenseCategories,
  });

  const categories = useMemo(
    () => expenseCategoriesQuery.data ?? [],
    [expenseCategoriesQuery.data],
  );

  const totalPages = Math.max(1, Math.ceil(categories.length / ITEMS_PER_PAGE));
  const paginatedCategories = useMemo(
    () => categories.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE),
    [categories, page],
  );

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const handleOpenDialog = (mode: ExpenseCategoryDialogMode, category?: ExpenseCategory | null) => {
    setDialogMode(mode);
    setSelectedCategory(category ?? null);
    setName(category?.name ?? '');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCategory(null);
    setName('');
  };

  const createMutation = useMutation({
    mutationFn: createExpenseCategory,
    onSuccess: () => {
      toast({ title: t('officeSettings.expenseCategories.messages.createSuccess') });
      queryClient.invalidateQueries({ queryKey: ['expense-categories'] });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: t('officeSettings.expenseCategories.messages.saveErrorTitle'),
        description: t('officeSettings.expenseCategories.messages.saveErrorDescription'),
        variant: 'destructive',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (payload: { id: number; name: string }) => updateExpenseCategory(payload.id, { name: payload.name }),
    onSuccess: () => {
      toast({ title: t('officeSettings.expenseCategories.messages.updateSuccess') });
      queryClient.invalidateQueries({ queryKey: ['expense-categories'] });
      handleCloseDialog();
    },
    onError: () => {
      toast({
        title: t('officeSettings.expenseCategories.messages.saveErrorTitle'),
        description: t('officeSettings.expenseCategories.messages.saveErrorDescription'),
        variant: 'destructive',
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteExpenseCategory(id),
    onSuccess: () => {
      toast({ title: t('officeSettings.expenseCategories.messages.deleteSuccess') });
      queryClient.invalidateQueries({ queryKey: ['expense-categories'] });
    },
    onError: () => {
      toast({
        title: t('officeSettings.expenseCategories.messages.deleteErrorTitle'),
        description: t('officeSettings.expenseCategories.messages.deleteErrorDescription'),
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setPendingDelete(null);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim()) {
      return;
    }

    if (dialogMode === 'edit' && selectedCategory) {
      updateMutation.mutate({ id: selectedCategory.id, name: name.trim() });
    } else {
      createMutation.mutate({ name: name.trim() });
    }
  };

  const handleDelete = (category: ExpenseCategory) => {
    setPendingDelete(category);
  };

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  return (
    <Card className="overflow-hidden">
      <CardHeader
        className={cn(
          'gap-2 sm:flex-row sm:items-center sm:justify-between',
          isRTL ? 'text-right sm:flex-row-reverse' : 'text-left',
        )}
      >
        <div className="space-y-1">
          <CardTitle className="text-xl font-semibold">
            {t('officeSettings.expenseCategories.title')}
          </CardTitle>
          <CardDescription>{t('officeSettings.expenseCategories.description')}</CardDescription>
        </div>
        <Button type="button" onClick={() => handleOpenDialog('create')}>
          <Plus className="h-4 w-4" />
          <span>{t('officeSettings.expenseCategories.add')}</span>
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="rounded-lg border border-border/60">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className={cn('w-2/3', isRTL ? 'text-right' : 'text-left')}>
                  {t('officeSettings.expenseCategories.table.name')}
                </TableHead>
                <TableHead className={cn('w-1/3', isRTL ? 'text-left' : 'text-right')}>
                  {t('officeSettings.expenseCategories.table.actions')}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseCategoriesQuery.isLoading ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    {t('common.loading')}
                  </TableCell>
                </TableRow>
              ) : expenseCategoriesQuery.isError ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-destructive">
                    {t('officeSettings.expenseCategories.table.error')}
                  </TableCell>
                </TableRow>
              ) : paginatedCategories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center text-muted-foreground">
                    {t('officeSettings.expenseCategories.table.empty')}
                  </TableCell>
                </TableRow>
              ) : (
                paginatedCategories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className={cn('font-medium', isRTL ? 'text-right' : 'text-left')}>
                      {category.name}
                    </TableCell>
                    <TableCell className={cn(isRTL ? 'text-left' : 'text-right')}>
                      <div
                        className={cn(
                          'flex items-center gap-2',
                          isRTL ? 'justify-start' : 'justify-end',
                        )}
                      >
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleOpenDialog('edit', category)}
                        >
                          <Pencil className="h-4 w-4" />
                          <span className="text-sm">{t('common.edit')}</span>
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(category)}
                          disabled={deleteMutation.isPending && pendingDelete?.id === category.id}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="text-sm">{t('common.delete')}</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div
          className={cn(
            'flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between',
            isRTL ? 'sm:flex-row-reverse' : '',
          )}
        >
          <span>
            {t('officeSettings.expenseCategories.pagination.label', {
              current: page,
              total: totalPages,
            })}
          </span>
          <div className={cn('flex items-center gap-2', isRTL ? 'flex-row-reverse' : '')}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={page === 1}
            >
              {t('table.previous')}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={page === totalPages}
            >
              {t('table.next')}
            </Button>
          </div>
        </div>
      </CardContent>

      <Dialog open={dialogOpen} onOpenChange={(open) => (!open ? handleCloseDialog() : setDialogOpen(open))}>
        <DialogContent dir={isRTL ? 'rtl' : 'ltr'}>
          <DialogHeader className={isRTL ? 'text-right' : 'text-left'}>
            <DialogTitle>
              {dialogMode === 'edit'
                ? t('officeSettings.expenseCategories.dialog.editTitle')
                : t('officeSettings.expenseCategories.dialog.createTitle')}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="expense-category-name">
                {t('officeSettings.expenseCategories.form.nameLabel')}
              </Label>
              <Input
                id="expense-category-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={t('officeSettings.expenseCategories.form.namePlaceholder')}
                autoFocus
              />
            </div>
            <DialogFooter
              className={cn(
                'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:gap-2',
                isRTL ? 'sm:flex-row-reverse sm:space-x-reverse' : '',
              )}
            >
              <Button type="button" variant="outline" onClick={handleCloseDialog} disabled={isSubmitting}>
                {t('common.cancel')}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {dialogMode === 'edit'
                  ? t('officeSettings.expenseCategories.form.submitUpdate')
                  : t('officeSettings.expenseCategories.form.submitCreate')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title={t('officeSettings.expenseCategories.delete.title', {
          name: pendingDelete?.name ?? '',
        })}
        description={t('officeSettings.expenseCategories.delete.description')}
        confirmLabel={t('common.delete')}
        cancelLabel={t('common.cancel')}
        onConfirm={() => pendingDelete && deleteMutation.mutate(pendingDelete.id)}
        onClose={() => setPendingDelete(null)}
      />
    </Card>
  );
};

const PlaceholderSection = ({ section }: { section: 'generalSettings' | 'serviceTypes' | 'procedurePlaceTypes' | 'procedureTypes' }) => {
  const { t, isRTL } = useLanguage();

  return (
    <Card className="overflow-hidden">
      <CardHeader className={cn('space-y-2', isRTL ? 'text-right' : 'text-left')}>
        <CardTitle>{t(`officeSettings.placeholders.${section}.title`)}</CardTitle>
        <CardDescription>{t(`officeSettings.placeholders.${section}.description`)}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-dashed border-muted-foreground/40 bg-muted/30 p-8 text-center text-sm text-muted-foreground">
          {t('officeSettings.placeholders.shared.message')}
        </div>
      </CardContent>
    </Card>
  );
};

const OfficeSettingsPage = () => {
  const { t, isRTL } = useLanguage();
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['expense-categories'] });
  };

  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      <PageHeader
        icon={<Building2 className="h-6 w-6" />}
        title={t('officeSettings.title')}
        subtitle={t('officeSettings.subtitle')}
        actions={
          <Button type="button" variant="outline" onClick={handleRefresh}>
            <Settings2 className="h-4 w-4" />
            <span>{t('officeSettings.actions.refresh')}</span>
          </Button>
        }
      />

      <Tabs defaultValue="expenseCategories" dir={isRTL ? 'rtl' : 'ltr'} className="space-y-6">
        <TabsList
          className={cn(
            'flex w-full flex-wrap gap-2 rounded-md border border-border/60 bg-muted/40 p-1',
            isRTL ? 'justify-end' : 'justify-start',
          )}
        >
          <TabsTrigger value="expenseCategories" className="flex-1 sm:flex-none">
            {t('officeSettings.tabs.expenseCategories')}
          </TabsTrigger>
          <TabsTrigger value="generalSettings" className="flex-1 sm:flex-none">
            {t('officeSettings.tabs.generalSettings')}
          </TabsTrigger>
          <TabsTrigger value="serviceTypes" className="flex-1 sm:flex-none">
            {t('officeSettings.tabs.serviceTypes')}
          </TabsTrigger>
          <TabsTrigger value="procedurePlaceTypes" className="flex-1 sm:flex-none">
            {t('officeSettings.tabs.procedurePlaceTypes')}
          </TabsTrigger>
          <TabsTrigger value="procedureTypes" className="flex-1 sm:flex-none">
            {t('officeSettings.tabs.procedureTypes')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="expenseCategories">
          <ExpenseCategoriesSection />
        </TabsContent>
        <TabsContent value="generalSettings">
          <PlaceholderSection section="generalSettings" />
        </TabsContent>
        <TabsContent value="serviceTypes">
          <PlaceholderSection section="serviceTypes" />
        </TabsContent>
        <TabsContent value="procedurePlaceTypes">
          <PlaceholderSection section="procedurePlaceTypes" />
        </TabsContent>
        <TabsContent value="procedureTypes">
          <PlaceholderSection section="procedureTypes" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OfficeSettingsPage;
