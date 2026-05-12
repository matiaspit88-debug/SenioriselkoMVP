import { Suspense, useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import type { Screen, Message } from './types'
import type { ClaudeMessage } from './lib/claude'
import HeroScene from './components/3d/HeroScene'
import PinScreen from './components/screens/PinScreen'
import HomeScreen from './components/screens/HomeScreen'
import AIScreen from './components/screens/AIScreen'
import ChatScreen from './components/screens/ChatScreen'
import HelpScreen from './components/screens/HelpScreen'
import GuideScreen from './components/screens/GuideScreen'
import SOSScreen from './components/screens/SOSScreen'
import Drawer from './components/ui/Drawer'

export interface ModeSession {
  msgs: Message[]
  history: ClaudeMessage[]
  started: boolean
}

const MILO_INIT: Message[] = [
  { from: 'bot',  text: 'Hei Aino! Mukava kuulla sinusta. Miltä sinusta tuntuu tänä iltapäivänä?' },
  { from: 'user', text: 'Sade taukosi vihdoin. Kävin pihalla.' },
  { from: 'bot',  text: 'Voi kuinka ihana! Tuoksuiko ilma raikkaalta sateen jälkeen?' },
  { from: 'user', text: 'Mullalta tuoksui. Liisa tulee illalla.' },
  { from: 'bot',  text: 'Ihana juttu — Liisahan on tyttäresi. Mitä aiotte tehdä yhdessä?' },
]

const APURI_INIT: Message[] = [
  { from: 'bot',  text: 'Hei Aino! Mitä haluaisit tietää tänään? Kysy rohkeasti.' },
  { from: 'user', text: 'Milloin apteekki on auki?' },
  { from: 'bot',  text: 'Apteekki: arkisin 9–18, lauantai 9–15, sunnuntai kiinni.' },
]

function HeroView({ onStart }: { onStart: () => void }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 50% 55%, #3D2A1A 0%, #281B11 65%, #1A1108 100%)',
      overflow: 'hidden', position: 'relative',
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
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '0 24px max(56px, env(safe-area-inset-bottom, 56px))',
      }}>
        <button
          onClick={onStart}
          style={{
            width: 132, height: 132, borderRadius: '50%',
            border: '1px solid rgba(255, 240, 215, 0.20)',
            color: '#F5E9D2',
            fontWeight: 500, fontSize: 22,
            fontFamily: 'var(--serif)', fontStyle: 'italic',
            background: 'linear-gradient(145deg, rgba(255,220,170,0.10) 0%, rgba(180,90,40,0.08) 50%, rgba(40,20,12,0.14) 100%)',
            backdropFilter: 'blur(22px) saturate(180%)',
            WebkitBackdropFilter: 'blur(22px) saturate(180%)',
            boxShadow: 'inset 0 1.5px 0 rgba(255,250,235,0.30), inset 0 -1.5px 0 rgba(0,0,0,0.10), 0 6px 28px rgba(232,150,80,0.18), 0 0 60px rgba(255,170,90,0.10)',
            textShadow: '0 1px 8px rgba(0,0,0,0.55)',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          Aloita
        </button>
      </div>
    </div>
  )
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('pin')
  const [drawer, setDrawer] = useState(false)
  const [fontSize, setFontSize] = useState(18)

  const [miloSession, setMiloSession] = useState<ModeSession>({
    msgs: MILO_INIT, history: [], started: false,
  })
  const [apuriSession, setApuriSession] = useState<ModeSession>({
    msgs: APURI_INIT, history: [], started: false,
  })

  const navigate = useCallback((s: Screen) => setScreen(s), [])
  const openDrawer  = useCallback(() => setDrawer(true), [])
  const closeDrawer = useCallback(() => setDrawer(false), [])

  if (screen === 'pin')  return <PinScreen onSuccess={() => navigate('hero')} />
  if (screen === 'hero') return <HeroView  onStart={() => navigate('home')} />

  const renderScreen = () => {
    switch (screen) {
      case 'home':  return <HomeScreen onNavigate={navigate} onMenu={openDrawer} />
      case 'ai':    return <AIScreen   onNavigate={navigate} onMenu={openDrawer} />
      case 'chat':  return (
        <ChatScreen
          onNavigate={navigate}
          onMenu={openDrawer}
          miloSession={miloSession}
          setMiloSession={setMiloSession}
          apuriSession={apuriSession}
          setApuriSession={setApuriSession}
        />
      )
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
