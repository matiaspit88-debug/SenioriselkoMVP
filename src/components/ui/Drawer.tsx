import type { Screen } from '../../types'
import Orb from './Orb'
import { Icons } from './icons'

interface DrawerProps {
  open: boolean
  onClose: () => void
  onNavigate: (s: Screen) => void
  fontSize: number
  setFontSize: (fn: (f: number) => number) => void
}

const chipBtn: React.CSSProperties = {
  width: 36, height: 36, borderRadius: 18,
  border: '1px solid var(--hairline)',
  background: '#fff', fontSize: 14, fontWeight: 600,
  fontFamily: 'inherit', cursor: 'pointer', color: 'var(--ink)',
}

const NAV_ITEMS: { key: Screen; label: string; icon: (s: number) => React.ReactNode }[] = [
  { key: 'home', label: 'Etusivu',    icon: Icons.home },
  { key: 'ai',   label: 'Apuri',      icon: Icons.mic  },
  { key: 'chat', label: 'Juttuseura', icon: Icons.chat },
  { key: 'book', label: 'Ohjeet',     icon: Icons.book },
  { key: 'sos',  label: 'Hätä',       icon: Icons.sos  },
]

export default function Drawer({ open, onClose, onNavigate, fontSize, setFontSize }: DrawerProps) {
  if (!open) return null
  const sizeLabel = fontSize <= 16 ? 'Pieni' : fontSize >= 20 ? 'Suuri' : 'Normaali'
  return (
    <div className="ss-drawer" onClick={onClose}>
      <div className="ss-drawer-panel ss-slide-left" onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Orb kind="soft" size={56} halo={false} />
          <div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 26, lineHeight: 1 }}>Aino V.</div>
            <div className="ss-tiny" style={{ marginTop: 4 }}>78 vuotta · Tampere</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 14 }}>
          {NAV_ITEMS.map(item => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); onClose() }}
              style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 8px', background: 'transparent', border: 'none',
                textAlign: 'left', fontFamily: 'inherit', fontSize: 19,
                color: 'var(--ink)', cursor: 'pointer',
                borderBottom: '1px solid var(--hairline)',
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 20,
                background: 'var(--bg-card)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--ink-2)',
              }}>
                {item.icon(20)}
              </div>
              <span style={{ flex: 1 }}>{item.label}</span>
              <div style={{ color: 'var(--ink-3)' }}>{Icons.chevron(16)}</div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            padding: 16, borderRadius: 22, background: 'var(--bg-card)',
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, background: 'var(--g-soft)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15 }}>Tekstin koko</div>
              <div className="ss-tiny" style={{ marginTop: 2 }}>{sizeLabel}</div>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              <button onClick={() => setFontSize(f => Math.max(14, f - 2))} style={chipBtn}>A−</button>
              <button onClick={() => setFontSize(f => Math.min(22, f + 2))} style={{ ...chipBtn, background: 'var(--ink)', color: '#fff', border: 'none' }}>A+</button>
            </div>
          </div>
          <div style={{ padding: 16, borderRadius: 22, background: 'var(--bg-card)', fontSize: 15, color: 'var(--ink-2)', cursor: 'pointer' }}>
            Asetukset &amp; Yksityisyys
          </div>
        </div>
      </div>
    </div>
  )
}
