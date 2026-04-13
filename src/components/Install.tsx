import { useState } from 'react'
import { installTabs } from '../data/installSteps'
import type { InstallContent } from '../data/installSteps'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useTheme } from '../context/ThemeContext'

function CopyButton({ code, theme }: { code: string; theme: ReturnType<typeof useTheme>['theme'] }) {
  const [copied, setCopied] = useState(false)
  const [animating, setAnimating] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setAnimating(true)
      setTimeout(() => {
        setCopied(false)
        setAnimating(false)
      }, 2000)
    })
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 text-xs px-2 py-1 rounded transition-all duration-200"
      style={{
        backgroundColor: copied ? theme.string : theme.bg1,
        color: copied ? theme.bg : theme.comment,
        border: `1px solid ${copied ? theme.string : theme.bg1}`,
        transform: animating ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {copied ? '✓ Copied!' : 'Copy'}
    </button>
  )
}

function ContentBlock({ item, theme }: { item: InstallContent; theme: ReturnType<typeof useTheme>['theme'] }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium" style={{ color: theme.comment }}>
        {item.variantLabel}
      </span>

      {item.code && (
        <div className="relative">
          <pre
            className="text-sm font-mono rounded-lg p-4 pr-16 overflow-x-auto text-left"
            style={{ backgroundColor: theme.bg1, color: theme.fg, border: `1px solid ${theme.bg1}` }}
          >
            {item.code}
          </pre>
          <CopyButton code={item.code} theme={theme} />
        </div>
      )}

      {item.linkHref && (
        <a
          href={item.linkHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-lg w-fit transition-opacity hover:opacity-80"
          style={{ backgroundColor: theme.bg1, color: theme.function, border: `1px solid ${theme.bg1}` }}
        >
          {item.linkLabel}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
          </svg>
        </a>
      )}
    </div>
  )
}

export default function Install() {
  const [activeTab, setActiveTab] = useState('neovim')
  const active = installTabs.find((t) => t.id === activeTab)!
  const ref = useScrollReveal<HTMLElement>()
  const { theme } = useTheme()

  return (
    <section ref={ref} id="install" className="reveal w-full py-16 px-4" style={{ backgroundColor: theme.bg }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold tracking-tight mb-8 text-center" style={{ color: theme.fg }}>
          Install
        </h2>

        <div
          className="flex gap-1 mb-6 rounded-lg p-1 flex-wrap"
          style={{ backgroundColor: theme.bg1 }}
        >
          {installTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
              style={{
                backgroundColor: activeTab === tab.id ? theme.string : 'transparent',
                color: activeTab === tab.id ? theme.bg : theme.comment,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-6">
          {active.content.map((item, i) => (
            <ContentBlock key={i} item={item} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  )
}
