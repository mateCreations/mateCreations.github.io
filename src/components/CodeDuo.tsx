import DiptychWindow from './DiptychWindow'
import { yerbaMate, terere } from '../theme/colors'

export default function CodeDuo() {
  return (
    <section id="preview" className="w-full px-4 py-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <DiptychWindow themes={[yerbaMate, terere]} />
      </div>
    </section>
  )
}