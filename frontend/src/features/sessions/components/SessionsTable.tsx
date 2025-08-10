import DataTable, { ColumnDef } from '../../../shared/components/DataTable'
import { formatDate } from '../../../shared/utils/date'

type Session = {
  id: string
  sessionDate: string
  caseCode: string
  room: string
  judge: string
  result: string
}

const data: Session[] = [
  { id: '1', sessionDate: '2024-04-20', caseCode: 'LC-100', room: '1', judge: 'Judge A', result: 'scheduled' },
  { id: '2', sessionDate: '2024-04-25', caseCode: 'LC-101', room: '2', judge: 'Judge B', result: 'done' },
]

const columns: ColumnDef<Session>[] = [
  { id: 'sessionDate', header: 'sessionDate', accessorKey: 'sessionDate', enableSorting: true, cell: v => formatDate(String(v)) },
  { id: 'caseCode', header: 'caseCode', accessorKey: 'caseCode' },
  { id: 'room', header: 'room', accessorKey: 'room' },
  { id: 'judge', header: 'judge', accessorKey: 'judge' },
  { id: 'result', header: 'result', accessorKey: 'result' },
]

export default function SessionsTable() {
  return (
    <DataTable
      columns={columns}
      data={data}
      exportFileName="sessions"
      highlightNewerThanDays={30}
      persistenceKey="sessions-table"
    />
  )
}
