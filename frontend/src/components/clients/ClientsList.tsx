import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getClients, deleteClient } from '@/services/clients'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Client } from '@/types/index';
import { useNavigate } from 'react-router-dom'
import AddEditClientModal from '@/components/clients/AddEditClientModal'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const ClientsList: React.FC = () => {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState<Client | null>(null)
  const [confirmId, setConfirmId] = useState<string | null>(null)
  const { data, isLoading, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: async () => (await getClients()).data as unknown,
  })

  const del = useMutation({
    mutationFn: (id: string) => deleteClient(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['clients'] }),
  })

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError) return <div className="p-6 text-destructive">Error loading clients</div>

  // Normalize API shapes: either an array or { clients: [...] }
  const rows = (Array.isArray(data)
    ? data
    : (data as { clients?: Client[]; data?: Client[] } | undefined)?.clients ||
      (data as { data?: Client[] } | undefined)?.data ||
      []) as Client[]

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/30">
        <h3 className="font-semibold">Clients</h3>
        <Button size="sm" onClick={() => { setSelected(null); setOpenModal(true) }}>Add Client</Button>
      </div>
      <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[780px]">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-2">#</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">gender</th> 
            <th className="text-left px-4 py-2">Religion</th> 
            <th className="text-left px-4 py-2">Address</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-right px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((c, i) => (
            <tr key={c.id ?? i} className="hover:bg-muted/50 cursor-pointer transition-colors" onClick={() => c.id && navigate(`/clients/authorized/${c.id}`)}>
              <td className="px-4 py-2">{c.slug || c.id || i + 1}</td>
              <td className="px-4 py-2">{c.name}</td>
<td className="px-4 py-2">{c.gender || '-'}</td> 
              <td className="px-4 py-2">{c.religion || '-'}</td> 
              <td className="px-4 py-2">{c.address || '-'}</td>
              <td className="px-4 py-2">
                {c.status ? (
                  <Badge
                    className={
                      c.status.toLowerCase() === 'active'
                        ? 'border-transparent bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))]'
                        : 'border-transparent bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))]'
                    }
                  >
                    {c.status}
                  </Badge>
                ) : (
                  '-'
                )}
              </td>
              <td className="px-4 py-2 text-right" onClick={(e) => e.stopPropagation()}>
                <Button size="sm" variant="outline" className="mr-2" onClick={() => { setSelected(c); setOpenModal(true) }}>Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => c.id && setConfirmId(String(c.id))}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {/* Add/Edit Modal */}
      <AddEditClientModal open={openModal} onClose={() => setOpenModal(false)} initial={selected} />

      {/* Confirm Delete */}
      <AlertDialog open={!!confirmId} onOpenChange={(o) => !o && setConfirmId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete client?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setConfirmId(null)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (confirmId) del.mutate(confirmId); setConfirmId(null) }}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ClientsList
