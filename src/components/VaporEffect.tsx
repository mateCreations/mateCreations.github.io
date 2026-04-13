import { useEffect, useState } from 'react'
import { useTheme } from '../context/ThemeContext'

interface Particle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export default function VaporEffect() {
  const { isDark } = useTheme()
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: 38 + Math.random() * 24,
      delay: i * 0.3,
      duration: 2.5 + Math.random() * 1.5,
      size: 12 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.2,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 pointer-events-none z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '35%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: isDark
              ? `radial-gradient(circle, rgba(255, 255, 255, 0.5) 0%, rgba(200, 200, 200, 0.25) 40%, transparent 70%)`
              : `radial-gradient(circle, rgba(160, 120, 80, 0.5) 0%, rgba(120, 80, 40, 0.25) 40%, transparent 70%)`,
            filter: 'blur(2px)',
            animation: `vapor-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes vapor-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.35;
          }
          40% {
            opacity: 0.25;
          }
          100% {
            transform: translateY(-70px) scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}