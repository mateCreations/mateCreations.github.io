const REPOS = [
  { label: 'Neovim', href: 'https://github.com/mateCreations/yerba-mate.nvim' },
  { label: 'VS Code', href: 'https://github.com/mateCreations/vscode-yerba-mate' },
  { label: 'Obsidian', href: 'https://github.com/mateCreations/obsidian-yerba-mate' },
  { label: 'Omarchy', href: 'https://github.com/mateCreations/omarchy-yerba-mate' },
  { label: 'Zen Browser', href: 'https://github.com/mateCreations/zen-yerba-mate' },
  { label: 'LibreWolf', href: 'https://github.com/mateCreations/librewolf-yerba-mate' },
]

export default function Footer() {
  return (
    <footer
      className="w-full py-12 px-4 mt-8"
      style={{ borderTop: '1px solid #282d1c' }}
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
              style={{ color: '#7a8573' }}
            >
              {r.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4 text-xs" style={{ color: '#4f5b4a' }}>
          <a
            href="https://github.com/mateCreations"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
            style={{ color: '#4f5b4a' }}
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
