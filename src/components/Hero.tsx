export default function Hero() {
  return (
    <section className="flex flex-col items-center pt-24 pb-10 px-4 text-center">
      <img src="/logo.png" alt="Mate Creations" className="w-20 h-20 mb-6" />

      <h1 className="text-5xl font-bold tracking-tight mb-3" style={{ color: '#dce0d9' }}>
        Mate Creations
      </h1>

      <p className="text-lg mb-8" style={{ color: '#7a8573' }}>
        Two themes. Dark and light.
      </p>

      <div className="flex gap-3">
        <span
          className="text-sm font-mono px-3 py-1 rounded-full"
          style={{ backgroundColor: '#282d1c', color: '#a67c52', border: '1px solid #363c26' }}
        >
          yerba-mate
        </span>
        <span
          className="text-sm font-mono px-3 py-1 rounded-full"
          style={{ backgroundColor: '#f5e9b8', color: '#7a5f00', border: '1px solid #e8d98a' }}
        >
          terere
        </span>
      </div>

      <div className="flex gap-4 mt-10">
        <a
          href="#install"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#a67c52', color: '#1c1e13' }}
        >
          Install
        </a>
        <a
          href="https://github.com/mateCreations"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-80"
          style={{ backgroundColor: '#282d1c', color: '#dce0d9', border: '1px solid #363c26' }}
        >
          GitHub
        </a>
      </div>
    </section>
  )
}
