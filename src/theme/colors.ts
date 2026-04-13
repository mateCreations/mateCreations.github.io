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

/**
 * Mate-Industrial Theme Colors
 * @see ./PHILOSOPHY.md for design principles
 * 
 * Technical foundations:
 * - CIELAB perceptual uniformity (L*, a*, b*)
 * - Dark theme: L*=28 background, L*=60 accents
 * - Light theme: L*=90 background, L*=50 accents
 * - Same hues across themes (Solarized principle)
 * - One vivid accent: keyword/coral (Ember principle)
 * - Muted tones, no neon (Boo principle)
 */

export const yerbaMate: ThemeColors = {
  name: 'yerba-mate',
  label: 'Yerba Mate',
  bg: '#444735',      // L*=28, user preferred
  bg1: '#363828',     // L*=22, darker green
  fg: '#e8e4d8',      // L*=90, good contrast
  keyword: '#e08050', // L*=60, hue=25° (coral - ONE vivid accent)
  string: '#90b848', // L*=60, hue=90° (green)
  function: '#70a0c0', // L*=60, hue=210° (blue)
  type: '#c8a050',    // L*=62, hue=50° (gold)
  comment: '#606550', // L*=40, muted
  number: '#c07070',  // L*=58, hue=0° (rose)
  operator: '#806848', // L*=50, low emphasis
  accent: '#e08050',  // Same as keyword (Ember principle)
}

export const terere: ThemeColors = {
  name: 'terere',
  label: 'Terere',
  bg: '#f0e8d0',      // L*=90, warm cream
  bg1: '#e4d8b8',     // L*=86, slightly darker layer
  fg: '#302820',      // L*=20, good contrast
  keyword: '#c06030', // L*=50, hue=25° (same hue as dark)
  string: '#508028', // L*=50, hue=90° (same hue)
  function: '#4070a0', // L*=50, hue=210° (same hue)
  type: '#a06828',   // L*=55, hue=50° (same hue)
  comment: '#808070', // L*=55, muted
  number: '#a04040',  // L*=48, hue=0° (same hue)
  operator: '#806030', // L*=50, low emphasis
  accent: '#c06030',  // Same as keyword
}

export const themes = [yerbaMate, terere]