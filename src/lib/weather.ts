import { useEffect, useState } from 'react'

export type WeatherIcon = 'sun' | 'cloudy' | 'rain' | 'wind' | 'storm' | 'thunder'

export interface Weather {
  temp: number
  icon: WeatherIcon
}

function mapWeather(code: number, windMs: number): WeatherIcon {
  if (code >= 95) return 'thunder'
  if (windMs >= 17) return 'storm'
  if (code >= 51 && code <= 82) return 'rain'
  if (windMs >= 9) return 'wind'
  if (code === 0) return 'sun'
  return 'cloudy'
}

async function fetchHelsinki(): Promise<Weather | null> {
  try {
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=60.17&longitude=24.94&current=temperature_2m,weather_code,wind_speed_10m&wind_speed_unit=ms&timezone=Europe%2FHelsinki',
    )
    if (!res.ok) return null
    const data = await res.json()
    const t = data?.current?.temperature_2m
    const code = data?.current?.weather_code
    const wind = data?.current?.wind_speed_10m
    if (typeof t !== 'number' || typeof code !== 'number') return null
    return { temp: Math.round(t), icon: mapWeather(code, wind ?? 0) }
  } catch {
    return null
  }
}

export function useWeather(): Weather | null {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      const w = await fetchHelsinki()
      if (!cancelled && w) setWeather(w)
    }
    load()
    const id = setInterval(load, 30 * 60 * 1000)
    return () => { cancelled = true; clearInterval(id) }
  }, [])

  return weather
}
