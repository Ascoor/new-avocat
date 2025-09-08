/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddEditClientForm } from '../AddEditClientForm'

vi.mock('@/features/clients/api', () => ({
  clientsApi: {
    createClient: vi.fn(() => Promise.resolve({ id: '1', name: 't' })),
    updateClient: vi.fn(() => Promise.resolve({ id: '1', name: 't' }))
  }
}))

vi.mock('../../common/GlobalModal', () => ({
  GlobalModal: ({ children }: any) => <div>{children}</div>
}))

describe('AddEditClientForm', () => {
  it('shows validation error when required fields missing', async () => {
    render(<AddEditClientForm isOpen={true} onClose={() => {}} onSaved={() => {}} />)
    await userEvent.click(screen.getByText('حفظ'))
    expect((await screen.findAllByText('Required')).length).toBeGreaterThan(0)
  })
})
