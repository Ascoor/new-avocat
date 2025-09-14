import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createLawyer, updateLawyer } from '@/services/lawyers'
import type { User } from '@/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  open: boolean
  onClose: () => void
  initial?: User | null
}

const empty: Partial<User> = { name: '', email: '', phone: '' }

const AddEditLawyerModal: React.FC<Props> = ({ open, onClose, initial }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState<Partial<User>>(empty)

  useEffect(() => {
    if (initial) setForm({ ...empty, ...initial })
    else setForm(empty)
  }, [initial, open])

  const save = useMutation({
    mutationFn: async (data: Partial<User>) => {
      if (initial?.id) return (await updateLawyer(String(initial.id), data)).data
      return (await createLawyer(data)).data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['lawyers'] })
      onClose()
    },
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    save.mutate(form)
  }

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{initial?.id ? 'Edit Lawyer' : 'Add Lawyer'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={(form as any).phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value } as any)} />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={save.isPending}>{save.isPending ? 'Saving...' : 'Save'}</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default AddEditLawyerModal

