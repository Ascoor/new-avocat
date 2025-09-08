
/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import { AddEditProcedureForm } from '../AddEditProcedureForm'

vi.mock('@/features/procedures/api', () => ({
  proceduresApi: {
    create: vi.fn(() => Promise.resolve({ id: 1, title: 't' })),
    update: vi.fn(() => Promise.resolve({ id: 1, title: 't' }))
  }
}))

vi.mock('../../common/GlobalModal', () => ({
  GlobalModal: ({ children }: any) => <div>{children}</div>
}))

describe('AddEditProcedureForm', () => {
  it('shows validation error when title missing', async () => {
    render(<AddEditProcedureForm isOpen={true} onClose={() => {}} onSaved={() => {}} />)
    await userEvent.click(screen.getByText('حفظ'))
    expect(await screen.findByText('Required')).toBeInTheDocument()
  })
})
