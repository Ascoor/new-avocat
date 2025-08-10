// TODO: migrate complete fields from legacy procedure modal
import { GlobalModal } from '../common/GlobalModal'
import { useForm } from 'react-hook-form'
import { createServiceProcedure, updateServiceProcedure } from '@/services/services'
import type { ServiceProcedure } from '@/services/services'

interface Props {
  procedure?: ServiceProcedure
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
}

export const AddEditServiceProcedureForm = ({ procedure, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit } = useForm<Partial<ServiceProcedure>>({ defaultValues: procedure })

  const onSubmit = async (data: Partial<ServiceProcedure>) => {
    if (procedure?.id) {
      await updateServiceProcedure(procedure.id, data)
    } else {
      await createServiceProcedure(data)
    }
    onSaved();
    onClose();
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={procedure ? 'تعديل إجراء' : 'إضافة إجراء'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full" placeholder="العنوان" {...register('title', { required: true })} />
        <textarea className="w-full" placeholder="ملاحظات" {...register('note')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">إلغاء</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  )
}
