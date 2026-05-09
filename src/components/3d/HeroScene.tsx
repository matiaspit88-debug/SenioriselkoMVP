import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import type { Mesh } from 'three'

export default function HeroScene() {
  const aiRef = useRef<Mesh>(null)
  const chatRef = useRef<Mesh>(null)
  const helpRef = useRef<Mesh>(null)
  const emerRef = useRef<Mesh>(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (aiRef.current) {
      aiRef.current.rotation.y += delta * 0.20
      aiRef.current.rotation.x += delta * 0.06
    }
    if (chatRef.current) {
      chatRef.current.rotation.y -= delta * 0.16
      chatRef.current.rotation.z += delta * 0.08
    }
    if (helpRef.current) {
      helpRef.current.rotation.y += delta * 0.24
      helpRef.current.rotation.z -= delta * 0.05
    }
    if (emerRef.current) {
      emerRef.current.rotation.y -= delta * 0.18
      emerRef.current.rotation.x += delta * 0.10
    }
  })

  const base = Math.min(viewport.width, viewport.height) * 0.28

  return (
    <>
      <ambientLight intensity={0.45} />

      {/* Key light — cool blue from upper-right */}
      <directionalLight position={[5, 6, 4]} intensity={1.8} color="#C8DEFF" />

      {/* Fill light — warm peach from lower-left */}
      <pointLight position={[-4, -3, 2]} intensity={1.0} color="#FFD6A8" />

      {/* Rim light — purple from behind */}
      <pointLight position={[2, 4, -5]} intensity={0.7} color="#D4B8FF" />

      {/* Coral glow from lower-right for help/emer orbs */}
      <pointLight position={[4, -4, 2]} intensity={0.5} color="#FFC4A8" />

      {/* Warm orange accent from bottom */}
      <pointLight position={[0, -5, 1]} intensity={0.4} color="#FFB870" />

      <Environment preset="city" />

      {/* Primary orb — Apuri (blue), center-left */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.50}>
        <mesh ref={aiRef} scale={base * 0.95} position={[-base * 0.3, base * 0.1, 0]}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            color="#3F7FE0"
            distort={0.26}
            speed={1.5}
            roughness={0.04}
            metalness={0.08}
            envMapIntensity={1.4}
            transparent
            opacity={0.94}
          />
        </mesh>
      </Float>

      {/* Secondary orb — Onni/chat (purple), upper-right */}
      <Float speed={1.9} rotationIntensity={0.22} floatIntensity={0.85}>
        <mesh
          ref={chatRef}
          scale={base * 0.54}
          position={[base * 1.05, base * 0.72, -base * 0.5]}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#A381DC"
            distort={0.36}
            speed={2.1}
            roughness={0.06}
            metalness={0.05}
            envMapIntensity={1.1}
            transparent
            opacity={0.84}
          />
        </mesh>
      </Float>

      {/* Tertiary orb — Ohjeet (coral), lower-right */}
      <Float speed={2.4} rotationIntensity={0.28} floatIntensity={1.1}>
        <mesh
          ref={helpRef}
          scale={base * 0.37}
          position={[base * 0.9, -base * 0.82, -base * 0.3]}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#F18A6E"
            distort={0.30}
            speed={1.8}
            roughness={0.08}
            metalness={0.04}
            envMapIntensity={1.0}
            transparent
            opacity={0.80}
          />
        </mesh>
      </Float>

      {/* Quaternary orb — Hätä (orange), lower-left */}
      <Float speed={1.6} rotationIntensity={0.20} floatIntensity={0.70}>
        <mesh
          ref={emerRef}
          scale={base * 0.27}
          position={[-base * 1.0, -base * 0.75, -base * 0.2]}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#F0973A"
            distort={0.22}
            speed={2.4}
            roughness={0.07}
            metalness={0.04}
            envMapIntensity={0.9}
            transparent
            opacity={0.76}
          />
        </mesh>
      </Float>
    </>
  )
}
