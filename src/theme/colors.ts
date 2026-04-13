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

export const yerbaMate: ThemeColors = {
  name: 'yerba-mate',
  label: 'Yerba Mate',
  bg: '#1c1e13',
  fg: '#dce0d9',
  bg1: '#282d1c',
  keyword: '#c25d44',
  string: '#8fb339',
  function: '#7eb2d1',
  type: '#a67c52',
  comment: '#4f5b4a',
  number: '#b07878',
  operator: '#c09060',
  accent: '#a67c52',
}

export const terere: ThemeColors = {
  name: 'terere',
  label: 'Terere',
  bg: '#fbf1c7',
  fg: '#3c3836',
  bg1: '#ebdfb0',
  keyword: '#9d0006',
  string: '#79740e',
  function: '#076678',
  type: '#b57614',
  comment: '#928374',
  number: '#8f3f71',
  operator: '#b57614',
  accent: '#b57614',
}

export const themes = [yerbaMate, terere]
