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
      background: 'radial-gradient(ellipse at 50% 60%, #3A2818 0%, #261A11 70%, #1C1209 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      paddingTop: 'max(56px, env(safe-area-inset-top, 56px))',
      paddingBottom: 'max(36px, env(safe-area-inset-bottom, 36px))',
    }}>

      {/* Brand */}
      <div style={{ textAlign: 'center' }}>
        <p style={{
          fontFamily: 'var(--serif)', fontStyle: 'italic',
          color: '#F4E8D2', fontSize: 36, lineHeight: 1.1,
          textShadow: '0 1px 12px rgba(0,0,0,0.25)',
        }}>
          SenioriSelko
        </p>
        <p style={{
          color: 'rgba(244, 232, 210, 0.55)', fontSize: 12,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          fontWeight: 500, marginTop: 6,
        }}>
          Kirjaudu sisään
        </p>
      </div>

      {/* Orb + PIN dots overlay */}
      <div
        className={shake ? 'ss-pin-shake' : ''}
        style={{
          position: 'relative',
          width: 240, height: 310,
          marginTop: 36, marginBottom: 'auto',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        <div className="pin-orb" />
        <div style={{
          position: 'absolute', display: 'flex', gap: 20,
          bottom: 36,
          filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.55))',
        }}>
          {[0,1,2,3].map(i => (
            <div key={i} style={{
              width: 16, height: 16, borderRadius: '50%',
              background: digits.length > i
                ? (error ? '#FF8B6A' : '#FFFAEF')
                : 'transparent',
              border: `2px solid ${digits.length > i
                ? (error ? '#FF8B6A' : '#FFFAEF')
                : 'rgba(255, 245, 225, 0.45)'}`,
              transition: 'background 0.15s, border-color 0.15s',
            }} />
          ))}
        </div>
      </div>

      {/* Keypad — liquid glass */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 14, width: 260, marginTop: 24,
      }}>
        {KEYS.map((k, i) => (
          <button
            key={i}
            onClick={() => handleKey(k)}
            disabled={k === '' || digits.length >= 4}
            style={{
              height: 72, borderRadius: 22,
              background: k === ''
                ? 'transparent'
                : 'rgba(255, 248, 232, 0.07)',
              border: k === ''
                ? 'none'
                : '1px solid rgba(255, 240, 215, 0.14)',
              backdropFilter: k !== '' ? 'blur(20px) saturate(180%)' : undefined,
              WebkitBackdropFilter: k !== '' ? 'blur(20px) saturate(180%)' : undefined,
              boxShadow: k !== ''
                ? 'inset 0 1px 0 rgba(255, 250, 240, 0.10), 0 2px 10px rgba(0, 0, 0, 0.25)'
                : 'none',
              fontSize: k === '⌫' ? 22 : 26,
              fontWeight: k === '⌫' ? 400 : 300,
              color: '#F4E8D2',
              cursor: k === '' ? 'default' : 'pointer',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s, transform 0.1s',
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ marginTop: 16, color: '#FF8B6A', fontSize: 14, fontWeight: 500 }}>
          Väärä koodi — yritä uudelleen
        </p>
      )}
    </div>
  )
}
