import { useState } from 'react'
import type { Screen } from '../../types'
import Orb from '../ui/Orb'
import StatusBar from '../ui/StatusBar'
import TopBar from '../ui/TopBar'
import Dock from '../ui/Dock'
import { Icons } from '../ui/icons'

const ctrlBtn: React.CSSProperties = {
  width: 60, height: 60, borderRadius: '50%',
  border: '1px solid var(--hairline)',
  background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: 'var(--ink)', cursor: 'pointer', fontFamily: 'inherit',
}

interface AIScreenProps {
  onNavigate: (s: Screen) => void
  onMenu: () => void
}

export default function AIScreen({ onNavigate, onMenu }: AIScreenProps) {
  const [active, setActive] = useState(true)
  return (
    <div className="ss-screen">
      <StatusBar />
      <TopBar onMenu={onMenu} right={
        <button onClick={() => onNavigate('home')} style={{
          padding: '10px 18px', borderRadius: 999,
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: 'none', fontSize: 15, color: 'var(--ink-2)',
          fontWeight: 500, fontFamily: 'inherit', cursor: 'pointer',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
        }}>
          Lopeta
        </button>
      } />

      <div style={{
        position: 'absolute', top: 116, left: 0, right: 0,
        bottom: 'calc(196px + env(safe-area-inset-bottom, 0px))',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        textAlign: 'center', padding: '12px 28px 0', overflow: 'hidden',
      }}>
        <div className="ss-eyebrow">Apuri kuuntelee</div>
        <div className="ss-display" style={{ marginTop: 10, fontSize: 36, maxWidth: 300 }}>
          Kysy <em>mitä tahansa.</em>
        </div>
        <div className="ss-body" style={{ marginTop: 8, maxWidth: 280, fontSize: 15 }}>
          Voit puhua suomea aivan tavallisesti.
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          <Orb kind="ai" size={200} halo={true} pulse={true} orbClass="ss-morph" />
        </div>

        <div style={{ paddingBottom: 12, maxWidth: 300, fontFamily: 'var(--serif)', fontSize: 23, lineHeight: 1.2, letterSpacing: '-0.01em', color: 'var(--ink)' }}>
          <span>"Mihin aikaan </span>
          <span style={{ color: 'var(--ink-3)' }}>tytär tulee tänään käymään?"</span>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 'calc(108px + env(safe-area-inset-bottom, 0px))',
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18,
      }}>
        <button style={ctrlBtn}>{Icons.text(22)}</button>
        <button
          onClick={() => setActive(a => !a)}
          style={{
            ...ctrlBtn,
            background: active ? '#1A1714' : 'rgba(255,255,255,0.7)',
            color: active ? '#fff' : 'var(--ink)',
            width: 76, height: 76,
          }}
        >
          <span className="ss-wave" style={{ color: active ? '#fff' : 'var(--ink-2)' }}>
            <span className="b" /><span className="b" /><span className="b" />
            <span className="b" /><span className="b" /><span className="b" />
          </span>
        </button>
        <button style={ctrlBtn}>{Icons.close(22)}</button>
      </div>

      <Dock active="ai" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
