import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './components/3d/HeroScene'
import GuideScreen from './components/screens/GuideScreen'

type Screen = 'hero' | 'guide'

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" width={28} height={28} fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="12" rx="3" />
      <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
    </svg>
  )
}

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

      <div className="relative z-10 flex flex-col items-center justify-between h-full px-6 pt-16 pb-12 pointer-events-none select-none">
        <div className="text-center">
          <p className="font-serif italic text-ink text-5xl leading-tight">SenioriSelko</p>
          <p className="mt-2 text-ink-2 text-base tracking-wide">Lämmin appi senioreille</p>
        </div>

        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <div className="w-14 h-14 rounded-full bg-ai/20 flex items-center justify-center text-ai">
            <MicIcon />
          </div>
          <p className="text-ink-3 text-sm">Napauta aloittaaksesi</p>
          <button
            onClick={() => setScreen('guide')}
            className="mt-2 px-5 py-2 rounded-full bg-white/70 text-sm font-medium text-ink-2 backdrop-blur border border-black/5"
          >
            Kokeile Ohjeet →
          </button>
        </div>
      </div>
    </div>
  )
}
