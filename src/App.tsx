import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './components/3d/HeroScene'
import GuideScreen from './components/screens/GuideScreen'

type Screen = 'hero' | 'guide'

const SECTIONS = [
  { label: 'Apuri',      color: '#3F7FE0', bg: 'rgba(63,127,224,0.12)' },
  { label: 'Onni',       color: '#A381DC', bg: 'rgba(163,129,220,0.12)' },
  { label: 'Ohjeet',     color: '#F18A6E', bg: 'rgba(241,138,110,0.12)' },
  { label: 'Hätä',       color: '#F0973A', bg: 'rgba(240,151,58,0.12)' },
]

export default function App() {
  const [screen, setScreen] = useState<Screen>('hero')

  if (screen === 'guide') {
    return <GuideScreen onBack={() => setScreen('hero')} />
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-bg">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        className="absolute inset-0"
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <HeroScene />
        </Suspense>
      </Canvas>

      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 pt-14 pb-10 pointer-events-none select-none">

        {/* Brand */}
        <div className="text-center">
          <p className="font-serif italic text-ink text-5xl leading-tight tracking-tight">
            SenioriSelko
          </p>
          <p className="mt-1 text-ink-3 text-sm tracking-widest uppercase font-medium">
            Lämmin appi senioreille
          </p>
        </div>

        {/* Center trust message */}
        <div className="flex flex-col items-center gap-5 text-center">
          <div>
            <p className="font-serif italic text-ink leading-snug" style={{ fontSize: 30 }}>
              Täällä voit puhua<br />
              <em>kaiken ääneen.</em>
            </p>
            <p className="mt-3 text-ink-3 text-sm tracking-wide">
              Ei tuomita.&nbsp; Ei kiirettä.&nbsp; Aina paikalla.
            </p>
          </div>

          {/* Section pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {SECTIONS.map((s) => (
              <span
                key={s.label}
                style={{ background: s.bg, color: s.color }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm"
              >
                <span
                  style={{ background: s.color }}
                  className="w-2 h-2 rounded-full inline-block"
                />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <button
            onClick={() => setScreen('guide')}
            className="px-8 py-4 rounded-full text-white font-semibold text-base shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #3F7FE0 0%, #A381DC 100%)',
              boxShadow: '0 8px 28px rgba(63,127,224,0.35)',
              minHeight: 56,
            }}
          >
            Aloita →
          </button>
          <p className="text-ink-3 text-xs tracking-wide">
            Turvallinen &amp; yksityinen
          </p>
        </div>
      </div>
    </div>
  )
}
