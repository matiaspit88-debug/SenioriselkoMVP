import type { OrbKind } from '../../types'

const GRADS: Record<OrbKind, string> = {
  help: 'radial-gradient(circle at 35% 30%, #FFE4D2 0%, #FFB39A 35%, #F18A6E 65%, #C75A4D 100%)',
  ai:   'radial-gradient(circle at 30% 25%, #DDF0FF 0%, #8FC6FF 35%, #3F7FE0 70%, #18316E 100%)',
  chat: 'radial-gradient(circle at 35% 30%, #F4E6FF 0%, #D5B6F2 35%, #A381DC 70%, #5A3A9E 100%)',
  emer: 'radial-gradient(circle at 35% 30%, #FFF1D2 0%, #FFD487 35%, #F0973A 70%, #B25208 100%)',
  soft: 'radial-gradient(circle at 30% 30%, #FFFFFF 0%, #F4ECE2 50%, #E5D6C4 100%)',
}

interface OrbProps {
  kind?: OrbKind
  size?: number
  halo?: boolean
  pulse?: boolean
  orbClass?: string
}

export default function Orb({ kind = 'soft', size = 96, halo = true, pulse = false, orbClass = '' }: OrbProps) {
  const grad = GRADS[kind]
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {halo && (
        <div
          className="ss-aura"
          style={{ width: size * 1.4, height: size * 1.4, left: -size * 0.2, top: -size * 0.2, background: grad }}
        />
      )}
      <div
        className={`ss-orb${pulse ? ' ss-pulse' : ''}${orbClass ? ' ' + orbClass : ''}`}
        style={{ width: size, height: size, background: grad, position: 'relative', zIndex: 1 }}
      />
    </div>
  )
}
