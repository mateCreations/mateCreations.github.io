import { useTheme } from '../context/ThemeContext'

const REPOS = [
  { label: 'Neovim', href: 'https://github.com/mateCreations/yerba-mate.nvim' },
  { label: 'VS Code', href: 'https://github.com/mateCreations/vscode-yerba-mate' },
  { label: 'Obsidian', href: 'https://github.com/mateCreations/obsidian-yerba-mate' },
  { label: 'Omarchy', href: 'https://github.com/mateCreations/omarchy-yerba-mate' },
  { label: 'Zen Browser', href: 'https://github.com/mateCreations/zen-yerba-mate' },
  { label: 'LibreWolf', href: 'https://github.com/mateCreations/librewolf-yerba-mate' },
]

export default function Footer() {
  const { theme } = useTheme()

  return (
    <footer
      className="w-full py-12 px-4 mt-8"
      style={{ borderTop: `1px solid ${theme.bg1}` }}
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <img src="/logo.png" alt="Mate Creations" className="w-8 h-8 opacity-60" />

        <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
          {REPOS.map((r) => (
            <a
              key={r.label}
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm transition-colors hover:opacity-100"
              style={{ color: theme.comment }}
            >
              {r.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs" style={{ color: theme.comment }}>
          <a
            href="https://github.com/mateCreations"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: theme.comment }}
          >
            github.com/mateCreations
          </a>
          <span>·</span>
          <span>MIT License</span>
        </div>
      </div>
    </footer>
  )
}
