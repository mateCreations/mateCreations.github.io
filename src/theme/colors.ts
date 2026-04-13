export interface ThemeColors {
  name: string
  label: string
  bg: string
  fg: string
  bg1: string
  keyword: string
  string: string
  function: string
  type: string
  comment: string
  number: string
  operator: string
  accent: string
}

// Perceptually balanced using OKLCH color space
// All accents at L*≈60-65 (dark) / L*≈50-55 (light) for visual balance
// Warm hue foundation: yerba≈75° (yellow-green), terere≈65° (warm yellow)
// Accent hue: ≈30-35° (warm orange-coral)

export const yerbaMate: ThemeColors = {
  name: 'yerba-mate',
  label: 'Yerba Mate',
  bg: '#181b14',
  bg1: '#22261a',
  fg: '#d4dbd0',
  keyword: '#d98856',
  string: '#94b848',
  function: '#68a0c0',
  type: '#c9a060',
  comment: '#5a624a',
  number: '#c08080',
  operator: '#a08860',
  accent: '#d98856',
}

export const terere: ThemeColors = {
  name: 'terere',
  label: 'Terere',
  bg: '#f2e8d0',
  bg1: '#e4d8b0',
  fg: '#2a2820',
  keyword: '#c05838',
  string: '#609030',
  function: '#3070a0',
  type: '#a06830',
  comment: '#807860',
  number: '#a05050',
  operator: '#805830',
  accent: '#c05838',
}

export const themes = [yerbaMate, terere]