// Perceptually balanced theme generator using OKLCH color space
// Based on principles from: Ember, Solarized, Boo, Carbon, Material Design

function srgbToLinear(c: number): number {
  const absC = Math.abs(c)
  return absC <= 0.04045 ? c / 12.92 : Math.sign(c) * Math.pow((absC + 0.055) / 1.055, 2.4)
}

function linearToSrgb(c: number): number {
  const absC = Math.abs(c)
  return absC <= 0.0031308 ? 12.92 * c : Math.sign(c) * (1.055 * Math.pow(absC, 1 / 2.4) - 0.055)
}

function oklchToRgb(L: number, C: number, H: number): { r: number; g: number; b: number } {
  const hRad = (H * Math.PI) / 180
  const aOk = C * Math.cos(hRad)
  const bOk = C * Math.sin(hRad)
  
  const l_ = Math.pow(L + 0.3963377774 * aOk + 0.2158037573 * bOk, 3)
  const m_ = L - 0.1055613458 * aOk - 0.0638541728 * bOk
  const s_ = Math.pow(L - 0.0894841775 * aOk - 1.2914855480 * bOk, 3)
  
  const l = Math.pow(l_ + m_ + s_, 3)
  const m = Math.pow(l_ + m_ - s_, 3)
  const s = Math.pow(l_ - m_ + s_, 3)
  
  const rLinear = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s
  const gLinear = -1.2684380046 * l + 2.3809337616 * m - 0.2155336865 * s
  const bLinear = -0.0041960863 * l - 0.1175671181 * m + 1.3088158657 * s
  
  return {
    r: linearToSrgb(rLinear),
    g: linearToSrgb(gLinear),
    b: linearToSrgb(bLinear),
  }
}

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v * 255)))
  return '#' + [clamp(r), clamp(g), clamp(b)].map(x => x.toString(16).padStart(2, '0')).join('')
}

function oklchToHex(L: number, C: number, H: number): string {
  const { r, g, b } = oklchToRgb(L, C, H)
  return rgbToHex(r, g, b)
}

// Theme generation parameters
const DARK_BG_L = 0.30  // L* for dark theme background
const DARK_BG_HUE = 75  // Warm greenish-olive hue
const DARK_BG_CHROMA = 0.025

const LIGHT_BG_L = 0.92  // L* for light theme background
const LIGHT_BG_HUE = 70  // Warm yellow-green
const LIGHT_BG_CHROMA = 0.025

const ACCENT_HUE = 28  // Warm coral/terracotta
const ACCENT_CHROMA = 0.16

// Generate dark theme (Yerba Mate)
export const yerbaMate = {
  name: 'yerba-mate',
  label: 'Yerba Mate',
  bg: oklchToHex(DARK_BG_L, DARK_BG_CHROMA, DARK_BG_HUE),
  bg1: oklchToHex(DARK_BG_L - 0.02, DARK_BG_CHROMA * 1.2, DARK_BG_HUE),
  fg: oklchToHex(0.88, 0.01, DARK_BG_HUE),
  keyword: oklchToHex(0.65, ACCENT_CHROMA, ACCENT_HUE),
  string: oklchToHex(0.65, ACCENT_CHROMA * 0.9, 140),  // Green
  function: oklchToHex(0.62, ACCENT_CHROMA * 0.85, 220),  // Blue
  type: oklchToHex(0.68, ACCENT_CHROMA * 0.7, 50),  // Gold
  comment: oklchToHex(0.42, DARK_BG_CHROMA * 0.8, DARK_BG_HUE),
  number: oklchToHex(0.60, ACCENT_CHROMA * 0.6, 350),  // Rose
  operator: oklchToHex(0.55, DARK_BG_CHROMA * 2, DARK_BG_HUE),
  accent: oklchToHex(0.65, ACCENT_CHROMA, ACCENT_HUE),
}

// Generate light theme (Terere) - inverted values
export const terere = {
  name: 'terere',
  label: 'Terere',
  bg: oklchToHex(LIGHT_BG_L, LIGHT_BG_CHROMA, LIGHT_BG_HUE),
  bg1: oklchToHex(LIGHT_BG_L - 0.04, LIGHT_BG_CHROMA * 1.3, LIGHT_BG_HUE),
  fg: oklchToHex(0.22, 0.015, LIGHT_BG_HUE),
  keyword: oklchToHex(0.50, ACCENT_CHROMA * 1.1, ACCENT_HUE),
  string: oklchToHex(0.50, ACCENT_CHROMA, 130),  // Green
  function: oklchToHex(0.50, ACCENT_CHROMA * 0.85, 220),  // Blue
  type: oklchToHex(0.52, ACCENT_CHROMA * 0.75, 45),  // Gold
  comment: oklchToHex(0.55, LIGHT_BG_CHROMA * 0.6, LIGHT_BG_HUE),
  number: oklchToHex(0.48, ACCENT_CHROMA * 0.65, 350),  // Rose
  operator: oklchToHex(0.50, LIGHT_BG_CHROMA * 3, LIGHT_BG_HUE),
  accent: oklchToHex(0.50, ACCENT_CHROMA * 1.1, ACCENT_HUE),
}

console.log('yerbaMate:', yerbaMate)
console.log('terere:', terere)