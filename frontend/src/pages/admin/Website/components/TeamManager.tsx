import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import {
  createTeamMember,
  deleteTeamMember,
  listTeamMembers,
  updateTeamMember,
  type TeamMemberInput,
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
import ConfirmDialog from '@/components/common/ConfirmDialog';
import type { TeamMemberApi } from '@/types/website';
import { useToast } from '@/components/ui/use-toast';

interface TeamMemberFormValues {
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  bio_en: string;
  bio_ar: string;
  highlights_en: string;
  highlights_ar: string;
  image: string;
}

const emptyMember: TeamMemberFormValues = {
  name_en: '',
  name_ar: '',
  position_en: '',
  position_ar: '',
  bio_en: '',
  bio_ar: '',
  highlights_en: '',
  highlights_ar: '',
  image: '',
};

const toInputPayload = (values: TeamMemberFormValues): TeamMemberInput => ({
  name_en: values.name_en.trim(),
  name_ar: values.name_ar.trim(),
  position_en: values.position_en.trim(),
  position_ar: values.position_ar.trim(),
  bio_en: values.bio_en.trim() || null,
  bio_ar: values.bio_ar.trim() || null,
  highlights_en: values.highlights_en
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0),
  highlights_ar: values.highlights_ar
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0),
  image: values.image.trim() || null,
});

const toFormValues = (member: TeamMemberApi | null): TeamMemberFormValues => {
  if (!member) {
    return emptyMember;
  }

  return {
    name_en: member.name.en ?? '',
    name_ar: member.name.ar ?? '',
    position_en: member.position.en ?? '',
    position_ar: member.position.ar ?? '',
    bio_en: member.bio.en ?? '',
    bio_ar: member.bio.ar ?? '',
    highlights_en: (member.highlights.en ?? []).join('\n'),
    highlights_ar: (member.highlights.ar ?? []).join('\n'),
    image: member.image ?? '',
  };
};

const TeamManager: React.FC = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const teamQuery = useQuery({
    queryKey: ['admin-team-members'],
    queryFn: listTeamMembers,
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberApi | null>(null);
  const [pendingDelete, setPendingDelete] = useState<TeamMemberApi | null>(null);

  const form = useForm<TeamMemberFormValues>({
    defaultValues: emptyMember,
  });

  useEffect(() => {
    form.reset(toFormValues(editingMember));
  }, [editingMember, form]);

  const saveMutation = useMutation({
    mutationFn: async ({ id, payload }: { id?: number; payload: TeamMemberInput }) => {
      if (id) {
        return updateTeamMember(id, payload);
      }
      return createTeamMember(payload);
    },
    onSuccess: () => {
      toast({ title: 'Team member saved' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
      setDialogOpen(false);
      setEditingMember(null);
    },
    onError: () => {
      toast({ title: 'Failed to save team member', variant: 'destructive' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTeamMember(id),
    onSuccess: () => {
      toast({ title: 'Team member removed' });
      queryClient.invalidateQueries({ queryKey: ['admin-team-members'] });
    },
    onError: () => {
      toast({ title: 'Unable to delete team member', variant: 'destructive' });
    },
    onSettled: () => setPendingDelete(null),
  });

  const handleSubmit = (values: TeamMemberFormValues) => {
    const payload = toInputPayload(values);
    const id = editingMember?.id;
    if (!payload.name_en || !payload.name_ar) {
      toast({ title: 'Name is required in both languages', variant: 'destructive' });
      return;
    }

    saveMutation.mutate({ id, payload });
  };

  const handleOpenDialog = (member: TeamMemberApi | null = null) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingMember(null);
  };

  const members = useMemo(() => teamQuery.data ?? [], [teamQuery.data]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">Leadership team</CardTitle>
            <CardDescription>Manage the team members showcased on the landing page.</CardDescription>
          </div>
          <Button type="button" onClick={() => handleOpenDialog(null)}>
            <Plus className="mr-2 h-4 w-4" /> Add member
          </Button>
        </CardHeader>
        <CardContent>
          {teamQuery.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          ) : members.length === 0 ? (
            <p className="text-sm text-muted-foreground">No team members found.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name (EN)</TableHead>
                    <TableHead>اسم (AR)</TableHead>
                    <TableHead>Role (EN)</TableHead>
                    <TableHead className="w-32 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name.en}</TableCell>
                      <TableCell dir="rtl">{member.name.ar}</TableCell>
                      <TableCell>{member.position.en}</TableCell>
                      <TableCell className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => handleOpenDialog(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          onClick={() => setPendingDelete(member)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onOpenChange={(next) => {
          if (!next) {
            handleCloseDialog();
          } else {
            setDialogOpen(true);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit team member' : 'Add team member'}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="grid gap-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="name_en">Name (EN)</Label>
                <Input id="name_en" {...form.register('name_en')} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="name_ar">الاسم (AR)</Label>
                <Input id="name_ar" dir="rtl" {...form.register('name_ar')} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position_en">Role (EN)</Label>
                <Input id="position_en" {...form.register('position_en')} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="position_ar">الدور (AR)</Label>
                <Input id="position_ar" dir="rtl" {...form.register('position_ar')} required />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="bio_en">Bio (EN)</Label>
                <Textarea id="bio_en" rows={4} {...form.register('bio_en')} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio_ar">السيرة (AR)</Label>
                <Textarea id="bio_ar" rows={4} dir="rtl" {...form.register('bio_ar')} />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="highlights_en">Highlights (EN)</Label>
                <Textarea
                  id="highlights_en"
                  rows={4}
                  placeholder="One item per line"
                  {...form.register('highlights_en')}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="highlights_ar">أبرز الإنجازات (AR)</Label>
                <Textarea
                  id="highlights_ar"
                  rows={4}
                  dir="rtl"
                  placeholder="عنصر لكل سطر"
                  {...form.register('highlights_ar')}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image">Image path (optional)</Label>
              <Input id="image" placeholder="branding/landing/team-1.png" {...form.register('image')} />
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? 'Saving…' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Remove team member?"
        description="This action removes the member from the public landing page."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={() => {
          if (pendingDelete) {
            deleteMutation.mutate(pendingDelete.id);
          }
        }}
        onClose={() => setPendingDelete(null)}
      />
    </div>
  );
};

export default TeamManager;
