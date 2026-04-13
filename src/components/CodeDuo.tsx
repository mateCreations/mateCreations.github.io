import CodeWindow from './CodeWindow'
import { yerbaMate, terere } from '../theme/colors'

export default function CodeDuo() {
  return (
    <section id="preview" className="w-full max-w-6xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row gap-6">
        <CodeWindow theme={yerbaMate} />
        <CodeWindow theme={terere} />
      </div>
    </section>
  )
}
