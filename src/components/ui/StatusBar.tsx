interface StatusBarProps {
  dark?: boolean
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const c = dark ? 'rgba(255,255,255,0.9)' : 'var(--ink)'
  const c2 = dark ? 'rgba(255,255,255,0.6)' : 'var(--ink-3)'
  return (
    <div className="ss-status" style={{ color: c }}>
      <span>9:41</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={c2}>
          <rect x="0" y="4" width="3" height="8" rx="1" />
          <rect x="4.5" y="2.5" width="3" height="9.5" rx="1" />
          <rect x="9" y="0.5" width="3" height="11.5" rx="1" />
          <rect x="13.5" y="0" width="3" height="12" rx="1" opacity="0.3" />
        </svg>
        <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
          <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke={c2} />
          <rect x="22" y="4" width="2.5" height="4" rx="1" fill={c2} />
          <rect x="2" y="2" width="16" height="8" rx="2" fill={c} />
        </svg>
      </div>
    </div>
  )
}
