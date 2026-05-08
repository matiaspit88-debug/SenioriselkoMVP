import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import type { Mesh } from 'three'

export default function HeroScene() {
  const primaryRef = useRef<Mesh>(null)
  const secondaryRef = useRef<Mesh>(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (primaryRef.current) {
      primaryRef.current.rotation.y += delta * 0.22
      primaryRef.current.rotation.x += delta * 0.07
    }
    if (secondaryRef.current) {
      secondaryRef.current.rotation.y -= delta * 0.18
      secondaryRef.current.rotation.z += delta * 0.05
    }
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.30
  const secondaryScale = scale * 0.42

  return (
    <>
      <ambientLight intensity={0.4} />

      {/* Key light — cool blue from upper-right */}
      <directionalLight position={[5, 6, 4]} intensity={1.8} color="#C8DEFF" />

      {/* Fill light — warm peach from lower-left */}
      <pointLight position={[-4, -3, 2]} intensity={1.0} color="#FFD6A8" />

      {/* Rim light — purple from behind */}
      <pointLight position={[2, 4, -5]} intensity={0.7} color="#D4B8FF" />

      {/* Subtle orange glow from bottom */}
      <pointLight position={[0, -5, 1]} intensity={0.4} color="#FFB870" />

      <Environment preset="city" />

      {/* Primary orb — blue AI sphere */}
      <Float speed={1.4} rotationIntensity={0.18} floatIntensity={0.55}>
        <mesh ref={primaryRef} scale={scale}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            color="#3F7FE0"
            distort={0.28}
            speed={1.6}
            roughness={0.04}
            metalness={0.08}
            envMapIntensity={1.4}
            transparent
            opacity={0.93}
          />
        </mesh>
      </Float>

      {/* Secondary orb — purple Juttuseura sphere, offset upper-right */}
      <Float speed={2.1} rotationIntensity={0.25} floatIntensity={0.9}>
        <mesh
          ref={secondaryRef}
          scale={secondaryScale}
          position={[scale * 1.1, scale * 0.7, -scale * 0.6]}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#A381DC"
            distort={0.38}
            speed={2.2}
            roughness={0.06}
            metalness={0.05}
            envMapIntensity={1.1}
            transparent
            opacity={0.82}
          />
        </mesh>
      </Float>
    </>
  )
}
