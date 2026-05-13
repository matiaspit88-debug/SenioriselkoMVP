import type { Screen } from '../../types'
import Orb from '../ui/Orb'
import StatusBar from '../ui/StatusBar'
import TopBar from '../ui/TopBar'
import Dock from '../ui/Dock'
import { Icons } from '../ui/icons'

const TILES = [
  { key: 'ai'   as Screen, kind: 'ai'   as const, title: 'Apuri',      sub: 'Kysy puhumalla',    floatClass: 'ss-float-a' },
  { key: 'chat' as Screen, kind: 'chat' as const, title: 'Juttuseura', sub: 'Pieni juttuhetki',  floatClass: 'ss-float-b' },
  { key: 'book' as Screen, kind: 'help' as const, title: 'Ohjeet',     sub: 'Vinkit ja opastus', floatClass: 'ss-float-c' },
  { key: 'sos'  as Screen, kind: 'emer' as const, title: 'Hätä',       sub: 'Soita läheiselle',  floatClass: 'ss-float-d' },
]

const DAY_NAMES = ['Sunnuntai', 'Maanantai', 'Tiistai', 'Keskiviikko', 'Torstai', 'Perjantai', 'Lauantai']

function getDateLabel() {
  const now = new Date()
  return `${DAY_NAMES[now.getDay()]} · ${now.getDate()}.${now.getMonth() + 1}.`
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'aamua'
  if (h < 18) return 'iltapäivää'
  return 'iltaa'
}

interface HomeScreenProps {
  onNavigate: (s: Screen) => void
  onMenu: () => void
}

export default function HomeScreen({ onNavigate, onMenu }: HomeScreenProps) {
  const greeting = getGreeting()
  const dateLabel = getDateLabel()

  return (
    <div className="ss-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <StatusBar />
      <TopBar onMenu={onMenu} />

      {/* Content area: fills space between TopBar and Dock, no scroll */}
      <div style={{
        position: 'absolute',
        top: 116,
        left: 0,
        right: 0,
        bottom: 'calc(96px + env(safe-area-inset-bottom, 0px))',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        padding: '10px 20px 12px',
      }}>
        {/* Greeting */}
        <div style={{ flexShrink: 0, marginBottom: 12 }}>
          <div className="ss-eyebrow" style={{ marginBottom: 6 }}>{dateLabel}</div>
          <div className="ss-display" style={{ fontSize: 44, lineHeight: 1.05 }}>
            Hyvää<br /><em>{greeting}, Aino</em>
          </div>
        </div>

        {/* Tile grid — fills all remaining vertical space */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: 12,
          flex: 1,
          minHeight: 0,
        }}>
          {TILES.map(t => (
            <button key={t.key} className="ss-tile" onClick={() => onNavigate(t.key)}>
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div className={t.floatClass} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                  <Orb kind={t.kind} size={64} halo={true} />
                </div>
                <div style={{ flexShrink: 0 }}>
                  <div style={{ fontFamily: 'var(--serif)', fontSize: 26, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.title}</div>
                  <div className="ss-tiny" style={{ marginTop: 3 }}>{t.sub}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom card — compact, fixed height */}
        <div className="ss-card" style={{
          marginTop: 10,
          flexShrink: 0,
          display: 'flex', gap: 12, alignItems: 'center',
          padding: '12px 14px',
          background: 'rgba(255,255,255,0.6)',
        }}>
          <div style={{ width: 42, height: 42, borderRadius: 13, background: 'var(--g-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {Icons.heart(20)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Liisa muisti soittaa</div>
            <div className="ss-tiny" style={{ marginTop: 2 }}>Eilen klo 18.40 · 12 min</div>
          </div>
          <div style={{ color: 'var(--ink-3)', flexShrink: 0 }}>{Icons.phone(20)}</div>
        </div>
      </div>

      <Dock active="home" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
