import type { Screen } from '../../types'
import Orb from './Orb'
import { Icons } from './icons'

const ITEMS = [
  { key: 'home' as Screen, icon: (s: number) => Icons.home(s) },
  { key: 'ai'   as Screen, icon: (s: number) => Icons.mic(s)  },
  { key: 'chat' as Screen, icon: (s: number) => Icons.chat(s) },
  { key: 'book' as Screen, icon: (s: number) => Icons.book(s) },
]

const ORB_KIND = { home: 'soft', ai: 'ai', chat: 'chat', book: 'help' } as const

interface DockProps {
  active: Screen
  onChange: (s: Screen) => void
}

export default function Dock({ active, onChange }: DockProps) {
  return (
    <div className="ss-dock">
      {ITEMS.map(item => {
        const isActive = active === item.key
        return (
          <button
            key={item.key}
            className="ss-dock-item"
            onClick={() => onChange(item.key)}
            style={{
              background: isActive ? 'transparent' : 'transparent',
              position: 'relative',
            }}
          >
            {isActive ? (
              <Orb kind={ORB_KIND[item.key as keyof typeof ORB_KIND]} size={46} halo={false} />
            ) : (
              <span style={{ color: 'var(--ink-3)' }}>{item.icon(24)}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
