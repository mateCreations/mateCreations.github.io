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
    const newParticles: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 30 + Math.random() * 40,
      delay: i * 0.25,
      duration: 2.5 + Math.random() * 1.5,
      size: 14 + Math.random() * 18,
      opacity: 0.35 + Math.random() * 0.25,
    }))
    setParticles(newParticles)
  }, [])

  const gradientColor = isDark
    ? 'rgba(255, 255, 255, 0.5), rgba(200, 200, 200, 0.3)'
    : 'rgba(139, 90, 43, 0.5), rgba(100, 60, 20, 0.3)'

  return (
    <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-24 pointer-events-none z-20">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: '40%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: `radial-gradient(circle, ${gradientColor.split(', ')[0]} 0%, ${gradientColor.split(', ')[1]} 40%, transparent 70%)`,
            filter: 'blur(2px)',
            animation: `vapor-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes vapor-rise {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0.4;
          }
          30% {
            opacity: 0.35;
          }
          100% {
            transform: translateY(-80px) scale(2) rotate(15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}