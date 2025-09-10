import { renderHook, act } from '@testing-library/react'
import { LanguageProvider, useLanguage } from '../LanguageContext'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({ i18n: { changeLanguage: vi.fn(), language: 'en' } })
}))

describe('LanguageProvider', () => {
  it('updates document direction on toggle', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <LanguageProvider>{children}</LanguageProvider>
    )
    const { result } = renderHook(() => useLanguage(), { wrapper })

    expect(document.documentElement.dir).toBe('ltr')
    act(() => result.current.toggleLanguage())
    expect(document.documentElement.dir).toBe('rtl')
  })
})
