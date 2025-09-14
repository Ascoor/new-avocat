import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient, updateClient, type Client } from '@/services/clients'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Props {
  open: boolean
  onClose: () => void
  initial?: Client | null
}

const empty: Client = { name: '', slug: '', phone_number: '', identity_number: '', address: '', email: '' }

const AddEditClientModal: React.FC<Props> = ({ open, onClose, initial }) => {
  const qc = useQueryClient()
  const [form, setForm] = useState<Client>(empty)

  useEffect(() => {
    if (initial) setForm({ ...empty, ...initial })
    else setForm(empty)
  }, [initial, open])

  const save = useMutation({
    mutationFn: async (data: Client) => {
      if (initial?.id) return (await updateClient(String(initial.id), data)).data
      return (await createClient(data)).data
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['clients'] })
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
          <DialogTitle>{initial?.id ? 'Edit Client' : 'Add Client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <Label htmlFor="slug">Code</Label>
              <Input id="slug" value={form.slug || ''} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone_number || ''} onChange={(e) => setForm({ ...form, phone_number: e.target.value })} />
            </div>
            <div>
              <Label htmlFor="idno">Identity</Label>
              <Input id="idno" value={form.identity_number || ''} onChange={(e) => setForm({ ...form, identity_number: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" value={form.address || ''} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} />
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

export default AddEditClientModal

