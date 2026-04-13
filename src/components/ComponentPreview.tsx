import type { ThemeColors } from '../theme/colors'
import ContrastBadge from './ContrastBadge'

interface Props {
  theme: ThemeColors
}

export default function ComponentPreview({ theme }: Props) {
  return (
    <div
      className="rounded-xl p-6 flex flex-col gap-6"
      style={{ backgroundColor: theme.bg, border: `1px solid ${theme.bg1}` }}
    >
      <h3 className="text-sm font-semibold" style={{ color: theme.accent }}>
        Live Preview
      </h3>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105"
            style={{ backgroundColor: theme.accent, color: theme.bg }}
          >
            Primary Button
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-transform hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: theme.accent,
              border: `1px solid ${theme.accent}`,
            }}
          >
            Secondary
          </button>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium"
            style={{ backgroundColor: theme.bg1, color: theme.fg }}
          >
            Ghost
          </button>
        </div>

        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: theme.bg1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium" style={{ color: theme.fg }}>Card Title</span>
            <ContrastBadge foreground={theme.fg} background={theme.bg1} />
          </div>
          <p className="text-sm" style={{ color: theme.comment }}>
            This is a sample card component showing how text and backgrounds work together.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              defaultChecked
              className="w-4 h-4 rounded"
              style={{ accentColor: theme.accent }}
            />
            <span className="text-sm" style={{ color: theme.fg }}>Checkbox</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ border: `2px solid ${theme.accent}`, backgroundColor: theme.accent }}
            />
            <span className="text-sm" style={{ color: theme.fg }}>Radio</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm" style={{ color: theme.fg }}>Input Field</label>
          <input
            type="text"
            placeholder="Type something..."
            className="px-3 py-2 rounded-lg text-sm outline-none transition-all focus:ring-2"
            style={{
              backgroundColor: theme.bg,
              color: theme.fg,
              border: `1px solid ${theme.bg1}`,
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: theme.comment }}>Contrast:</span>
          <ContrastBadge foreground={theme.fg} background={theme.bg} size="md" />
          <ContrastBadge foreground={theme.keyword} background={theme.bg} size="md" />
        </div>
      </div>
    </div>
  )
}