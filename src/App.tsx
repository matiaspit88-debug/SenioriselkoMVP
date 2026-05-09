import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Screen } from './types'
import HeroScene from './components/3d/HeroScene'
import HomeScreen from './components/screens/HomeScreen'
import AIScreen from './components/screens/AIScreen'
import ChatScreen from './components/screens/ChatScreen'
import HelpScreen from './components/screens/HelpScreen'
import GuideScreen from './components/screens/GuideScreen'
import SOSScreen from './components/screens/SOSScreen'
import Drawer from './components/ui/Drawer'

const SECTIONS = [
  { label: 'Apuri',  color: '#3F7FE0', bg: 'rgba(63,127,224,0.12)' },
  { label: 'Onni',   color: '#A381DC', bg: 'rgba(163,129,220,0.12)' },
  { label: 'Ohjeet', color: '#F18A6E', bg: 'rgba(241,138,110,0.12)' },
  { label: 'Hätä',   color: '#F0973A', bg: 'rgba(240,151,58,0.12)'  },
]

function HeroView({ onStart }: { onStart: () => void }) {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#F4F1EC]">
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
        <div className="text-center">
          <p className="font-serif italic text-[#1A1714] text-5xl leading-tight tracking-tight">SenioriSelko</p>
          <p className="mt-1 text-[#8E867D] text-sm tracking-widest uppercase font-medium">Lämmin appi senioreille</p>
        </div>

        <div className="flex flex-col items-center gap-5 text-center">
          <div>
            <p className="font-serif italic text-[#1A1714] leading-snug" style={{ fontSize: 30 }}>
              Täällä voit puhua<br /><em>kaiken ääneen.</em>
            </p>
            <p className="mt-3 text-[#8E867D] text-sm tracking-wide">
              Ei tuomita.&nbsp; Ei kiirettä.&nbsp; Aina paikalla.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-1">
            {SECTIONS.map(s => (
              <span key={s.label} style={{ background: s.bg, color: s.color }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm">
                <span style={{ background: s.color }} className="w-2 h-2 rounded-full inline-block" />
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center gap-3 pointer-events-auto">
          <button
            onClick={onStart}
            className="px-8 py-4 rounded-full text-white font-semibold text-base shadow-lg"
            style={{ background: 'linear-gradient(135deg, #3F7FE0 0%, #A381DC 100%)', boxShadow: '0 8px 28px rgba(63,127,224,0.35)', minHeight: 56 }}
          >
            Aloita →
          </button>
          <p className="text-[#8E867D] text-xs tracking-wide">Turvallinen &amp; yksityinen</p>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('hero')
  const [drawer, setDrawer] = useState(false)
  const [fontSize, setFontSize] = useState(18)

  const navigate = useCallback((s: Screen) => setScreen(s), [])
  const openDrawer  = useCallback(() => setDrawer(true), [])
  const closeDrawer = useCallback(() => setDrawer(false), [])

  if (screen === 'hero') {
    return <HeroView onStart={() => navigate('home')} />
  }

  const renderScreen = () => {
    switch (screen) {
      case 'home':  return <HomeScreen onNavigate={navigate} onMenu={openDrawer} />
      case 'ai':    return <AIScreen   onNavigate={navigate} onMenu={openDrawer} />
      case 'chat':  return <ChatScreen onNavigate={navigate} onMenu={openDrawer} />
      case 'book':  return <HelpScreen onNavigate={navigate} onMenu={openDrawer} />
      case 'guide': return <GuideScreen onBack={() => navigate('book')} />
      case 'sos':   return <SOSScreen  onNavigate={navigate} />
      default:      return <HomeScreen onNavigate={navigate} onMenu={openDrawer} />
    }
  }

  return (
    <div className="ss-screen" style={{ fontSize }}>
      <div key={screen} className="screen-enter" style={{ width: '100%', height: '100%' }}>
        {renderScreen()}
      </div>
      {drawer && (
        <Drawer
          open={drawer}
          onClose={closeDrawer}
          onNavigate={navigate}
          fontSize={fontSize}
          setFontSize={setFontSize}
        />
      )}
    </div>
  )
}
