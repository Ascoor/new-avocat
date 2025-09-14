import React from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getUnclients, deleteUnclient, type Unclient } from '@/services/clients'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const UnclientsList: React.FC = () => {
  const qc = useQueryClient()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['unclients'],
    queryFn: async () => (await getUnclients()).data as unknown,
  })

  const del = useMutation({
    mutationFn: (id: string) => deleteUnclient(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['unclients'] }),
  })

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError) return <div className="p-6 text-destructive">Error loading unclients</div>

  const rows = (Array.isArray(data)
    ? data
    : (data as { unclients?: Unclient[]; data?: Unclient[] } | undefined)?.unclients ||
      (data as { data?: Unclient[] } | undefined)?.data ||
      []) as Unclient[]

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      <div className="overflow-x-auto">
      <table className="w-full text-sm min-w-[640px]">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left px-4 py-2">#</th>
            <th className="text-left px-4 py-2">Name</th>
            <th className="text-left px-4 py-2">Phone</th>
            <th className="text-left px-4 py-2">Status</th>
            <th className="text-right px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((c, i) => (
            <tr key={c.id ?? i} className="hover:bg-muted/50 transition-colors">
              <td className="px-4 py-2">{c.slug || c.id || i + 1}</td>
              <td className="px-4 py-2">{c.name}</td>
              <td className="px-4 py-2">{c.phone_number || c.phone || '-'}</td>
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
              <td className="px-4 py-2 text-right">
                <Button size="sm" variant="outline" className="mr-2">Edit</Button>
                <Button size="sm" variant="destructive" onClick={() => c.id && del.mutate(c.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}

export default UnclientsList
