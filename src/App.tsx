import { ThemeProvider } from './context/ThemeContext'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import CodeDuo from './components/CodeDuo'
import Palette from './components/Palette'
import Stats from './components/Stats'
import Install from './components/Install'
import Footer from './components/Footer'

function App() {
  return (
    <ThemeProvider>
      <ScrollProgress />
      <div className="flex flex-col items-center">
        <Hero />
        <CodeDuo />
        <Palette />
        <Stats />
        <Install />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App