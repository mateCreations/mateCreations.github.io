import { useState } from 'react'
import CodeWindow from './CodeWindow'
import { yerbaMate, terere } from '../theme/colors'

type View = 'dark' | 'both' | 'light'

const TABS: { id: View; label: string }[] = [
  { id: 'dark',  label: 'yerba-mate' },
  { id: 'both',  label: 'both' },
  { id: 'light', label: 'terere' },
]

export default function CodeDuo() {
  const [view, setView] = useState<View>('both')

  const showDark  = view !== 'light'
  const showLight = view !== 'dark'

  return (
    <section id="preview" className="w-full px-4 py-16" style={{ backgroundColor: '#282d1c' }}>
      {/* Switcher */}
      <div className="flex justify-center mb-8">
        <div
          className="flex gap-1 rounded-lg p-1"
          style={{ backgroundColor: '#1c1e13' }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setView(tab.id)}
              className="px-4 py-1.5 rounded-md text-sm font-mono transition-colors duration-200"
              style={{
                backgroundColor: view === tab.id ? '#363c26' : 'transparent',
                color: view === tab.id ? '#dce0d9' : '#4f5b4a',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Windows */}
      <div className="max-w-6xl mx-auto flex gap-6 overflow-hidden">
        <div
          style={{
            flex: showDark ? '1 1 0' : '0 0 0',
            opacity: showDark ? 1 : 0,
            overflow: 'hidden',
            minWidth: 0,
            transition: 'flex 0.5s ease, opacity 0.35s ease',
          }}
        >
          <CodeWindow theme={yerbaMate} />
        </div>

        <div
          style={{
            flex: showLight ? '1 1 0' : '0 0 0',
            opacity: showLight ? 1 : 0,
            overflow: 'hidden',
            minWidth: 0,
            transition: 'flex 0.5s ease, opacity 0.35s ease',
          }}
        >
          <CodeWindow theme={terere} />
        </div>
      </div>
    </section>
  )
}
