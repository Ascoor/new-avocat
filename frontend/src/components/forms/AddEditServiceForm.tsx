// TODO: migrate complete logic from legacy component
import { GlobalModal } from '../common/GlobalModal'
import { useForm } from 'react-hook-form'
import { servicesApi } from '@/features/services/api'
import type { Service } from '@/types'

interface Props {
  service?: Service
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
}

export const AddEditServiceForm = ({ service, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit } = useForm<Service>({ defaultValues: service })

  const onSubmit = async (data: Service) => {
    if (service?.id) {
      await servicesApi.update(service.id, data)
    } else {
      await servicesApi.create(data)
    }
    onSaved();
    onClose();
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={service ? 'تعديل خدمة' : 'إضافة خدمة'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full" placeholder="رقم الخدمة" {...register('slug', { required: true })} />
        <input className="w-full" placeholder="الوصف" {...register('description')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">إلغاء</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  )
}
