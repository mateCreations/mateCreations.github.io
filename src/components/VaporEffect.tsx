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
    const newParticles: Particle[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 25 + Math.random() * 50,
      delay: i * 0.2,
      duration: 2 + Math.random() * 1,
      size: 20 + Math.random() * 25,
      opacity: 0.5 + Math.random() * 0.3,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-28 h-28 pointer-events-none z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '30%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: isDark
              ? `radial-gradient(circle, rgba(255, 255, 255, 0.7) 0%, rgba(220, 220, 220, 0.4) 40%, transparent 70%)`
              : `radial-gradient(circle, rgba(180, 140, 100, 0.7) 0%, rgba(140, 100, 60, 0.4) 40%, transparent 70%)`,
            filter: 'blur(1px)',
            animation: `vapor-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes vapor-rise {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.6;
          }
          50% {
            opacity: 0.4;
            transform: translateY(-40px) scale(1.3);
          }
          100% {
            transform: translateY(-100px) scale(2.5) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}