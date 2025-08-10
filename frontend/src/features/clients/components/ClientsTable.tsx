import DataTable, { ColumnDef } from '../../../shared/components/DataTable'
import { formatDate } from '../../../shared/utils/date'

type Client = {
  id: string
  name: string
  nationalId: string
  phone: string
  createdAt: string
  status: string
}

const data: Client[] = [
  { id: '1', name: 'Ali Ahmed', nationalId: '1234567890', phone: '555-1111', createdAt: '2024-01-01', status: 'active' },
  { id: '2', name: 'Sara Mohamed', nationalId: '9876543210', phone: '555-2222', createdAt: '2024-02-15', status: 'inactive' },
]

const columns: ColumnDef<Client>[] = [
  { id: 'name', header: 'name', accessorKey: 'name', enableSorting: true },
  { id: 'nationalId', header: 'nationalId', accessorKey: 'nationalId' },
  { id: 'phone', header: 'phone', accessorKey: 'phone' },
  { id: 'createdAt', header: 'createdAt', accessorKey: 'createdAt', enableSorting: true, cell: v => formatDate(String(v)) },
  { id: 'status', header: 'status', accessorKey: 'status' },
]

export default function ClientsTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      exportFileName="clients"
      highlightNewerThanDays={30}
      persistenceKey="clients-table"
    />
  )
}
