import { useState } from 'react'
import type { Screen } from '../../types'
import { askClaude } from '../../lib/claude'
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
  const [active, setActive] = useState(false)
  const [response, setResponse] = useState('')

  const handleMic = async () => {
    if (active) {
      setActive(false)
      return
    }
    setActive(true)
    setResponse('')
    // Simulate 1.5s "listening" before sending to Claude
    await new Promise(r => setTimeout(r, 1500))
    const reply = await askClaude(
      [{ role: 'user', content: 'Hei Onni, miten voit auttaa minua tänään?' }],
      'companion',
    )
    setActive(false)
    setResponse(reply)
  }

  const handleClose = () => {
    setActive(false)
    setResponse('')
    onNavigate('home')
  }

  return (
    <div className="ss-screen">
      <StatusBar />
      <TopBar onMenu={onMenu} right={
        <button onClick={handleClose} style={{
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
        <div className="ss-display" style={{ marginTop: 4, fontSize: 36, maxWidth: 300 }}>
          Kysy <em>mitä tahansa.</em>
        </div>
        <div className="ss-body" style={{ marginTop: 8, maxWidth: 280, fontSize: 15 }}>
          Voit puhua suomea aivan tavallisesti.
        </div>

        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 0 }}>
          <Orb kind="ai" size={200} halo={true} pulse={true} orbClass="ss-morph" />
        </div>

        <div style={{
          marginBottom: 8,
          padding: '8px 20px', borderRadius: 999,
          background: active ? 'rgba(63,127,224,0.12)' : 'rgba(200,194,187,0.4)',
          display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'background 0.3s',
        }}>
          {active && (
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--ai)', display: 'inline-block',
              animation: 'ss-pulse 1.2s ease-in-out infinite',
            }} />
          )}
          <span style={{ fontSize: 14, fontWeight: 600, color: active ? 'var(--ai)' : 'var(--ink-3)', letterSpacing: '0.02em' }}>
            {active ? 'Kuuntelee…' : 'Paina mikrofoni aloittaaksesi'}
          </span>
        </div>

        {response && (
          <div style={{
            marginTop: 10, maxWidth: 300, paddingBottom: 8,
            fontFamily: 'var(--serif)', fontSize: 20, lineHeight: 1.35,
            color: 'var(--ink)', textAlign: 'center',
          }}>
            "{response}"
          </div>
        )}
      </div>

      <div style={{
        position: 'absolute',
        bottom: 'calc(108px + env(safe-area-inset-bottom, 0px))',
        left: 0, right: 0,
        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 18,
      }}>
        <button style={ctrlBtn}>{Icons.text(22)}</button>
        <button
          onClick={handleMic}
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
        <button onClick={handleClose} style={ctrlBtn}>{Icons.close(22)}</button>
      </div>

      <Dock active="ai" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
