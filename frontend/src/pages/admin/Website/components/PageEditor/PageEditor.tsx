import { useEffect, useMemo, useRef } from 'react';
import { useFieldArray, useForm, useWatch } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/components/ui/use-toast';
import BlockManager from '../BlockManager';
import PreviewPane from './PreviewPane';
import type { PageFormValues } from './types';
import usePageManager from '@/hooks/usePageManager';
import type { ContentBlock, Localized } from '@/types/website';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface PageEditorProps {
  slug: string;
  title?: string;
  description?: string;
}

const defaultValues: PageFormValues = {
  title_en: '',
  title_ar: '',
  blocks: [],
};

const serializeValue = (value: unknown, type: string | null | undefined): string => {
  if (type === 'list') {
    if (Array.isArray(value)) {
      return value.join('\n');
    }
    return '';
  }

  if (type === 'json') {
    if (value === null || value === undefined) {
      return '';
    }

    try {
      return JSON.stringify(value, null, 2);
    } catch (error) {
      return String(value ?? '');
    }
  }

  if (Array.isArray(value)) {
    return value.join(', ');
  }

  if (typeof value === 'string') {
    return value;
  }

  if (value === null || value === undefined) {
    return '';
  }

  return String(value);
};

const deserializeValue = (input: string, type: string | null | undefined): unknown => {
  if (type === 'list') {
    return input
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  }

  if (type === 'json') {
    if (!input.trim()) {
      return null;
    }

    return JSON.parse(input);
  }

  const trimmed = input.trim();
  if (!trimmed.length) {
    return null;
  }

  return trimmed;
};

const createFormValues = (page: { content_blocks?: ContentBlock[]; title?: Localized<string | null> } | undefined): PageFormValues => {
  if (!page) {
    return {
      title_en: '',
      title_ar: '',
      blocks: [],
    };
  }

  return {
    title_en: page.title?.en ?? '',
    title_ar: page.title?.ar ?? '',
    blocks: (page.content_blocks ?? []).map((block) => ({
      id: String(block.id ?? block.key ?? Math.random()),
      key: block.key,
      type: block.type ?? 'text',
      value_en: serializeValue(block.value?.en ?? '', block.type),
      value_ar: serializeValue(block.value?.ar ?? '', block.type),
    })),
  };
};

const toContentBlocks = (values: PageFormValues): ContentBlock[] => {
  return values.blocks.map((block, index) => {
    const type = block.type ?? 'text';

    const parseValue = (input: string, fallback: unknown) => {
      try {
        return deserializeValue(input ?? '', type);
      } catch (error) {
        return fallback;
      }
    };

    const valueEn = parseValue(block.value_en ?? '', block.value_en);
    const valueAr = parseValue(block.value_ar ?? '', block.value_ar);

    return {
      key: block.key || `block_${index + 1}`,
      type,
      value: {
        en: valueEn,
        ar: valueAr,
      },
    };
  });
};

const toPayload = (values: PageFormValues) => {
    const contentBlocks = values.blocks.map((block) => {
      const type = block.type ?? 'text';
      const valueEn = deserializeValue(block.value_en ?? '', type);
      const valueAr = deserializeValue(block.value_ar ?? '', type);

    return {
      key: block.key,
      type,
      value: {
        en: valueEn,
        ar: valueAr,
      },
    };
  });

  return {
    title_en: values.title_en ?? null,
    title_ar: values.title_ar ?? null,
    content_blocks: contentBlocks,
  };
};

const formatTimestamp = (input: string | null | undefined) => {
  if (!input) {
    return '—';
  }

  try {
    const date = new Date(input);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  } catch (error) {
    return input;
  }
};

const PageEditor: React.FC<PageEditorProps> = ({ slug, title, description }) => {
  const { toast } = useToast();
  const { page, status, history, isLoading, isSaving, isPublishing, isPreviewing, saveDraft, publish, requestPreview } =
    usePageManager(slug);

  const form = useForm<PageFormValues>({
    defaultValues,
  });

  const fieldArray = useFieldArray({
    control: form.control,
    name: 'blocks',
  });

  const watchedValues = useWatch({ control: form.control }) as PageFormValues | undefined;
  const previewValues = watchedValues ?? defaultValues;
  const previewBlocks = useMemo(() => toContentBlocks(previewValues), [previewValues]);
  const previewTitle = useMemo<Localized<string | null>>(
    () => ({
      en: previewValues.title_en || page?.title?.en || slug,
      ar: previewValues.title_ar || page?.title?.ar || null,
    }),
    [page?.title?.ar, page?.title?.en, previewValues.title_ar, previewValues.title_en, slug],
  );

  const lastSnapshotRef = useRef<string>('');
  const autosaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!page) {
      return;
    }

    const formValues = createFormValues(page);
    form.reset(formValues);
    lastSnapshotRef.current = JSON.stringify(formValues);
  }, [page, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const serialized = JSON.stringify(values);

      if (!serialized || serialized === lastSnapshotRef.current) {
        return;
      }

      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }

      const payload = toPayload(values);
      autosaveTimer.current = setTimeout(() => {
        void saveDraft(payload, { silent: true })
          .then(() => {
            lastSnapshotRef.current = serialized;
          })
          .catch((error) => {
            const message = error instanceof Error ? error.message : 'Failed to autosave changes';
            toast({ title: 'Autosave failed', description: message, variant: 'destructive' });
          });
      }, 2000);
    });

    return () => {
      subscription.unsubscribe();
      if (autosaveTimer.current) {
        clearTimeout(autosaveTimer.current);
      }
    };
  }, [form, saveDraft, toast]);

  const handleManualSave = (values: PageFormValues) => {
    try {
      const missingKey = values.blocks.find((block) => !block.key.trim());
      if (missingKey) {
        toast({ title: 'Each block needs a key', description: 'Please provide a unique key for every block.', variant: 'destructive' });
        return;
      }

      const payload = toPayload(values);
      saveDraft(payload, { status: 'draft' })
        .then(() => {
          toast({ title: 'Draft saved successfully' });
          lastSnapshotRef.current = JSON.stringify(values);
        })
        .catch((error) => {
          const message = error instanceof Error ? error.message : 'Unable to save draft';
          toast({ title: 'Save failed', description: message, variant: 'destructive' });
        });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to prepare payload';
      toast({ title: 'Validation error', description: message, variant: 'destructive' });
    }
  };

  const handlePublish = async () => {
    try {
      await publish();
      toast({ title: 'Page published successfully' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to publish page';
      toast({ title: 'Publish failed', description: message, variant: 'destructive' });
    }
  };

  const handlePreview = async () => {
    try {
      const values = form.getValues();
      const payload = toPayload(values);
      await requestPreview(payload);
      toast({ title: 'Preview link updated' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to generate preview';
      toast({ title: 'Preview failed', description: message, variant: 'destructive' });
    }
  };

  if (!slug) {
    return null;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
      <div className="space-y-6">
        {title || description ? (
          <div className="space-y-1">
            {title ? <h2 className="text-xl font-semibold text-foreground">{title}</h2> : null}
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
        ) : null}

        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
        ) : null}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleManualSave)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Meta information</CardTitle>
                <CardDescription>Control localized page titles for navigation and previews.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title_en"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Page title (EN)</FormLabel>
                      <Input placeholder="Optional English title" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title_ar"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عنوان الصفحة (AR)</FormLabel>
                      <Input dir="rtl" placeholder="عنوان اختياري" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <BlockManager form={form} control={form.control} fields={fieldArray.fields} fieldArray={fieldArray} />

            <CardFooter className="flex items-center justify-end gap-3 border-t bg-muted/30 py-4">
              <Badge variant="outline">Autosaving every 2s when changes detected</Badge>
              <Button type="button" variant="outline" onClick={handlePreview} disabled={isPreviewing}>
                {isPreviewing ? 'Generating preview…' : 'Preview draft'}
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save draft'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </div>

      <div className="space-y-6">
        <PreviewPane
          title={previewTitle}
          blocks={previewBlocks}
          status={status}
          previewUrl={page?.preview_url ?? null}
          isPreviewing={isPreviewing}
          isPublishing={isPublishing}
          onPreview={handlePreview}
          onPublish={handlePublish}
        />

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Version history</CardTitle>
            <CardDescription>Review autosaved versions and published checkpoints.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {history.length === 0 ? (
              <p className="text-sm text-muted-foreground">No previous versions recorded yet.</p>
            ) : (
              history.map((entry) => (
                <div key={entry.id} className="space-y-1 rounded-lg border border-border/60 p-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">v{entry.version}</span>
                      <span className="text-muted-foreground">{entry.status}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{formatTimestamp(entry.updated_at ?? entry.created_at)}</span>
                  </div>
                  {entry.editor ? (
                    <p className="text-xs text-muted-foreground">Edited by {entry.editor}</p>
                  ) : null}
                  {entry.notes ? <p className="text-xs text-muted-foreground">{entry.notes}</p> : null}
                </div>
              ))
            )}
          </CardContent>
          <Separator />
          <CardFooter>
            <p className="text-xs text-muted-foreground">History is sourced from /api/admin/website/pages/{slug}/history.</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PageEditor;
