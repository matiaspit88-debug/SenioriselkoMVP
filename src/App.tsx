import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Screen } from './types'
import HeroScene from './components/3d/HeroScene'
import PinScreen from './components/screens/PinScreen'
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
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      background: '#F4F1EC', overflow: 'hidden',
    }}>

      <div style={{ flex: 1, minHeight: 0 }}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Canvas>
      </div>


      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
        textAlign: 'center',
        padding: '4px 24px max(28px, env(safe-area-inset-bottom, 28px))',
      }}>
        <div>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: '#1A1714', fontSize: 26, lineHeight: 1.25 }}>
            Täällä voit puhua kaiken ääneen.
          </p>
          <p style={{ color: '#8E867D', fontSize: 13, marginTop: 8 }}>
            Ei tuomita.&nbsp;&nbsp;Ei kiirettä.&nbsp;&nbsp;Aina paikalla.
          </p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 7 }}>
          {SECTIONS.map(s => (
            <span key={s.label} style={{
              background: s.bg, color: s.color,
              display: 'inline-flex', alignItems: 'center', gap: 5,
              padding: '5px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600,
            }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: s.color, flexShrink: 0 }} />
              {s.label}
            </span>
          ))}
        </div>
        <button
          onClick={onStart}
          style={{
            padding: '15px 44px', borderRadius: 999, border: 'none',
            color: '#fff', fontWeight: 700, fontSize: 18,
            background: 'linear-gradient(135deg, #3F7FE0 0%, #A381DC 100%)',
            boxShadow: '0 8px 28px rgba(63,127,224,0.35)',
            minHeight: 58, cursor: 'pointer', fontFamily: 'inherit', width: '100%',
          }}
        >
          Aloita →
        </button>
        <p style={{ color: '#8E867D', fontSize: 12 }}>Turvallinen &amp; yksityinen</p>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('pin')
  const [drawer, setDrawer] = useState(false)
  const [fontSize, setFontSize] = useState(18)

  const navigate = useCallback((s: Screen) => setScreen(s), [])
  const openDrawer  = useCallback(() => setDrawer(true), [])
  const closeDrawer = useCallback(() => setDrawer(false), [])

  if (screen === 'pin')  return <PinScreen onSuccess={() => navigate('hero')} />
  if (screen === 'hero') return <HeroView  onStart={() => navigate('home')} />

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
