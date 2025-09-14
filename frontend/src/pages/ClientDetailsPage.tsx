import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getClientById } from '@/services/clients'
import { Button } from '@/components/ui/button'

const ClientDetailsPage: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['client', id],
    queryFn: async () => id ? (await getClientById(id)).data : null,
    enabled: !!id,
  })

  if (isLoading) return <div className="p-6">Loading...</div>
  if (isError || !data) return <div className="p-6 text-destructive">Not found</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Client Details</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>Back</Button>
      </div>
      <div className="rounded-lg border border-border bg-card p-4 grid sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs text-muted-foreground">Code</div>
          <div className="font-medium">{(data as any).slug || '-'}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Name</div>
          <div className="font-medium">{(data as any).name}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Phone</div>
          <div className="font-medium">{(data as any).phone_number || '-'}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Identity</div>
          <div className="font-medium">{(data as any).identity_number || '-'}</div>
        </div>
        <div className="sm:col-span-2">
          <div className="text-xs text-muted-foreground">Address</div>
          <div className="font-medium">{(data as any).address || '-'}</div>
        </div>
      </div>
    </div>
  )
}

export default ClientDetailsPage

