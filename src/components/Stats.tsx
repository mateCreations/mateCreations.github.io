import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface StatDef {
  value: number
  suffix?: string
  label: string
  delay: number
  color: string
}

const STATS: StatDef[] = [
  { value: 2,   label: 'Variants',           delay: 0,   color: '#8fb339' },
  { value: 6,   label: 'Ports',              delay: 150, color: '#7eb2d1' },
  { value: 100, suffix: '+', label: 'Treesitter groups', delay: 300, color: '#a67c52' },
]

function StatCard({ value, suffix = '', label, delay, color }: StatDef) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        observer.disconnect()

        const duration = 1000
        const intervalMs = duration / value

        const timer = setTimeout(() => {
          let current = 0
          const step = setInterval(() => {
            current++
            setCount(current)
            if (current >= value) clearInterval(step)
          }, intervalMs)
        }, delay)

        return () => clearTimeout(timer)
      }
    }, { threshold: 0.5 })

    observer.observe(el)
    return () => observer.disconnect()
  }, [value, delay])

  return (
    <div ref={ref} className="flex flex-col items-center gap-2">
      <span
        className="text-5xl font-bold font-mono tabular-nums"
        style={{ color }}
      >
        {count}{count >= value ? suffix : ''}
      </span>
      <span
        className="text-xs font-medium tracking-widest uppercase"
        style={{ color: '#4f5b4a' }}
      >
        {label}
      </span>
    </div>
  )
}

export default function Stats() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="reveal w-full py-14 px-4" style={{ backgroundColor: '#1c1e13' }}>
      <div className="max-w-2xl mx-auto grid grid-cols-3 gap-8">
        {STATS.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>
    </section>
  )
}
