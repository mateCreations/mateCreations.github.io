import CodeWindow from './CodeWindow'
import { yerbaMate, terere } from '../theme/colors'

export default function CodeDuo() {
  return (
    <section id="preview" className="w-full px-4 py-16" style={{ backgroundColor: '#282d1c' }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        <CodeWindow theme={yerbaMate} />
        <CodeWindow theme={terere} />
      </div>
    </section>
  )
}
