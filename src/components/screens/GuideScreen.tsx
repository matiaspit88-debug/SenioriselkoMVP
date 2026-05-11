import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import GuideStepScene from '../3d/GuideStepScene'

const STEPS = [
  {
    title: 'Avaa kameraohjelma',
    body: 'Etsi puhelimesi etusivulta kameran kuvake. Se näyttää pieneltä kameralta.',
  },
  {
    title: 'Napauta kameran kuvaketta',
    body: 'Paina kamerakuvaketta kerran. Ohjelma avautuu muutamassa sekunnissa.',
  },
  {
    title: 'Valitse selfie-tila',
    body: 'Etsi pyöreä nuoli-kuvake. Sen avulla kamera kääntyy katsomaan sinuun päin.',
  },
  {
    title: 'Katso kameraan',
    body: 'Katso suoraan puhelimen etukameraan ja hymyile. Olet valmis!',
  },
  {
    title: 'Ota kuva',
    body: 'Paina isoa pyöreää nappia ruudun alareunassa. Kuva on otettu!',
  },
]

interface GuideScreenProps {
  onBack?: () => void
}

export default function GuideScreen({ onBack }: GuideScreenProps) {
  const [step, setStep] = useState(0)
  const s = STEPS[step]
  const isFirst = step === 0
  const isLast  = step === STEPS.length - 1

  const prev = () => (isFirst ? onBack?.() : setStep(n => n - 1))
  const next = () => (isLast  ? onBack?.() : setStep(n => n + 1))

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F4F1EC] font-sans flex flex-col">

      {/* ── Top bar ── */}
      <div className="flex items-center justify-between px-6 pb-3 shrink-0" style={{ paddingTop: 'max(56px, calc(14px + env(safe-area-inset-top, 0px)))' }}>
        <button
          onClick={onBack}
          className="w-11 h-11 rounded-full bg-white/70 backdrop-blur flex items-center justify-center border border-black/5 text-[#5A544D]"
          aria-label="Takaisin"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 14L6 9l5-5" />
          </svg>
        </button>
        <span className="text-xs font-medium tracking-widest uppercase text-[#8E867D]">
          Ohjeet
        </span>
        <button
          className="px-4 py-2 rounded-full bg-white/70 backdrop-blur text-sm font-medium text-[#5A544D] border border-black/5"
        >
          Kuuntele
        </button>
      </div>

      {/* ── Step counter + title ── */}
      <div className="px-6 shrink-0">
        <p className="text-xs font-medium tracking-widest uppercase text-[#8E867D] mb-2">
          Vaihe {step + 1} / {STEPS.length}
        </p>
        <h1
          key={step}
          className="font-serif italic text-[#1A1714] text-4xl leading-tight animate-fade"
        >
          {s.title}
        </h1>
      </div>

      {/* ── 3D illustration card ── */}
      <div className="mx-6 mt-4 shrink-0 rounded-[28px] overflow-hidden border border-black/[0.06]"
           style={{ height: 230, background: 'linear-gradient(160deg,#FBF9F5,#F0E6DC)' }}>
        <Canvas
          key={step}
          camera={{ position: [0, 0, 3.2], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={null}>
            <GuideStepScene step={step} />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Body text ── */}
      <p
        key={step + 'b'}
        className="px-6 mt-5 text-[#5A544D] text-lg leading-relaxed animate-fade shrink-0"
      >
        {s.body}
      </p>

      {/* ── Progress dots ── */}
      <div className="flex justify-center gap-2 mt-5 shrink-0">
        {STEPS.map((_, i) => (
          <div
            key={i}
            className="h-2.5 rounded-full transition-all duration-300"
            style={{
              width: i === step ? 28 : 10,
              background: i <= step ? '#1A1714' : '#C9C2B7',
            }}
          />
        ))}
      </div>

      {/* ── Nav buttons ── */}
      <div className="mt-auto px-6 pb-10 pt-4 flex gap-3 shrink-0">
        <button
          onClick={prev}
          className="h-16 px-7 rounded-[32px] border border-black/[0.08] bg-white/80 backdrop-blur text-[#5A544D] font-medium text-lg flex items-center gap-2"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L5 8l5-4" />
          </svg>
          Edellinen
        </button>
        <button
          onClick={next}
          className="flex-1 h-16 rounded-[32px] bg-[#1A1714] text-white font-semibold text-lg flex items-center justify-center gap-2"
        >
          {isLast ? 'Valmis ✓' : 'Seuraava'}
          {!isLast && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
              <path d="M6 12l5-4-5-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
