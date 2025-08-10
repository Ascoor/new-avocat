
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GlobalModal } from '../common/GlobalModal'
import { createProcedure, updateProcedure } from '@/services/procedures'
import type { Procedure } from '@/types'

interface Props {
  procedure?: Procedure
  isOpen: boolean
  onClose: () => void
  onSaved: (proc: Procedure) => void
}

const schema = z.object({
  title: z.string().min(1, 'Required'),
  note: z.string().optional()
})

export const AddEditProcedureForm = ({ procedure, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: procedure?.title || '',
      note: procedure?.note || ''
    }
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const submitData = {
      title: data.title,
      note: data.note
    };
    
    let saved: Procedure | undefined
    if (procedure?.id) {
      const res = await updateProcedure(procedure.id, submitData)
      saved = res.data
    } else {
      const res = await createProcedure(submitData)
      saved = res.data
    }
    if (saved) onSaved(saved)
    onClose()
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={procedure ? 'تعديل إجراء' : 'إضافة إجراء'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input className="w-full" placeholder="العنوان" {...register('title')} />
          {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
        </div>
        <textarea className="w-full" placeholder="ملاحظات" {...register('note')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">إلغاء</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  )
}
