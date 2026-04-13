import { themes } from '../theme/colors'
import type { ThemeColors } from '../theme/colors'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ROLES: { key: keyof ThemeColors; label: string }[] = [
  { key: 'bg',       label: 'Background' },
  { key: 'fg',       label: 'Foreground' },
  { key: 'keyword',  label: 'Keywords' },
  { key: 'string',   label: 'Strings' },
  { key: 'function', label: 'Functions' },
  { key: 'type',     label: 'Types' },
  { key: 'comment',  label: 'Comments' },
]

function PaletteRow({ theme }: { theme: ThemeColors }) {
  const isDark = theme.name === 'yerba-mate'
  return (
    <div
      className="w-full rounded-2xl px-8 py-8 flex flex-col items-center gap-5"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <span className="text-sm font-semibold tracking-wide" style={{ color: theme.accent }}>
        {theme.label} — {isDark ? 'dark' : 'light'}
      </span>
      <div className="flex gap-6 flex-wrap justify-center">
        {ROLES.map(({ key, label }) => {
          const color = theme[key] as string
          return (
            <div key={key} className="group flex flex-col items-center gap-2 relative">
              {/* Hex tooltip */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                <span
                  className="text-[10px] font-mono px-1.5 py-0.5 rounded whitespace-nowrap"
                  style={{ backgroundColor: isDark ? '#282d1c' : '#1c1e13', color: '#dce0d9' }}
                >
                  {color}
                </span>
              </div>

              <div
                className="w-10 h-10 rounded-full transition-transform duration-200 group-hover:scale-125 cursor-default"
                style={{
                  backgroundColor: color,
                  border: `2px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                }}
              />
              <span className="text-xs font-mono" style={{ color: theme.comment }}>
                {label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default function Palette() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} id="palette" className="reveal w-full py-16 px-4" style={{ backgroundColor: '#282d1c' }}>
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <h2 className="text-2xl font-semibold tracking-tight text-center mb-2" style={{ color: '#dce0d9' }}>
          Palette
        </h2>
        {themes.map((theme) => (
          <PaletteRow key={theme.name} theme={theme} />
        ))}
      </div>
    </section>
  )
}
