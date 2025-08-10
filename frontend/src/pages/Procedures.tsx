import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { GlobalTable, TableColumn, TableAction } from '../components/common/GlobalTable'
import { AddEditProcedureForm } from '../components/forms/AddEditProcedureForm'
import type { Procedure } from '@/types'
import { Plus, Edit, Trash2 } from 'lucide-react'

const mockProcedures: Procedure[] = [
  { id: 1, title: 'إجراء أول', note: 'ملاحظة' },
  { id: 2, title: 'إجراء ثان' }
]

export const Procedures = () => {
  const [procedures, setProcedures] = useState<Procedure[]>(mockProcedures)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<Procedure | undefined>()

  const handleSaved = (proc: Procedure) => {
    if (editing) {
      setProcedures(p => p.map(pr => pr.id === proc.id ? proc : pr))
    } else {
      setProcedures(p => [...p, { ...proc, id: Date.now() }])
    }
    setEditing(undefined)
    setModalOpen(false)
  }

  const columns: TableColumn<Procedure>[] = [
    { key: 'title', label: 'العنوان', sortable: true },
    { key: 'note', label: 'ملاحظة' }
  ]

  const actions: TableAction<Procedure>[] = [
    { label: 'تعديل', icon: <Edit className="h-4 w-4" />, onClick: p => { setEditing(p); setModalOpen(true) } },
    { label: 'حذف', icon: <Trash2 className="h-4 w-4" />, onClick: p => setProcedures(pr => pr.filter(x => x.id !== p.id)), variant: 'destructive' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">الإجراءات</h1>
        <Button onClick={() => { setEditing(undefined); setModalOpen(true) }}>
          <Plus className="h-4 w-4 mr-2" />إضافة إجراء
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الإجراءات</CardTitle>
          <CardDescription>جميع الإجراءات المضافة</CardDescription>
        </CardHeader>
        <CardContent>
          <GlobalTable data={procedures} columns={columns} actions={actions} />
        </CardContent>
      </Card>

      <AddEditProcedureForm
        procedure={editing}
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditing(undefined)
        }}
        onSaved={handleSaved}
      />
    </div>
  )
}
