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
    <div className="ss-screen" style={{ background: 'linear-gradient(180deg, #FFF3E0 0%, #FFE0B2 100%)' }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 32px' }}>

        <div style={{ position: 'relative', width: 180, height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 32 }}>
          {!called && (
            <>
              <div className="ss-ring" />
              <div className="ss-ring r2" />
              <div className="ss-ring r3" />
            </>
          )}
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: 'var(--g-emer)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 10 }}>
            {called ? (
              <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7"/>
              </svg>
            ) : (
              <span style={{ fontSize: 52, fontWeight: 700, color: '#fff', fontFamily: 'var(--serif)' }}>{count}</span>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 32, color: 'var(--ink)' }}>
            {called ? 'Yhteys muodostettu' : 'Soitetaan…'}
          </div>
          <div className="ss-body" style={{ marginTop: 8, fontSize: 16 }}>
            {called ? 'Liisa on tullut' : 'Liisa (tytär)'}
          </div>
        </div>

        {!called && (
          <button onClick={cancel} style={{
            padding: '16px 36px', borderRadius: 999, background: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', border: 'none',
            fontSize: 17, fontWeight: 600, color: 'var(--ink)', cursor: 'pointer',
            fontFamily: 'inherit', marginBottom: 40,
          }}>
            Peruuta
          </button>
        )}

        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CONTACTS.map(c => (
            <button key={c.name} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px', background: 'rgba(255,255,255,0.6)',
              borderRadius: 22, border: '1px solid var(--hairline)',
              cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
            }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--g-emer)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {Icons.phone(22)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--ink)' }}>{c.name}</div>
                <div className="ss-tiny" style={{ marginTop: 2 }}>{c.role}</div>
              </div>
              <div style={{ color: 'var(--ink-3)', fontSize: 14 }}>{c.phone}</div>
            </button>
          ))}
        </div>
      </div>
      <div className="home-indicator" />
    </div>
  )
}
