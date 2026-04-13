import Hero from './components/Hero'
import CodeDuo from './components/CodeDuo'
import Palette from './components/Palette'
import Install from './components/Install'
import Footer from './components/Footer'

function App() {
  return (
    <div className="flex flex-col items-center">
      <Hero />
      <CodeDuo />
      <Palette />
      <Install />
      <Footer />
    </div>
  )
}

export default App
