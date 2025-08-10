import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context'
import { Button } from '../ui/button'

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <Button variant="ghost" size="sm" onClick={toggleTheme} aria-label="Toggle Dark Mode" className="p-2">
      {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
