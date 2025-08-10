// TODO: migrate full fields from old component
import { GlobalModal } from '../common/GlobalModal'
import { useForm } from 'react-hook-form'
import { createLegalCase, updateLegalCase, LegalCase } from '@/services/legalCases'

interface Props {
  legalCase?: LegalCase
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
}

export const AddEditLegCaseForm = ({ legalCase, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit, reset } = useForm<LegalCase>({ defaultValues: legalCase })

  const onSubmit = async (data: LegalCase) => {
    if (legalCase?.id) {
      await updateLegalCase(legalCase.id, data)
    } else {
      await createLegalCase(data)
    }
    onSaved();
    onClose();
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={legalCase ? 'تعديل قضية' : 'إضافة قضية'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full" placeholder="رقم الملف" {...register('slug', { required: true })} />
        <input className="w-full" placeholder="موضوع الدعوى" {...register('title', { required: true })} />
        <textarea className="w-full" placeholder="الوصف" {...register('description')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">إلغاء</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">حفظ</button>
        </div>
      </form>
    </GlobalModal>
  )
}
