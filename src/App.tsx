import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import HeroScene from './components/3d/HeroScene'

export default function App() {
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

        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-ai/20 flex items-center justify-center">
            <span className="text-xl">🎙</span>
          </div>
          <p className="text-ink-3 text-sm">Napauta aloittaaksesi</p>
        </div>
      </div>
    </div>
  )
}
