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
    <div className="ss-screen">
      <StatusBar />
      <TopBar onMenu={onMenu} right={
        <div style={{
          padding: '10px 16px', borderRadius: 999,
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          fontSize: 14, color: 'var(--ink-2)',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
        }}>
          {Icons.sun(16)}&nbsp;<span style={{ fontWeight: 500 }}>Helsinki · 4°</span>
        </div>
      } />

      <div className="ss-scroll" style={{
        position: 'absolute',
        top: 116, left: 0, right: 0,
        bottom: 'calc(100px + env(safe-area-inset-bottom, 0px))',
      }}>
        <div style={{ padding: '12px 24px 20px' }}>
          <div style={{ marginBottom: 22 }}>
            <div className="ss-eyebrow" style={{ marginBottom: 10 }}>{dateLabel}</div>
            <div className="ss-display">Hyvää<br /><em>{greeting}, Aino</em></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 4 }}>
            {TILES.map(t => (
              <button key={t.key} className="ss-tile" onClick={() => onNavigate(t.key)}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className={t.floatClass}>
                    <Orb kind={t.kind} size={68} halo={true} />
                  </div>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1, color: 'var(--ink)', letterSpacing: '-0.01em' }}>{t.title}</div>
                    <div className="ss-tiny" style={{ marginTop: 4 }}>{t.sub}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="ss-card" style={{ marginTop: 14, display: 'flex', gap: 14, alignItems: 'center', padding: 16, background: 'rgba(255,255,255,0.6)' }}>
            <div style={{ width: 46, height: 46, borderRadius: 14, background: 'var(--g-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {Icons.heart(22)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--ink)' }}>Liisa muisti soittaa</div>
              <div className="ss-tiny" style={{ marginTop: 2 }}>Eilen klo 18.40 · 12 min</div>
            </div>
            <div style={{ color: 'var(--ink-3)' }}>{Icons.phone(20)}</div>
          </div>
        </div>
      </div>

      <Dock active="home" onChange={onNavigate} />
      <div className="home-indicator" />
    </div>
  )
}
