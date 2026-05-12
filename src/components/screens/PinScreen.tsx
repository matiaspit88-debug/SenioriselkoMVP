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
      background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      gap: 0,
    }}>

      {/* Brand */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', color: 'var(--ink)', fontSize: 36, lineHeight: 1.1 }}>
          SenioriSelko
        </p>
        <p style={{ color: 'var(--ink-3)', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 500, marginTop: 5 }}>
          Kirjaudu sisään
        </p>
      </div>

      {/* PIN dots */}
      <div
        className={shake ? 'ss-pin-shake' : ''}
        style={{ display: 'flex', gap: 18, marginBottom: 48 }}
      >
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: 18, height: 18, borderRadius: '50%',
            background: digits.length > i
              ? (error ? '#E05555' : 'var(--ink)')
              : 'transparent',
            border: `2px solid ${digits.length > i ? (error ? '#E05555' : 'var(--ink)') : 'var(--ink-4)'}`,
            transition: 'background 0.15s, border-color 0.15s',
          }} />
        ))}
      </div>

      {/* Keypad */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12, width: 260,
      }}>
        {KEYS.map((k, i) => (
          <button
            key={i}
            onClick={() => handleKey(k)}
            disabled={k === '' || digits.length >= 4}
            style={{
              height: 72, borderRadius: 20,
              background: k === '' ? 'transparent' : 'rgba(255,255,255,0.7)',
              border: k === '' ? 'none' : '1px solid var(--hairline)',
              backdropFilter: k !== '' ? 'blur(10px)' : undefined,
              WebkitBackdropFilter: k !== '' ? 'blur(10px)' : undefined,
              fontSize: k === '⌫' ? 22 : 26,
              fontWeight: k === '⌫' ? 400 : 300,
              color: 'var(--ink)',
              cursor: k === '' ? 'default' : 'pointer',
              fontFamily: 'inherit',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.15s',
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {error && (
        <p style={{ marginTop: 24, color: '#E05555', fontSize: 14, fontWeight: 500 }}>
          Väärä koodi — yritä uudelleen
        </p>
      )}
    </div>
  )
}
