/// <reference types="vitest/globals" />
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AddEditClientForm } from '../AddEditClientForm'

vi.mock('@/services/clients', () => ({
  createClient: vi.fn(() => Promise.resolve({ data: { id: '1', name: 't' } })),
  updateClient: vi.fn(() => Promise.resolve({ data: { id: '1', name: 't' } }))
}))

describe('AddEditClientForm', () => {
  it('shows validation error when required fields missing', async () => {
    render(<AddEditClientForm isOpen={true} onClose={() => {}} onSaved={() => {}} />)
    await userEvent.click(screen.getByText('حفظ'))
    expect(await screen.findByText('Required')).toBeInTheDocument()
  })
})
