import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { GlobalModal } from '../common/GlobalModal'
import { createAd, updateAd } from '@/services/ads'
import type { LegalAd } from '@/types'

interface Props {
  ad?: LegalAd
  isOpen: boolean
  onClose: () => void
  onSaved: (ad: LegalAd) => void
}

const schema = z.object({
  description: z.string().min(1, 'Required'),
  status: z.string().min(1, 'Required'),
  sendDate: z.string().optional(),
  receiveDate: z.string().optional()
})

export const AddEditAdForm = ({ ad, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: ad
  })

  const onSubmit = async (data: z.infer<typeof schema>) => {
    let saved: LegalAd | undefined
    if (ad?.id) {
      const res = await updateAd(ad.id, data)
      saved = res.data
    } else {
      const res = await createAd(data)
      saved = res.data
    }
    if (saved) onSaved(saved)
    onClose()
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={ad ? 'تعديل إعلان' : 'إضافة إعلان'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input className="w-full" placeholder="الوصف" {...register('description')} />
          {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
        </div>
        <input className="w-full" placeholder="الحالة" {...register('status')} />
        <input className="w-full" type="date" {...register('sendDate')} />
        <input className="w-full" type="date" {...register('receiveDate')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">إلغاء</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  )
}
