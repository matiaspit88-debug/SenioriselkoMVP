import { useState, useEffect } from 'react'
import type { Screen } from '../../types'
import { Icons } from '../ui/icons'

const CONTACTS = [
  { name: 'Liisa',  role: 'Tytär',      phone: '+358 40 123 4567' },
  { name: 'Pekka',  role: 'Naapuri',    phone: '+358 50 987 6543' },
  { name: '112',    role: 'Hätäkeskus', phone: '112' },
]

interface SOSScreenProps {
  onNavigate: (s: Screen) => void
}

export default function SOSScreen({ onNavigate }: SOSScreenProps) {
  const [count, setCount] = useState(5)
  const [called, setCalled] = useState(false)

  useEffect(() => {
    if (count <= 0) { setCalled(true); return }
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  const cancel = () => { setCount(5); setCalled(false); onNavigate('home') }

  return (
    <div className="ss-screen" style={{ background: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 100%)', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 28px',
        gap: 0,
        overflow: 'hidden',
      }}>
        {/* Countdown / checkmark orb */}
        <div style={{ position: 'relative', width: 160, height: 160, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0 }}>
          {!called && (
            <>
              <div className="ss-ring" />
              <div className="ss-ring r2" />
              <div className="ss-ring r3" />
            </>
          )}
          <div style={{ width: 108, height: 108, borderRadius: '50%', background: 'var(--g-emer)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            {called ? (
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <span style={{ fontSize: 48, fontWeight: 700, color: '#fff', fontFamily: 'var(--serif)' }}>{count}</span>
            )}
          </div>
        </div>

        {/* Status text */}
        <div style={{ textAlign: 'center', marginBottom: 24, flexShrink: 0 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 30, color: 'var(--ink)' }}>
            {called ? 'Yhteys muodostettu' : 'Soitetaan…'}
          </div>
          <div className="ss-body" style={{ marginTop: 6, fontSize: 16 }}>
            {called ? 'Liisa on tulossa' : 'Liisa (tytär)'}
          </div>
        </div>

        {/* Cancel button */}
        {!called && (
          <button onClick={cancel} style={{
            padding: '14px 32px', borderRadius: 999, background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: 'none',
            fontSize: 17, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer',
            fontFamily: 'inherit', marginBottom: 28, flexShrink: 0,
          }}>
            Peruuta
          </button>
        )}

        {/* Contact list */}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10, flexShrink: 0 }}>
          {CONTACTS.map(c => (
            <button key={c.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 16px', background: 'rgba(255,255,255,0.6)',
              borderRadius: 22, border: '1px solid var(--hairline)',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              minHeight: 56,
            }}>
              <div style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--g-emer)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {Icons.phone(20)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>{c.name}</div>
                <div className="ss-tiny" style={{ marginTop: 2 }}>{c.role}</div>
              </div>
              <div style={{ color: 'var(--ink-3)', fontSize: 14, flexShrink: 0 }}>{c.phone}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="home-indicator" />
    </div>
  )
}
