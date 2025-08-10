import DataTable, { ColumnDef } from '../../../shared/components/DataTable'
import { formatDate } from '../../../shared/utils/date'

type LegalCase = {
  id: string
  code: string
  clientName: string
  court: string
  createdAt: string
  updatedAt: string
  status: string
  sessionsCount: number
}

const data: LegalCase[] = [
  { id: '1', code: 'LC-100', clientName: 'Ali Ahmed', court: 'Court A', createdAt: '2024-03-10', updatedAt: '2024-04-01', status: 'open', sessionsCount: 3 },
  { id: '2', code: 'LC-101', clientName: 'Sara Mohamed', court: 'Court B', createdAt: '2024-03-12', updatedAt: '2024-04-05', status: 'closed', sessionsCount: 5 },
]

const columns: ColumnDef<LegalCase>[] = [
  { id: 'code', header: 'code', accessorKey: 'code', enableSorting: true },
  { id: 'clientName', header: 'clientName', accessorKey: 'clientName' },
  { id: 'court', header: 'court', accessorKey: 'court' },
  { id: 'createdAt', header: 'createdAt', accessorKey: 'createdAt', enableSorting: true, cell: v => formatDate(String(v)) },
  { id: 'updatedAt', header: 'updatedAt', accessorKey: 'updatedAt', enableSorting: true, cell: v => formatDate(String(v)) },
  { id: 'status', header: 'status', accessorKey: 'status' },
  { id: 'sessionsCount', header: 'sessionsCount', accessorKey: 'sessionsCount', enableSorting: true },
]

export default function LegalCasesTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      exportFileName="legal-cases"
      highlightNewerThanDays={30}
      persistenceKey="legal-cases-table"
    />
  )
}
