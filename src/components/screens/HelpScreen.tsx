import { useState } from 'react'
import type { Screen } from '../../types'
import type { Guide } from '../../lib/guides'
import { GUIDES, CATS } from '../../lib/guides'
import Orb from '../ui/Orb'
import StatusBar from '../ui/StatusBar'
import TopBar from '../ui/TopBar'
import Dock from '../ui/Dock'
import { Icons } from '../ui/icons'

interface HelpScreenProps {
  onNavigate: (s: Screen) => void
  onMenu: () => void
  onGuideSelect: (guide: Guide) => void
}

export default function HelpScreen({ onNavigate, onMenu, onGuideSelect }: HelpScreenProps) {
  const [cat, setCat] = useState('Kaikki')

  const filtered = cat === 'Kaikki' ? GUIDES : GUIDES.filter(g => g.category === cat)

  return (
    <div className="ss-screen">
      <StatusBar />
      <TopBar onMenu={onMenu} right={
        <button style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'var(--ink-2)', cursor: 'pointer',
        }}>
          {Icons.search(20)}
        </button>
      } />

      <div className="ss-scroll" style={{ position: 'absolute', top: 116, left: 0, right: 0, bottom: 'calc(100px + env(safe-area-inset-bottom, 0px))' }}>
        <div style={{ padding: '12px 24px 20px' }}>
          <div style={{ marginBottom: 18 }}>
            <div className="ss-eyebrow" style={{ marginBottom: 8 }}>Opastukset</div>
            <div className="ss-display" style={{ fontSize: 40 }}>Mitä <em>opitaan?</em></div>
          </div>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 4, marginBottom: 18, WebkitOverflowScrolling: 'touch' as const }}>
            {CATS.map(c => (
              <button key={c} onClick={() => setCat(c)} style={{
                flexShrink: 0, padding: '10px 18px', borderRadius: 999,
                background: cat === c ? 'var(--ink)' : 'rgba(255,255,255,0.7)',
                color: cat === c ? '#fff' : 'var(--ink-2)',
                border: 'none', fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                cursor: 'pointer', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
                boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)',
              }}>
                {c}
              </button>
            ))}
          </div>

          {/* Tip of day */}
          <div className="ss-card" style={{ marginBottom: 18, display: 'flex', gap: 14, alignItems: 'center', padding: 16 }}>
            <Orb kind="emer" size={52} halo={false} />
            <div style={{ flex: 1 }}>
              <div className="ss-eyebrow" style={{ marginBottom: 4 }}>Vinkki tänään</div>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Tunnista huijausviesti</div>
              <div className="ss-tiny" style={{ marginTop: 3 }}>Suojaa itsesi — 2 min</div>
            </div>
          </div>

          {/* Guide list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {filtered.map(g => (
              <button key={g.id} onClick={() => onGuideSelect(g)} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 16px', background: 'rgba(255,255,255,0.6)',
                borderRadius: 22, border: '1px solid var(--hairline)',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit',
              }}>
                <Orb kind={g.kind} size={46} halo={false} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>{g.title}</div>
                  <div className="ss-tiny" style={{ marginTop: 3 }}>{g.meta}</div>
                </div>
                <div style={{ color: 'var(--ink-3)' }}>{Icons.chevron(18)}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Dock active="book" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
