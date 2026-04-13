import ThemeToggle from './ThemeToggle'
import { useTheme } from '../context/ThemeContext'

export default function Hero() {
  const { theme, setTheme, isDark } = useTheme()

  return (
    <section className="relative flex flex-col items-center pt-24 pb-10 px-4 text-center overflow-hidden">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[600px] -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.accent}20 0%, transparent 70%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      <img
        src="/logo.png"
        alt="Mate Creations"
        className="w-20 h-20 mb-6 relative z-10 transition-transform duration-300 hover:scale-110 hover:rotate-3"
      />

      <h1 className="text-5xl font-bold tracking-tight mb-3 relative z-10" style={{ color: theme.fg }}>
        Mate Creations
      </h1>

      <p className="text-lg mb-8 relative z-10" style={{ color: theme.comment }}>
        Two themes. Dark and light.
      </p>

      <div className="flex gap-3 mb-6 relative z-10">
        <span
          className="text-sm font-mono px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: isDark ? theme.bg1 : theme.accent,
            color: isDark ? theme.accent : theme.bg,
            border: `1px solid ${isDark ? theme.bg1 : theme.accent}`,
          }}
        >
          yerba-mate
        </span>
        <span
          className="text-sm font-mono px-3 py-1 rounded-full transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: isDark ? theme.accent : theme.bg1,
            color: isDark ? theme.bg : theme.fg,
            border: `1px solid ${isDark ? theme.accent : theme.bg1}`,
          }}
        >
          terere
        </span>
      </div>

      <div className="relative z-10">
        <ThemeToggle onThemeChange={setTheme} currentTheme={theme} />
      </div>

      <div className="flex gap-4 mt-10 relative z-10">
        <a
          href="#install"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg"
          style={{ backgroundColor: theme.accent, color: theme.bg, boxShadow: `0 4px 20px ${theme.accent}40` }}
        >
          Install
        </a>
        <a
          href="https://github.com/mateCreations"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105"
          style={{
            backgroundColor: theme.bg1,
            color: theme.fg,
            border: `1px solid ${theme.bg1}`,
          }}
        >
          GitHub
        </a>
      </div>
    </section>
  )
}