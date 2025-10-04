import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import {
  createArticle,
  deleteArticle,
  listArticles,
  updateArticle,
  type ArticleInput,
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
import type { ArticleApi } from '@/types/website';
import UploadMedia from './UploadMedia';
import ConfirmDialog from '@/components/common/ConfirmDialog';

interface ArticleFormValues {
  title_en: string;
  title_ar: string;
  summary_en: string;
  summary_ar: string;
  body_en: string;
  body_ar: string;
  tag_en: string;
  tag_ar: string;
  cover_image: string;
}

const emptyArticle: ArticleFormValues = {
  title_en: '',
  title_ar: '',
  summary_en: '',
  summary_ar: '',
  body_en: '',
  body_ar: '',
  tag_en: '',
  tag_ar: '',
  cover_image: '',
};

const toPayload = (values: ArticleFormValues): ArticleInput => ({
  title_en: values.title_en.trim(),
  title_ar: values.title_ar.trim(),
  summary_en: values.summary_en.trim() || null,
  summary_ar: values.summary_ar.trim() || null,
  body_en: values.body_en.trim(),
  body_ar: values.body_ar.trim(),
  tag_en: values.tag_en.trim() || null,
  tag_ar: values.tag_ar.trim() || null,
  cover_image: values.cover_image.trim() || null,
});

const toFormValues = (article: ArticleApi | null): ArticleFormValues => {
  if (!article) {
    return emptyArticle;
  }

  return {
    title_en: article.title.en ?? '',
    title_ar: article.title.ar ?? '',
    summary_en: article.summary.en ?? '',
    summary_ar: article.summary.ar ?? '',
    body_en: article.body.en ?? '',
    body_ar: article.body.ar ?? '',
    tag_en: article.tag.en ?? '',
    tag_ar: article.tag.ar ?? '',
    cover_image: article.cover_image ?? '',
  };
};

const ArticlesManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const articlesQuery = useQuery({
    queryKey: ['admin-website-articles'],
    queryFn: listArticles,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<ArticleApi | null>(null);
  const [pendingDelete, setPendingDelete] = useState<ArticleApi | null>(null);

  const form = useForm<ArticleFormValues>({
    defaultValues: emptyArticle,
  });

  useEffect(() => {
    form.reset(toFormValues(editingArticle));
  }, [editingArticle, form]);

  const saveMutation = useMutation({
    mutationFn: async ({ id, payload }: { id?: number; payload: ArticleInput }) => {
      if (id) {
        return updateArticle(id, payload);
      }
      return createArticle(payload);
    },
    onSuccess: () => {
      toast({ title: 'Article saved' });
      queryClient.invalidateQueries({ queryKey: ['admin-website-articles'] });
      setDialogOpen(false);
      setEditingArticle(null);
    },
    onError: () => {
      toast({ title: 'Failed to save article', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteArticle(id),
    onSuccess: () => {
      toast({ title: 'Article removed' });
      queryClient.invalidateQueries({ queryKey: ['admin-website-articles'] });
    },
    onError: () => {
      toast({ title: 'Unable to delete article', variant: 'destructive' });
    },
    onSettled: () => setPendingDelete(null),
  });

  const handleSubmit = (values: ArticleFormValues) => {
    const payload = toPayload(values);
    if (!payload.title_en || !payload.title_ar || !payload.body_en || !payload.body_ar) {
      toast({ title: 'Title and body are required in both languages', variant: 'destructive' });
      return;
    }

    const id = editingArticle?.id;
    saveMutation.mutate({ id, payload });
  };

  const handleOpenDialog = (article: ArticleApi | null = null) => {
    setEditingArticle(article);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingArticle(null);
  };

  const articles = useMemo(() => articlesQuery.data ?? [], [articlesQuery.data]);

  return (
    <Card>
      <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-xl font-semibold">Articles</CardTitle>
          <CardDescription>Manage insights and blog entries published on the marketing site.</CardDescription>
        </div>
        <Button type="button" onClick={() => handleOpenDialog(null)}>
          <Plus className="mr-2 h-4 w-4" /> New article
        </Button>
      </CardHeader>
      <CardContent>
        {articlesQuery.isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : articles.length === 0 ? (
          <p className="text-sm text-muted-foreground">No articles found.</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title (EN)</TableHead>
                  <TableHead>العنوان (AR)</TableHead>
                  <TableHead>Tag</TableHead>
                  <TableHead className="w-32 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">{article.title.en}</TableCell>
                    <TableCell>{article.title.ar}</TableCell>
                    <TableCell>{article.tag.en ?? article.tag.ar ?? '—'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(article)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setPendingDelete(article)}>
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
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingArticle ? 'Edit article' : 'Create article'}</DialogTitle>
          </DialogHeader>

          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="title_en">Title (EN)</Label>
                <Input id="title_en" {...form.register('title_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title_ar">العنوان (AR)</Label>
                <Input id="title_ar" dir="rtl" {...form.register('title_ar')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag_en">Tag (EN)</Label>
                <Input id="tag_en" {...form.register('tag_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tag_ar">الوسم (AR)</Label>
                <Input id="tag_ar" dir="rtl" {...form.register('tag_ar')} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="summary_en">Summary (EN)</Label>
                <Textarea id="summary_en" rows={3} {...form.register('summary_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary_ar">الملخص (AR)</Label>
                <Textarea id="summary_ar" rows={3} dir="rtl" {...form.register('summary_ar')} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="body_en">Body (EN)</Label>
                <Textarea id="body_en" rows={8} {...form.register('body_en')} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body_ar">المحتوى (AR)</Label>
                <Textarea id="body_ar" rows={8} dir="rtl" {...form.register('body_ar')} />
              </div>
            </div>

            <div className="space-y-4">
              <UploadMedia
                value={form.watch('cover_image')}
                label="Cover image"
                description="Upload a hero image that will be displayed on the articles grid."
                onChange={(url) => form.setValue('cover_image', url, { shouldDirty: true })}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving…' : 'Save article'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete article"
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

export default ArticlesManager;
