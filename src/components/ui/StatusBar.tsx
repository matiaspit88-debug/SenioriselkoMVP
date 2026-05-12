import { useEffect, useState } from 'react'
import { useWeather, type WeatherIcon } from '../../lib/weather'

interface StatusBarProps {
  dark?: boolean
}

function useHelsinkiTime(): string {
  const [time, setTime] = useState(() => formatHelsinki())
  useEffect(() => {
    const id = setInterval(() => setTime(formatHelsinki()), 15_000)
    return () => clearInterval(id)
  }, [])
  return time
}

function formatHelsinki(): string {
  return new Intl.DateTimeFormat('fi-FI', {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
    hour12: false,
  }).format(new Date())
}

function WeatherGlyph({ icon, color }: { icon: WeatherIcon; color: string }) {
  switch (icon) {
    case 'sun':
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      )
    case 'cloudy':
      return (
        <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 18a4 4 0 010-8 5.5 5.5 0 0110.6 1.5A3.5 3.5 0 0117 18H7z" />
        </svg>
      )
    case 'rain':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 15a4 4 0 010-8 5.5 5.5 0 0110.6 1.5A3.5 3.5 0 0117 15H7z" />
          <path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" />
        </svg>
      )
    case 'wind':
      return (
        <svg width="22" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9h12a3 3 0 100-6M3 14h16a3 3 0 110 6M3 19h6" />
        </svg>
      )
    case 'storm':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 14a4 4 0 010-8 5.5 5.5 0 0110.6 1.5A3.5 3.5 0 0117 14H7z" />
          <path d="M11 16l-2 4h3l-1 4 4-6h-3l1-2" fill={color} stroke="none" />
        </svg>
      )
    case 'thunder':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill={color} />
        </svg>
      )
  }
}

export default function StatusBar({ dark = false }: StatusBarProps) {
  const c = dark ? 'rgba(255,255,255,0.95)' : 'var(--ink)'
  const c2 = dark ? 'rgba(255,255,255,0.75)' : 'var(--ink-2)'
  const time = useHelsinkiTime()
  const weather = useWeather()

  return (
    <div className="ss-status" style={{ color: c }}>
      <span>{time}</span>
      {weather && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: c2, fontWeight: 600, fontSize: 15 }}>
          <WeatherGlyph icon={weather.icon} color={c2} />
          <span>{weather.temp}°</span>
        </div>
      )}
    </div>
  )
}
