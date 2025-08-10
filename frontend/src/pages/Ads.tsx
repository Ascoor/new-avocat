import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { GlobalTable, TableColumn, TableAction } from '../components/common/GlobalTable'
import { AddEditAdForm } from '../components/forms/AddEditAdForm'
import type { LegalAd } from '@/types'
import { Plus, Edit, Trash2 } from 'lucide-react'

const mockAds: LegalAd[] = [
  { id: 1, description: 'إعلان جلسة', status: 'قيد التجهيز' },
  { id: 2, description: 'إعلان آخر', status: 'مكتمل' }
]

export const Ads = () => {
  const [ads, setAds] = useState<LegalAd[]>(mockAds)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState<LegalAd | undefined>()

  const handleSaved = (ad: LegalAd) => {
    if (editing) {
      setAds(a => a.map(x => x.id === ad.id ? ad : x))
    } else {
      setAds(a => [...a, { ...ad, id: Date.now() }])
    }
    setEditing(undefined)
    setModalOpen(false)
  }

  const columns: TableColumn<LegalAd>[] = [
    { key: 'description', label: 'الوصف', sortable: true },
    { key: 'status', label: 'الحالة' }
  ]

  const actions: TableAction<LegalAd>[] = [
    { label: 'تعديل', icon: <Edit className="h-4 w-4" />, onClick: a => { setEditing(a); setModalOpen(true) } },
    { label: 'حذف', icon: <Trash2 className="h-4 w-4" />, onClick: a => setAds(ad => ad.filter(x => x.id !== a.id)), variant: 'destructive' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">الإعلانات</h1>
        <Button onClick={() => { setEditing(undefined); setModalOpen(true) }}>
          <Plus className="h-4 w-4 mr-2" />إضافة إعلان
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>قائمة الإعلانات</CardTitle>
          <CardDescription>الإعلانات المرتبطة بالقضايا</CardDescription>
        </CardHeader>
        <CardContent>
          <GlobalTable data={ads} columns={columns} actions={actions} />
        </CardContent>
      </Card>

      <AddEditAdForm
        ad={editing}
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
