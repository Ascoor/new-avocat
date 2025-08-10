import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { GlobalModal } from '../common/GlobalModal'
import { createClient, updateClient, Client } from '@/services/clients'

interface AddEditClientFormProps {
  client?: Client
  isOpen: boolean
  onClose: () => void
  onSaved: (client: Client) => void
}

const schema = z.object({
  name: z.string().min(1, 'Required'),
  identity_number: z.string().min(1, 'Required'),
  address: z.string().min(1, 'Required'),
  phone: z.string().min(1, 'Required'),
  date_of_birth: z.string().optional(),
  email: z.string().email().optional(),
  relation: z.string().optional()
})

export const AddEditClientForm = ({ client, isOpen, onClose, onSaved }: AddEditClientFormProps) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: client?.name || '',
      identity_number: client?.identity_number || '',
      address: client?.address || '',
      phone: client?.phone || client?.phone_number || '',
      date_of_birth: client?.date_of_birth || '',
      email: client?.email || '',  
      relation: (client as any)?.relation || ''
 
    }
  })

  useEffect(() => {
    reset({
      name: client?.name || '',
      identity_number: client?.identity_number || '',
      address: client?.address || '',
      phone: client?.phone || client?.phone_number || '',
      date_of_birth: client?.date_of_birth || '',
      email: client?.email || '',
 
      relation: (client as any)?.relation || ''
 
    })
  }, [client, reset])

  const onSubmit = async (data: z.infer<typeof schema>) => {
    const payload: Partial<Client> = {
      name: data.name,
      identity_number: data.identity_number,
      address: data.address,
      phone: data.phone,
      date_of_birth: data.date_of_birth,
      email: data.email, 
      relation: data.relation,
 
    }

    let saved: Client | undefined
    if (client?.id) {
      const res = await updateClient(client.id, payload)
      saved = res.data
    } else {
      const res = await createClient(payload)
      saved = res.data
    }
    if (saved) onSaved(saved)
    onClose()
  }

  return (
    <GlobalModal isOpen={isOpen} onClose={onClose} title={client ? 'تعديل العميل' : 'إضافة عميل'}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input className="w-full" placeholder="الاسم" {...register('name')} />
          {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
        </div>
        <div>
          <input className="w-full" placeholder="رقم الهوية" {...register('identity_number')} />
          {errors.identity_number && <p className="text-red-600 text-sm">{errors.identity_number.message}</p>}
        </div>
        <div>
          <input className="w-full" placeholder="العنوان" {...register('address')} />
          {errors.address && <p className="text-red-600 text-sm">{errors.address.message}</p>}
        </div>
        <div>
          <input className="w-full" placeholder="رقم الهاتف" {...register('phone')} />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>
        <div>
          <input className="w-full" type="date" {...register('date_of_birth')} />
        </div>
        <div>
          <input className="w-full" placeholder="البريد الإلكتروني" {...register('email')} />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
        </div>
        <div>
          <input className="w-full" placeholder="العلاقة" {...register('relation')} />
        </div>
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
