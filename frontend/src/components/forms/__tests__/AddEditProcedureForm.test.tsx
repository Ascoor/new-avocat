
/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { AddEditProcedureForm } from '../AddEditProcedureForm'

vi.mock('@/services/procedures', () => ({
  createProcedure: vi.fn(() => Promise.resolve({ data: { id: 1, title: 't' } })),
  updateProcedure: vi.fn(() => Promise.resolve({ data: { id: 1, title: 't' } }))
}))

describe('AddEditProcedureForm', () => {
  it('shows validation error when title missing', async () => {
    render(<AddEditProcedureForm isOpen={true} onClose={() => {}} onSaved={() => {}} />)
    await userEvent.click(screen.getByText('حفظ'))
    expect(await screen.findByText('Required')).toBeInTheDocument()
  })
})
