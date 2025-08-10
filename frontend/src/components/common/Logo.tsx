import React from 'react'
import { useTheme } from '../../context'

interface LogoProps {
  showText?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ showText = true, className = '' }) => {
  const { theme } = useTheme()
  const artSrc = theme === 'dark' ? '/logo-art-dark.png' : '/logo-art-day.png'
  const textSrc = theme === 'dark' ? '/logo-text-dark.png' : '/logo-text-day.png'
  return (
    <div className={`flex items-center gap-2 ${className}`.trim()}>
      <img src={artSrc} alt="Avocat logo" className="h-8 w-8" />
      {showText && (
        <img src={textSrc} alt="Avocat Law Firm" className="h-6" />
      )}
    </div>
  )
}

export default Logo;
