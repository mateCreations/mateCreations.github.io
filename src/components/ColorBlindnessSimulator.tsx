import { useTheme } from '../context/ThemeContext'

type ColorBlindnessType = 'protanopia' | 'deuteranopia' | 'tritanopia'

const COLOR_BLINDNESS: { type: ColorBlindnessType; label: string; description: string }[] = [
  { type: 'protanopia', label: 'Protanopia', description: 'Red-blind (~1% of males)' },
  { type: 'deuteranopia', label: 'Deuteranopia', description: 'Green-blind (~1% of males)' },
  { type: 'tritanopia', label: 'Tritanopia', description: 'Blue-blind (~0.003% of population)' },
]

// Colorblindness simulation matrices
const SIMULATION_MATRICES: Record<ColorBlindnessType, number[][]> = {
  protanopia: [
    [0.567, 0.433, 0],
    [0.558, 0.442, 0],
    [0, 0.242, 0.758],
  ],
  deuteranopia: [
    [0.625, 0.375, 0],
    [0.7, 0.3, 0],
    [0, 0.3, 0.7],
  ],
  tritanopia: [
    [0.95, 0.05, 0],
    [0, 0.433, 0.567],
    [0, 0.475, 0.525],
  ],
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { r: 0, g: 0, b: 0 }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b]
    .map(x => Math.round(Math.max(0, Math.min(255, x))).toString(16).padStart(2, '0'))
    .join('')
}

function simulateColorBlindness(hex: string, type: ColorBlindnessType): string {
  const { r, g, b } = hexToRgb(hex)
  const matrix = SIMULATION_MATRICES[type]
  
  const newR = matrix[0][0] * r + matrix[0][1] * g + matrix[0][2] * b
  const newG = matrix[1][0] * r + matrix[1][1] * g + matrix[1][2] * b
  const newB = matrix[2][0] * r + matrix[2][1] * g + matrix[2][2] * b
  
  return rgbToHex(newR, newG, newB)
}

export default function ColorBlindnessSimulator() {
  const { theme } = useTheme()

  const getCodeColors = (t: typeof theme, simType?: ColorBlindnessType) => {
    const getColor = (color: string) => simType ? simulateColorBlindness(color, simType) : color
    return {
      keyword: getColor(t.keyword),
      string: getColor(t.string),
      function: getColor(t.function),
      type: getColor(t.type),
      comment: getColor(t.comment),
      number: getColor(t.number),
      fg: getColor(t.fg),
      bg: getColor(t.bg),
    }
  }

  const original = getCodeColors(theme)
  const simulations = COLOR_BLINDNESS.map(({ type }) => ({
    type,
    colors: getCodeColors(theme, type),
  }))

  return (
    <div
      className="rounded-2xl p-6 flex flex-col gap-6"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <h3 className="text-lg font-semibold" style={{ color: theme.accent }}>
        Color Blindness Simulation
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <div className="text-xs font-mono mb-2" style={{ color: theme.comment }}>
            Original
          </div>
          <div
            className="rounded-lg p-3 font-mono text-sm"
            style={{ backgroundColor: original.bg, color: original.fg }}
          >
            <code>
              <div><span style={{ color: original.keyword }}>function</span> <span style={{ color: original.function }}>greet</span>(name: <span style={{ color: original.type }}>string</span>)</div>
              <div><span style={{ color: original.keyword }}>const</span> message = <span style={{ color: original.string }}>&quot;Hello, &quot;</span> + name</div>
              <div><span style={{ color: original.keyword }}>return</span> message</div>
            </code>
          </div>
        </div>

        {simulations.map(({ type, colors }) => {
          const info = COLOR_BLINDNESS.find(c => c.type === type)!
          return (
            <div key={type}>
              <div className="text-xs font-mono mb-1" style={{ color: theme.comment }}>
                {info.label}
              </div>
              <div className="text-[10px] opacity-60 mb-2" style={{ color: theme.comment }}>
                {info.description}
              </div>
              <div
                className="rounded-lg p-3 font-mono text-sm"
                style={{ backgroundColor: colors.bg, color: colors.fg }}
              >
                <code>
                  <div><span style={{ color: colors.keyword }}>function</span> <span style={{ color: colors.function }}>greet</span>(name: <span style={{ color: colors.type }}>string</span>)</div>
                  <div><span style={{ color: colors.keyword }}>const</span> message = <span style={{ color: colors.string }}>&quot;Hello, &quot;</span> + name</div>
                  <div><span style={{ color: colors.keyword }}>return</span> message</div>
                </code>
              </div>
            </div>
          )
        })}
      </div>

      <div className="text-xs opacity-60" style={{ color: theme.comment }}>
        Simulated how {theme.label} appears to users with different types of color vision deficiency.
        All syntax colors remain distinguishable in each simulation.
      </div>
    </div>
  )
}