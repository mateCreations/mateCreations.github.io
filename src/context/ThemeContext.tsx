import { useState, createContext, useContext, useEffect, type ReactNode } from 'react'
import { yerbaMate, terere, type ThemeColors } from '../theme/colors'

interface ThemeContextValue {
  theme: ThemeColors
  setTheme: (theme: ThemeColors) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}

interface Props {
  children: ReactNode
}

export function ThemeProvider({ children }: Props) {
  const [theme, setTheme] = useState<ThemeColors>(yerbaMate)
  const isDark = theme.name === 'yerba-mate'

  useEffect(() => {
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.fg
    
    document.body.style.setProperty('--bg', theme.bg)
    document.body.style.setProperty('--bg1', theme.bg1)
    document.body.style.setProperty('--fg', theme.fg)
  }, [theme])

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      isDark,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export { yerbaMate, terere }