import { useState } from 'react'

const PIN = '4688'

const KEYS = ['1','2','3','4','5','6','7','8','9','','0','⌫']

interface PinScreenProps {
  onSuccess: () => void
}

export default function PinScreen({ onSuccess }: PinScreenProps) {
  const [digits, setDigits] = useState<string[]>([])
  const [shake, setShake] = useState(false)
  const [error, setError] = useState(false)

  const handleKey = (k: string) => {
    if (shake) return
    if (k === '⌫') {
      setDigits(d => d.slice(0, -1))
      setError(false)
      return
    }
    if (k === '') return
    const next = [...digits, k]
    setDigits(next)
    if (next.length === 4) {
      if (next.join('') === PIN) {
        setTimeout(onSuccess, 200)
      } else {
        setError(true)
        setShake(true)
        setTimeout(() => {
          setShake(false)
          setError(false)
          setDigits([])
        }, 450)
      }
    }
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 50% 55%, #3D2A1A 0%, #281B11 65%, #1A1108 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 'max(56px, env(safe-area-inset-top, 56px))',
      paddingBottom: 'max(28px, env(safe-area-inset-bottom, 28px))',
    }}>

      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          color: '#F5E9D2', fontSize: 36, lineHeight: 1.1,
          textShadow: '0 2px 14px rgba(0,0,0,0.3)',
        }}>
          SenioriSelko
        </p>
        <p style={{
          color: 'rgba(245, 233, 210, 0.50)', fontSize: 12,
          letterSpacing: '0.14em', textTransform: 'uppercase',
          fontWeight: 500, marginTop: 6,
        }}>
          Kirjaudu sisään
        </p>
      </div>

      {/* Orb container — orb fills, dots + keypad overlaid on top */}
      <div style={{
        position: 'relative',
        width: 332, height: 472,
      }}>
        {/* The orb itself */}
        <div className="pin-orb" />

        {/* Content overlay: PIN dots + keypad */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: 30,
          padding: '0 28px',
          zIndex: 2,
        }}>
          {/* PIN dots */}
          <div
            className={shake ? 'ss-pin-shake' : ''}
            style={{
              display: 'flex', gap: 20,
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.55))',
            }}
          >
            {[0,1,2,3].map(i => (
              <div key={i} style={{
                width: 14, height: 14, borderRadius: '50%',
                background: digits.length > i
                  ? (error ? '#FF8B6A' : '#FFFAEF')
                  : 'transparent',
                border: `2px solid ${digits.length > i
                  ? (error ? '#FF8B6A' : '#FFFAEF')
                  : 'rgba(255, 250, 235, 0.55)'}`,
                transition: 'background 0.15s, border-color 0.15s',
              }} />
            ))}
          </div>

          {/* Keypad — true liquid glass */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 11, width: '100%',
          }}>
            {KEYS.map((k, i) => (
              <button
                key={i}
                onClick={() => handleKey(k)}
                disabled={k === '' || digits.length >= 4}
                style={{
                  height: 64, borderRadius: 20,
                  background: k === ''
                    ? 'transparent'
                    : 'linear-gradient(135deg, rgba(255,240,215,0.13) 0%, rgba(40,20,12,0.18) 100%)',
                  border: k === ''
                    ? 'none'
                    : '1px solid rgba(255, 240, 215, 0.22)',
                  backdropFilter: k !== '' ? 'blur(12px) saturate(160%)' : undefined,
                  WebkitBackdropFilter: k !== '' ? 'blur(12px) saturate(160%)' : undefined,
                  boxShadow: k !== ''
                    ? 'inset 0 1px 0 rgba(255, 250, 240, 0.28), inset 0 -1px 0 rgba(0, 0, 0, 0.10), 0 4px 14px rgba(0, 0, 0, 0.30)'
                    : 'none',
                  fontSize: k === '⌫' ? 22 : 26,
                  fontWeight: k === '⌫' ? 400 : 300,
                  color: '#F5E9D2',
                  textShadow: k !== '' ? '0 1px 4px rgba(0, 0, 0, 0.55)' : undefined,
                  cursor: k === '' ? 'default' : 'pointer',
                  fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background 0.15s, transform 0.08s',
                }}
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <p style={{ marginTop: 18, color: '#FF8B6A', fontSize: 14, fontWeight: 500 }}>
          Väärä koodi — yritä uudelleen
        </p>
      )}
    </div>
  )
}
