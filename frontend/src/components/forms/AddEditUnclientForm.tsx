import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { GlobalModal } from '../common/GlobalModal'
import { Client, createClient, updateClient } from '@/services/clients'

interface Props {
  client?: Client
  isOpen: boolean
  onClose: () => void
  onSaved: () => void
}

export const AddEditUnclientForm = ({ client, isOpen, onClose, onSaved }: Props) => {
  const { register, handleSubmit, reset } = useForm<Client>({ defaultValues: client })

  useEffect(() => {
    reset(client)
  }, [client, reset])

  const onSubmit = async (data: Client) => {
    if (client?.id) {
      await updateClient(client.id, data)
    } else {
      await createClient(data)
    }
    onSaved()
    onClose()
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={client ? 'تعديل عميل' : 'إضافة عميل'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input className="w-full" placeholder="الاسم" {...register('name', { required: true })} />
        <input className="w-full" placeholder="رقم الهوية" {...register('identity_number')} />
        <input className="w-full" placeholder="رقم الهاتف" {...register('phone_number')} />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
            إلغاء
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            حفظ
          </button>
        </div>
      </form>
    </GlobalModal>
  )
}
