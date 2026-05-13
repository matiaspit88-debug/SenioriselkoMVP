import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Guide } from '../../lib/guides'
import { GUIDES } from '../../lib/guides'
import GuideStepScene from '../3d/GuideStepScene'

interface GuideScreenProps {
  guide?: Guide | null
  onBack?: () => void
}

export default function GuideScreen({ guide, onBack }: GuideScreenProps) {
  const activeGuide = guide ?? GUIDES[0]
  const [step, setStep] = useState(0)
  const s = activeGuide.steps[step]
  const isFirst = step === 0
  const isLast  = step === activeGuide.steps.length - 1

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
        <div className="w-11 h-11" />
      </div>

      {/* ── Step counter + title ── */}
      <div className="px-6 shrink-0">
        <p className="text-xs font-medium tracking-widest uppercase text-[#8E867D] mb-1">
          Vaihe {step + 1} / {activeGuide.steps.length}
        </p>
        <h1
          key={step}
          className="font-serif italic text-[#1A1714] leading-tight animate-fade"
          style={{ fontSize: 32 }}
        >
          {s.title}
        </h1>
      </div>

      {/* ── 3D illustration card ── */}
      <div className="mx-6 mt-3 shrink-0 rounded-[28px] overflow-hidden border border-black/[0.06]"
           style={{ height: 200, background: 'linear-gradient(160deg,#FBF9F5,#F0E6DC)' }}>
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
        className="px-6 mt-4 text-[#5A544D] leading-relaxed animate-fade shrink-0"
        style={{ fontSize: 18 }}
      >
        {s.body}
      </p>

      {/* ── Progress dots ── */}
      <div className="flex justify-center gap-2 mt-4 shrink-0">
        {activeGuide.steps.map((_, i) => (
          <div
            key={i}
            className="h-2 rounded-full transition-all duration-300"
            style={{
              width: i === step ? 24 : 8,
              background: i <= step ? '#1A1714' : '#C9C2B7',
            }}
          />
        ))}
      </div>

      {/* ── Nav buttons — fixed above safe area ── */}
      <div
        className="mt-auto px-6 pt-4 flex gap-3 shrink-0"
        style={{ paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))' }}
      >
        <button
          onClick={prev}
          style={{
            height: 64, paddingLeft: 24, paddingRight: 24, borderRadius: 32,
            border: '1px solid rgba(0,0,0,0.08)',
            background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(10px)',
            color: '#5A544D', fontWeight: 500, fontSize: 17,
            display: 'flex', alignItems: 'center', gap: 8,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 12L5 8l5-4" />
          </svg>
          {isFirst ? 'Takaisin' : 'Edellinen'}
        </button>
        <button
          onClick={next}
          style={{
            flex: 1, height: 64, borderRadius: 32, border: 'none',
            background: '#1A1714', color: '#fff',
            fontWeight: 600, fontSize: 17,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'inherit', cursor: 'pointer',
          }}
        >
          {isLast ? 'Valmis ✓' : 'Seuraava'}
          {!isLast && (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 12l5-4-5-4" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}
