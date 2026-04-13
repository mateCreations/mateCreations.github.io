import { themes } from '../theme/colors'
import type { ThemeColors } from '../theme/colors'

const ROLES: { key: keyof ThemeColors; label: string }[] = [
  { key: 'bg', label: 'Background' },
  { key: 'fg', label: 'Foreground' },
  { key: 'keyword', label: 'Keywords' },
  { key: 'string', label: 'Strings' },
  { key: 'function', label: 'Functions' },
  { key: 'type', label: 'Types' },
  { key: 'comment', label: 'Comments' },
]

function Swatch({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-10 h-10 rounded-full border border-white/10"
        style={{ backgroundColor: color }}
        title={color}
      />
      <span className="text-xs font-mono" style={{ color: '#7a8573' }}>
        {label}
      </span>
    </div>
  )
}

function PaletteRow({ theme }: { theme: ThemeColors }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <span className="text-sm font-medium" style={{ color: theme.accent }}>
        {theme.label}
      </span>
      <div className="flex gap-5 flex-wrap justify-center">
        {ROLES.map(({ key, label }) => (
          <Swatch key={key} color={theme[key] as string} label={label} />
        ))}
      </div>
    </div>
  )
}

export default function Palette() {
  return (
    <section
      id="palette"
      className="w-full py-16 px-4"
      style={{ backgroundColor: '#282d1c' }}
    >
      <div className="max-w-4xl mx-auto flex flex-col gap-12 items-center">
        <h2 className="text-2xl font-semibold tracking-tight" style={{ color: '#dce0d9' }}>
          Palette
        </h2>
        {themes.map((theme) => (
          <PaletteRow key={theme.name} theme={theme} />
        ))}
      </div>
    </section>
  )
}
