import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export default function VaporEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: 35 + Math.random() * 30,
      delay: i * 0.4,
      duration: 3 + Math.random() * 2,
      size: 8 + Math.random() * 12,
      opacity: 0.15 + Math.random() * 0.15,
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
            bottom: '50%',
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            background: 'radial-gradient(circle, rgba(212, 136, 86, 0.4) 0%, rgba(212, 136, 86, 0.1) 50%, transparent 70%)',
            filter: 'blur(4px)',
            animation: `vapor-rise ${p.duration}s ease-out infinite`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes vapor-rise {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0.25;
          }
          50% {
            opacity: 0.15;
          }
          100% {
            transform: translateY(-60px) scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}