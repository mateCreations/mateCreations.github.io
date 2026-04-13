import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import ContrastBadge from './ContrastBadge'

const SAMPLE_COLORS = [
  { name: 'Keyword', key: 'keyword' },
  { name: 'String', key: 'string' },
  { name: 'Function', key: 'function' },
  { name: 'Type', key: 'type' },
  { name: 'Comment', key: 'comment' },
  { name: 'Number', key: 'number' },
] as const

export default function ContrastChecker() {
  const { theme } = useTheme()
  const [foreground, setForeground] = useState(theme.fg)
  const [background, setBackground] = useState(theme.bg)

  const handleColorInput = (color: string, type: 'fg' | 'bg') => {
    const hex = color.startsWith('#') ? color : `#${color}`
    if (/^#[0-9A-Fa-f]{6}$/.test(hex)) {
      if (type === 'fg') setForeground(hex)
      else setBackground(hex)
    }
  }

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-6"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <h3 className="text-lg font-semibold" style={{ color: theme.accent }}>
        Contrast Checker
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-mono mb-1.5" style={{ color: theme.comment }}>
              Foreground
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={foreground}
                onChange={(e) => handleColorInput(e.target.value, 'fg')}
                className="flex-1 px-2 py-1.5 rounded font-mono text-sm"
                style={{ 
                  backgroundColor: theme.bg1, 
                  color: theme.fg,
                  border: `1px solid ${theme.bg1}`,
                }}
                placeholder="#000000"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono mb-1.5" style={{ color: theme.comment }}>
              Background
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer border-0"
              />
              <input
                type="text"
                value={background}
                onChange={(e) => handleColorInput(e.target.value, 'bg')}
                className="flex-1 px-2 py-1.5 rounded font-mono text-sm"
                style={{ 
                  backgroundColor: theme.bg1, 
                  color: theme.fg,
                  border: `1px solid ${theme.bg1}`,
                }}
                placeholder="#ffffff"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <ContrastBadge foreground={foreground} background={background} size="md" />
          </div>
        </div>

        <div
          className="rounded-xl p-4 flex items-center justify-center min-h-[120px]"
          style={{ backgroundColor: background }}
        >
          <p className="text-lg font-medium" style={{ color: foreground }}>
            Sample Text
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-xs font-mono mb-3" style={{ color: theme.comment }}>
          Quick Test: Theme Colors on Background
        </h4>
        <div className="flex flex-wrap gap-2">
          {SAMPLE_COLORS.map(({ name, key }) => (
            <button
              key={key}
              onClick={() => setForeground(theme[key])}
              className="px-2 py-1 rounded text-xs font-mono transition-all hover:scale-105"
              style={{
                backgroundColor: theme[key],
                color: background,
                border: `1px solid ${theme.bg1}`,
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}