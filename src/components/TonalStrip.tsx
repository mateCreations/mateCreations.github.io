import { hexToLab, labToHex } from '../utils/colorUtils'

interface Props {
  baseColor: string
  label: string
  steps?: number
}

export default function TonalStrip({ baseColor, label, steps = 9 }: Props) {
  const baseLab = hexToLab(baseColor)
  
  const tones: string[] = []
  for (let i = 0; i < steps; i++) {
    const L = 10 + (i * 80 / (steps - 1))
    tones.push(labToHex(L, baseLab.a * 0.5, baseLab.b * 0.5))
  }

  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-mono" style={{ color: '#7a8573' }}>{label}</span>
      <div className="flex rounded-lg overflow-hidden h-8">
        {tones.map((tone, i) => (
          <div
            key={i}
            className="flex-1 flex items-center justify-center text-[8px] font-mono"
            style={{
              backgroundColor: tone,
              color: i < steps / 2 ? '#dce0d9' : '#1c1e13',
            }}
          >
            {Math.round(10 + (i * 80 / (steps - 1)))}
          </div>
        ))}
      </div>
    </div>
  )
}