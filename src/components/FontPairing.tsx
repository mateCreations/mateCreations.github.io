import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import { useScrollReveal } from '../hooks/useScrollReveal'

const FONT_PAIRS = [
  {
    name: 'JetBrains Mono + Inter',
    code: 'JetBrains Mono',
    ui: 'Inter',
    description: 'Developer-focused pairing with excellent readability',
    sample: { code: 'JetBrains Mono', body: 'Inter, system-ui, sans-serif' },
  },
  {
    name: 'Fira Code + Inter',
    code: 'Fira Code',
    ui: 'Inter',
    description: 'Popular choice with ligature support',
    sample: { code: 'Fira Code', body: 'Inter, system-ui, sans-serif' },
  },
  {
    name: 'IBM Plex Mono + Plex Sans',
    code: 'IBM Plex Mono',
    ui: 'IBM Plex Sans',
    description: 'Carbon-inspired industrial pairing',
    sample: { code: 'IBM Plex Mono', body: 'IBM Plex Sans, system-ui, sans-serif' },
  },
  {
    name: 'Operator Mono + Söhne',
    code: 'Operator Mono',
    ui: 'Söhne',
    description: 'Premium option with italic variants',
    sample: { code: 'ui-monospace, monospace', body: 'system-ui, sans-serif' },
  },
]

export default function FontPairing() {
  const ref = useScrollReveal<HTMLElement>()
  const { theme } = useTheme()
  const [activePair, setActivePair] = useState(FONT_PAIRS[0])

  return (
    <section ref={ref} id="fonts" className="reveal w-full py-16 px-4" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-5xl mx-auto flex flex-col gap-8">
        <h2 className="text-2xl font-semibold tracking-tight text-center" style={{ color: theme.fg }}>
          Font Pairings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FONT_PAIRS.map((pair) => (
            <button
              key={pair.name}
              onClick={() => setActivePair(pair)}
              className="text-left p-4 rounded-xl transition-all"
              style={{
                backgroundColor: activePair.name === pair.name ? theme.bg1 : 'transparent',
                border: `1px solid ${activePair.name === pair.name ? theme.accent : theme.bg1}`,
                color: theme.fg,
              }}
            >
              <div className="font-semibold mb-1" style={{ color: activePair.name === pair.name ? theme.accent : theme.fg }}>
                {pair.name}
              </div>
              <div className="text-xs opacity-60">{pair.description}</div>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: theme.bg1, border: `1px solid ${theme.bg1}` }}
          >
            <div className="text-xs font-mono mb-3 opacity-60" style={{ color: theme.comment }}>
              Code Font: {activePair.code}
            </div>
            <pre
              className="text-sm leading-relaxed"
              style={{ fontFamily: activePair.sample.code, color: theme.fg }}
            >
              <div><span style={{ color: theme.keyword }}>const</span>{' '}<span style={{ color: theme.function }}>greeting</span>{' '}<span style={{ color: theme.operator }}>=</span>{' '}<span style={{ color: theme.string }}>&quot;Hello&quot;</span></div>
              <div><span style={{ color: theme.keyword }}>function</span>{' '}<span style={{ color: theme.function }}>main</span>() {'{'}</div>
              <div>{'  '}<span style={{ color: theme.keyword }}>return</span>{' '}<span style={{ color: theme.number }}>42</span></div>
              <div>{'}'}</div>
            </pre>
          </div>

          <div
            className="rounded-xl p-6"
            style={{ backgroundColor: theme.bg1, border: `1px solid ${theme.bg1}` }}
          >
            <div className="text-xs font-mono mb-3 opacity-60" style={{ color: theme.comment }}>
              UI Font: {activePair.ui}
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{ fontFamily: activePair.sample.body, color: theme.fg }}
            >
              The quick brown fox jumps over the lazy dog. Typography matters for readability.
            </p>
            <div className="flex gap-2 mt-4">
              <span
                className="px-3 py-1 rounded text-xs"
                style={{ backgroundColor: theme.keyword, color: theme.bg }}
              >
                Tag
              </span>
              <span
                className="px-3 py-1 rounded text-xs"
                style={{ backgroundColor: theme.string, color: theme.bg }}
              >
                Badge
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}