import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import type { Mesh, Group } from 'three'

const CORAL_LIGHT = '#FFC4A8'
const CORAL_MID   = '#F18A6E'
const CORAL_DARK  = '#C85A38'

/* ── Step 0: Open camera app — floating phone body ── */
function PhoneModel() {
  const ref = useRef<Group>(null)
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.4
  })
  return (
    <Float speed={1.8} floatIntensity={0.6} rotationIntensity={0.1}>
      <group ref={ref}>
        {/* Phone body */}
        <RoundedBox args={[1.1, 1.9, 0.14]} radius={0.14} smoothness={4}>
          <meshStandardMaterial color={CORAL_MID} roughness={0.12} metalness={0.35} />
        </RoundedBox>
        {/* Screen glass */}
        <RoundedBox args={[0.88, 1.52, 0.02]} radius={0.08} smoothness={4} position={[0, 0.06, 0.09]}>
          <meshStandardMaterial color="#1A0A00" roughness={0.05} metalness={0.1} />
        </RoundedBox>
        {/* Home button ring */}
        <mesh position={[0, -0.76, 0.08]}>
          <torusGeometry args={[0.1, 0.025, 16, 32]} />
          <meshStandardMaterial color={CORAL_LIGHT} roughness={0.1} metalness={0.4} />
        </mesh>
        {/* Camera dot */}
        <mesh position={[0, 0.82, 0.09]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color={CORAL_DARK} roughness={0.2} metalness={0.5} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Step 1: Tap the icon — pulsing tap ring ── */
function TapRing() {
  const ring1 = useRef<Mesh>(null)
  const ring2 = useRef<Mesh>(null)
  const dot   = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    const s1 = 1 + 0.5 * Math.abs(Math.sin(t * 1.4))
    const s2 = 1 + 0.5 * Math.abs(Math.sin(t * 1.4 + 1.0))
    if (ring1.current) {
      ring1.current.scale.setScalar(s1)
      ;(ring1.current.material as any).opacity = 0.8 - 0.6 * Math.abs(Math.sin(t * 1.4))
    }
    if (ring2.current) {
      ring2.current.scale.setScalar(s2)
      ;(ring2.current.material as any).opacity = 0.8 - 0.6 * Math.abs(Math.sin(t * 1.4 + 1.0))
    }
    if (dot.current) dot.current.rotation.z = t * 0.8
  })
  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[0.55, 0.035, 16, 64]} />
        <meshStandardMaterial color={CORAL_LIGHT} transparent roughness={0.2} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[0.75, 0.025, 16, 64]} />
        <meshStandardMaterial color={CORAL_MID} transparent roughness={0.2} />
      </mesh>
      {/* Tap point */}
      <Float speed={2.2} floatIntensity={0.3}>
        <mesh ref={dot}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <MeshDistortMaterial color={CORAL_MID} distort={0.22} speed={2.5} roughness={0.1} metalness={0.2} />
        </mesh>
      </Float>
      <Sparkles count={14} scale={1.6} size={2.5} speed={0.4} color={CORAL_LIGHT} />
    </group>
  )
}

/* ── Step 2: Selfie mode — two spheres flipping around each other ── */
function SelfieCam() {
  const pivot = useRef<Group>(null)
  useFrame((_, dt) => {
    if (pivot.current) pivot.current.rotation.y += dt * 1.1
  })
  return (
    <Float speed={1.4} floatIntensity={0.5} rotationIntensity={0.08}>
      <group ref={pivot}>
        {/* Front camera — lighter, smaller */}
        <mesh position={[0.55, 0, 0]}>
          <sphereGeometry args={[0.32, 32, 32]} />
          <meshStandardMaterial color={CORAL_LIGHT} roughness={0.08} metalness={0.4} />
        </mesh>
        {/* Rear camera — darker, larger */}
        <mesh position={[-0.55, 0, 0]}>
          <sphereGeometry args={[0.44, 32, 32]} />
          <meshStandardMaterial color={CORAL_DARK} roughness={0.1} metalness={0.45} />
        </mesh>
        {/* Connecting arc */}
        <mesh>
          <torusGeometry args={[0.55, 0.04, 12, 48, Math.PI]} />
          <meshStandardMaterial color={CORAL_MID} roughness={0.15} metalness={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Step 3: Look at camera — lens / eye shape ── */
function EyeLens() {
  const lens = useRef<Mesh>(null)
  const pupil = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (lens.current) {
      lens.current.rotation.z = Math.sin(t * 0.6) * 0.12
      lens.current.rotation.x = Math.sin(t * 0.4) * 0.08
    }
    if (pupil.current) {
      const s = 0.9 + 0.15 * Math.abs(Math.sin(t * 0.9))
      pupil.current.scale.setScalar(s)
    }
  })
  return (
    <Float speed={1.2} floatIntensity={0.4}>
      <group>
        {/* Outer ring — lens barrel */}
        <mesh ref={lens}>
          <torusGeometry args={[0.72, 0.12, 20, 64]} />
          <meshStandardMaterial color={CORAL_MID} roughness={0.1} metalness={0.5} />
        </mesh>
        {/* Inner iris */}
        <mesh>
          <torusGeometry args={[0.42, 0.07, 20, 64]} />
          <meshStandardMaterial color={CORAL_LIGHT} roughness={0.12} metalness={0.3} />
        </mesh>
        {/* Pupil */}
        <mesh ref={pupil}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color={CORAL_DARK} roughness={0.06} metalness={0.6} />
        </mesh>
        {/* Catchlight */}
        <mesh position={[0.1, 0.1, 0.22]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshStandardMaterial color="#fff" roughness={0} metalness={0} emissive="#fff" emissiveIntensity={1.2} />
        </mesh>
      </group>
    </Float>
  )
}

/* ── Step 4: Take a photo — shutter button + sparkle burst ── */
function ShutterBurst() {
  const btn = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (btn.current) {
      const s = 1 + 0.07 * Math.abs(Math.sin(t * 2.2))
      btn.current.scale.setScalar(s)
    }
  })
  return (
    <Float speed={1.6} floatIntensity={0.55}>
      <group>
        {/* Shutter button body */}
        <mesh ref={btn} position={[0, 0, 0]}>
          <cylinderGeometry args={[0.62, 0.62, 0.22, 64]} />
          <meshStandardMaterial color={CORAL_MID} roughness={0.1} metalness={0.45} />
        </mesh>
        {/* Inner circle */}
        <mesh position={[0, 0.12, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.04, 64]} />
          <meshStandardMaterial color={CORAL_LIGHT} roughness={0.08} metalness={0.3} />
        </mesh>
        {/* Outer ring */}
        <mesh position={[0, 0, 0]}>
          <torusGeometry args={[0.82, 0.06, 16, 64]} />
          <meshStandardMaterial color={CORAL_DARK} roughness={0.12} metalness={0.5} />
        </mesh>
        <Sparkles count={22} scale={2.2} size={3} speed={0.6} color={CORAL_LIGHT} />
      </group>
    </Float>
  )
}

const SCENES = [PhoneModel, TapRing, SelfieCam, EyeLens, ShutterBurst]

export default function GuideStepScene({ step }: { step: number }) {
  const Scene = SCENES[step] ?? PhoneModel
  return (
    <>
      <ambientLight intensity={0.55} />
      <pointLight position={[3, 4, 3]} intensity={2.2} color={CORAL_LIGHT} />
      <pointLight position={[-3, -2, 2]} intensity={1.0} color="#fff8f4" />
      <pointLight position={[0, -4, -2]} intensity={0.5} color={CORAL_DARK} />
      <Scene />
    </>
  )
}
