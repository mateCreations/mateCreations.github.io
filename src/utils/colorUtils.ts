export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { r: 0, g: 0, b: 0 }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

export function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => {
    const hex = Math.round(Math.max(0, Math.min(255, x))).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }).join('')
}

function srgbToLinear(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

function linearToSrgb(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055
}

function labToXyz(l: number, a: number, b: number): { x: number; y: number; z: number } {
  const fy = (l + 16) / 116
  const fx = a / 500 + fy
  const fz = fy - b / 200

  const xn = 95.047
  const yn = 100.000
  const zn = 108.883

  const xr = Math.pow(fx, 3) > 0.008856 ? Math.pow(fx, 3) : (116 * fx - 16) / 903.3
  const yr = l > 8 ? Math.pow((l + 16) / 116, 3) : l / 903.3
  const zr = Math.pow(fz, 3) > 0.008856 ? Math.pow(fz, 3) : (116 * fz - 16) / 903.3

  return {
    x: xr * xn,
    y: yr * yn,
    z: zr * zn,
  }
}

function xyzToRgb(x: number, y: number, z: number): { r: number; g: number; b: number } {
  const xr = x / 100
  const yr = y / 100
  const zr = z / 100

  const r = linearToSrgb(3.2406 * xr - 1.5372 * yr - 0.4986 * zr)
  const g = linearToSrgb(-0.9689 * xr + 1.8758 * yr + 0.0415 * zr)
  const b = linearToSrgb(0.0557 * xr - 0.2040 * yr + 1.0570 * zr)

  return { r: r * 255, g: g * 255, b: b * 255 }
}

export function rgbToLab(r: number, g: number, b: number): { L: number; a: number; b: number } {
  const rr = srgbToLinear(r / 255)
  const gg = srgbToLinear(g / 255)
  const bb = srgbToLinear(b / 255)

  const x = 0.4124564 * rr + 0.3575761 * gg + 0.1804375 * bb
  const y = 0.2126729 * rr + 0.7151522 * gg + 0.0721750 * bb
  const z = 0.0193339 * rr + 0.1191920 * gg + 0.9503041 * bb

  const xn = 95.047
  const yn = 100.000
  const zn = 108.883

  const xr = x * 100 / xn
  const yr = y * 100 / yn
  const zr = z * 100 / zn

  const fx = xr > 0.008856 ? Math.pow(xr, 1/3) : (903.3 * xr + 16) / 116
  const fy = yr > 0.008856 ? Math.pow(yr, 1/3) : (903.3 * yr + 16) / 116
  const fz = zr > 0.008856 ? Math.pow(zr, 1/3) : (903.3 * zr + 16) / 116

  return {
    L: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  }
}

export function hexToLab(hex: string): { L: number; a: number; b: number } {
  const { r, g, b } = hexToRgb(hex)
  return rgbToLab(r, g, b)
}

export function labToHex(L: number, a: number, b: number): string {
  const xyz = labToXyz(L, a, b)
  const rgb = xyzToRgb(xyz.x, xyz.y, xyz.z)
  return rgbToHex(rgb.r, rgb.g, rgb.b)
}

function getLuminance(r: number, g: number, b: number): number {
  const rsrgb = r / 255
  const gsrgb = g / 255
  const bsrgb = b / 255

  const rLinear = rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
  const gLinear = gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
  const bLinear = bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1)
  const rgb2 = hexToRgb(color2)

  const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b)

  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

export function getWcagRating(ratio: number): 'AAA' | 'AA' | 'AA Large' | 'Fail' {
  if (ratio >= 7) return 'AAA'
  if (ratio >= 4.5) return 'AA'
  if (ratio >= 3) return 'AA Large'
  return 'Fail'
}

export function getWcagIcon(ratio: number): string {
  const rating = getWcagRating(ratio)
  switch (rating) {
    case 'AAA': return '✓✓'
    case 'AA': return '✓'
    case 'AA Large': return '(✓)'
    default: return '✗'
  }
}