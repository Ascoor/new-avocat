/// <reference types="vitest/globals" />
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { ProtectedRoute } from '../ProtectedRoute'

const mockUseAuth = vi.fn()
vi.mock('../../features/auth/hooks', () => ({
  useAuth: () => mockUseAuth()
}))

describe('ProtectedRoute', () => {
  it('redirects to login when unauthenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, isLoading: false })
    render(
      <MemoryRouter initialEntries={['/secret']}>
        <Routes>
          <Route path="/login" element={<div>login</div>} />
          <Route path="/secret" element={<ProtectedRoute><div>secret</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('login')).toBeInTheDocument()
  })

  it('renders children when authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, isLoading: false })
    render(
      <MemoryRouter initialEntries={['/secret']}>
        <Routes>
          <Route path="/login" element={<div>login</div>} />
          <Route path="/secret" element={<ProtectedRoute><div>secret</div></ProtectedRoute>} />
        </Routes>
      </MemoryRouter>
    )
    expect(screen.getByText('secret')).toBeInTheDocument()
  })
})
