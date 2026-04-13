import { useRef, useCallback, useEffect } from 'react'
import gsap from 'gsap'
import type { ThemeColors } from '../theme/colors'

type TokenRole = 'keyword' | 'string' | 'function' | 'type' | 'comment' | 'number' | 'operator' | 'fg'

type Token = {
  text: string
  role: TokenRole
}

type CodeLine = Token[]

function t(text: string, role: TokenRole): Token {
  return { text, role }
}

const CODE_LINES: CodeLine[] = [
  [t('// mateCreations theme', 'comment')],
  [],
  [t('import', 'keyword'), t(' { EventEmitter } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"events"', 'string')],
  [t('import ', 'keyword'), t('type', 'keyword'), t(' { Readable } ', 'fg'), t('from', 'keyword'), t(' ', 'fg'), t('"stream"', 'string')],
  [],
  [t('type ', 'keyword'), t('Strength', 'type'), t(' = ', 'operator'), t('"mild"', 'string'), t(' | ', 'operator'), t('"strong"', 'string')],
  [],
  [t('interface ', 'keyword'), t('BrewConfig', 'type'), t(' {', 'fg')],
  [t('  temperature', 'fg'), t(': ', 'operator'), t('number', 'type')],
  [t('  strength', 'fg'), t(': ', 'operator'), t('Strength', 'type')],
  [t('}', 'fg')],
]

type ClipPoints = { tl: number; tr: number; br: number; bl: number }
type ClipSet = { dark: ClipPoints; light: ClipPoints }

const INITIAL: ClipSet = {
  dark: { tl: 0, tr: 52, br: 40, bl: 0 },
  light: { tl: 50, tr: 100, br: 100, bl: 38 },
}

const HOVER: Record<string, ClipSet> = {
  dark: {
    dark: { tl: 0, tr: 62, br: 50, bl: 0 },
    light: { tl: 60, tr: 100, br: 100, bl: 48 },
  },
  light: {
    dark: { tl: 0, tr: 45, br: 33, bl: 0 },
    light: { tl: 43, tr: 100, br: 100, bl: 35 },
  },
}

const EXPANDED: Record<string, ClipSet> = {
  dark: {
    dark: { tl: 0, tr: 100, br: 100, bl: 0 },
    light: { tl: 93, tr: 100, br: 100, bl: 93 },
  },
  light: {
    dark: { tl: 0, tr: 7, br: 7, bl: 0 },
    light: { tl: 5, tr: 100, br: 100, bl: 5 },
  },
}

function clipToString(c: ClipPoints): string {
  return `polygon(${c.tl}% 0%, ${c.tr}% 0%, ${c.br}% 100%, ${c.bl}% 100%)`
}

type PanelKey = 'dark' | 'light'

function getColor(theme: ThemeColors, role: TokenRole): string {
  switch (role) {
    case 'keyword': return theme.keyword
    case 'string': return theme.string
    case 'function': return theme.function
    case 'type': return theme.type
    case 'comment': return theme.comment
    case 'number': return theme.number
    case 'operator': return theme.operator
    default: return theme.fg
  }
}

function CodePanel({
  theme,
  label,
  labelPosition,
  panelKey,
  panelRef,
  onHover,
  onClick,
}: {
  theme: ThemeColors
  label: string
  labelPosition: 'left' | 'right'
  panelKey: PanelKey
  panelRef: (el: HTMLDivElement | null) => void
  onHover: (key: PanelKey | null) => void
  onClick: (key: PanelKey) => void
}) {
  return (
    <div
      ref={panelRef}
      className="absolute inset-0 flex flex-col overflow-hidden cursor-pointer select-none"
      style={{ clipPath: clipToString(INITIAL[panelKey]) }}
      onMouseEnter={() => onHover(panelKey)}
      onClick={() => onClick(panelKey)}
    >
      <div
        className="flex h-11 shrink-0 items-center gap-2 px-4"
        style={{ backgroundColor: theme.bg1 }}
      >
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.comment }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.comment }} />
        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.comment }} />
        <span
          className="ml-3 text-xs font-mono"
          style={{ color: theme.comment }}
        >
          brew.ts
        </span>
        <span
          className="ml-auto text-xs px-2 py-0.5 rounded"
          style={{ backgroundColor: theme.bg, color: theme.accent }}
        >
          {theme.label}
        </span>
      </div>

      <div
        className="flex flex-1"
        style={{ backgroundColor: theme.bg }}
      >
        <div
          className="select-none px-3 pt-4 pb-4 text-right text-xs font-mono leading-6 shrink-0"
          style={{ color: theme.comment, backgroundColor: theme.bg1, minWidth: '2.5rem' }}
        >
          {CODE_LINES.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        <div
          className="px-4 pt-4 pb-4 text-xs font-mono leading-6 flex-1"
          style={{ color: theme.fg, backgroundColor: theme.bg }}
        >
          {CODE_LINES.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line.length === 0 ? '\n' : line.map((token, j) => (
                <span key={j} style={{ color: getColor(theme, token.role) }}>
                  {token.text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <span
        className="absolute bottom-4 text-[11px] font-semibold uppercase tracking-[0.12em] font-mono"
        style={{
          color: theme.accent,
          left: labelPosition === 'left' ? 16 : undefined,
          right: labelPosition === 'right' ? 16 : undefined,
        }}
      >
        {label}
      </span>
    </div>
  )
}

interface Props {
  themes: [ThemeColors, ThemeColors]
  className?: string
}

export default function DiptychWindow({ themes, className }: Props) {
  const [darkTheme, lightTheme] = themes

  const panelRefs = useRef<Record<PanelKey, HTMLDivElement | null>>({
    dark: null,
    light: null,
  })

  const clipState = useRef<Record<PanelKey, ClipPoints>>({
    dark: { ...INITIAL.dark },
    light: { ...INITIAL.light },
  })

  const expandedRef = useRef<PanelKey | null>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  const animateTo = useCallback((target: ClipSet, duration: number, ease: string) => {
    if (tweenRef.current) tweenRef.current.kill()

    const proxy = {
      dTl: clipState.current.dark.tl,
      dTr: clipState.current.dark.tr,
      dBr: clipState.current.dark.br,
      dBl: clipState.current.dark.bl,
      lTl: clipState.current.light.tl,
      lTr: clipState.current.light.tr,
      lBr: clipState.current.light.br,
      lBl: clipState.current.light.bl,
    }

    tweenRef.current = gsap.to(proxy, {
      dTl: target.dark.tl,
      dTr: target.dark.tr,
      dBr: target.dark.br,
      dBl: target.dark.bl,
      lTl: target.light.tl,
      lTr: target.light.tr,
      lBr: target.light.br,
      lBl: target.light.bl,
      duration,
      ease,
      onUpdate() {
        const keys: PanelKey[] = ['dark', 'light']
        for (const key of keys) {
          const prefix = key === 'dark' ? 'd' : 'l'
          const points: ClipPoints = {
            tl: proxy[`${prefix}Tl` as keyof typeof proxy] as number,
            tr: proxy[`${prefix}Tr` as keyof typeof proxy] as number,
            br: proxy[`${prefix}Br` as keyof typeof proxy] as number,
            bl: proxy[`${prefix}Bl` as keyof typeof proxy] as number,
          }
          clipState.current[key] = points
          const el = panelRefs.current[key]
          if (el) el.style.clipPath = clipToString(points)
        }
      },
    })
  }, [])

  const handleHover = useCallback((key: PanelKey | null) => {
    if (expandedRef.current) return
    if (key) {
      animateTo(HOVER[key], 0.25, 'back.out(1.7)')
    } else {
      animateTo(INITIAL, 0.2, 'power1.out')
    }
  }, [animateTo])

  const handleClick = useCallback((key: PanelKey) => {
    if (expandedRef.current === key) {
      expandedRef.current = null
      animateTo(HOVER[key], 0.35, 'expo.out')
    } else {
      expandedRef.current = key
      animateTo(EXPANDED[key], 0.4, 'expo.out')
    }
  }, [animateTo])

  const handleMouseLeave = useCallback(() => {
    expandedRef.current = null
    animateTo(INITIAL, 0.4, 'expo.out')
  }, [animateTo])

  useEffect(() => {
    return () => {
      if (tweenRef.current) tweenRef.current.kill()
    }
  }, [])

  return (
    <div
      className={className}
      style={{ width: '100%', maxWidth: 800, perspective: '1000px' }}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="relative overflow-hidden rounded-xl transition-transform duration-200"
        style={{
          aspectRatio: '800 / 480',
          transform: 'rotateX(0deg) rotateY(0deg)',
          transformStyle: 'preserve-3d',
        }}
      >
        <CodePanel
          theme={darkTheme}
          label={darkTheme.label}
          labelPosition="left"
          panelKey="dark"
          panelRef={(el) => { panelRefs.current.dark = el }}
          onHover={handleHover}
          onClick={handleClick}
        />
        <CodePanel
          theme={lightTheme}
          label={lightTheme.label}
          labelPosition="right"
          panelKey="light"
          panelRef={(el) => { panelRefs.current.light = el }}
          onHover={handleHover}
          onClick={handleClick}
        />
      </div>
    </div>
  )
}