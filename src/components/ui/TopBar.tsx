import { Icons } from './icons'

interface TopBarProps {
  onMenu: () => void
  right?: React.ReactNode
  dark?: boolean
}

export default function TopBar({ onMenu, right, dark = false }: TopBarProps) {
  const color = dark ? 'rgba(255,255,255,0.85)' : 'var(--ink)'
  return (
    <div style={{
      position: 'absolute', top: 54, left: 0, right: 0,
      height: 62, display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 20px',
      zIndex: 20,
    }}>
      <button
        onClick={onMenu}
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(10px)',
          border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color, cursor: 'pointer',
          boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.04)',
        }}
      >
        {Icons.menu(20)}
      </button>
      {right}
    </div>
  )
}
