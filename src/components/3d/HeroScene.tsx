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
      <ambientLight intensity={0.35} />

      {/* Key light — warm amber from upper-right */}
      <directionalLight position={[5, 6, 4]} intensity={1.6} color="#FFD6A0" />

      {/* Fill light — deep ember from lower-left */}
      <pointLight position={[-4, -3, 2]} intensity={1.1} color="#FF9A5C" />

      {/* Rim light — dark cocoa from behind */}
      <pointLight position={[2, 4, -5]} intensity={0.6} color="#8C4A1E" />

      {/* Coral glow from lower-right */}
      <pointLight position={[4, -4, 2]} intensity={0.6} color="#FFB07A" />

      {/* Warm orange accent from bottom */}
      <pointLight position={[0, -5, 1]} intensity={0.5} color="#FFA050" />

      <Environment preset="sunset" />

      {/* Primary orb — deep amber, center-left */}
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.50}>
        <mesh ref={aiRef} scale={base * 0.95} position={[-base * 0.3, base * 0.1, 0]}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            color="#C97843"
            distort={0.26}
            speed={1.5}
            roughness={0.10}
            metalness={0.05}
            envMapIntensity={1.3}
            transparent
            opacity={0.94}
          />
        </mesh>
      </Float>

      {/* Secondary orb — warm amber-cream, upper-right */}
      <Float speed={1.9} rotationIntensity={0.22} floatIntensity={0.85}>
        <mesh
          ref={chatRef}
          scale={base * 0.54}
          position={[base * 1.05, base * 0.72, -base * 0.5]}
        >
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            color="#E8A86A"
            distort={0.36}
            speed={2.1}
            roughness={0.12}
            metalness={0.04}
            envMapIntensity={1.1}
            transparent
            opacity={0.86}
          />
        </mesh>
      </Float>

      {/* Tertiary orb — burnt sienna, lower-right */}
      <Float speed={2.4} rotationIntensity={0.28} floatIntensity={1.1}>
        <mesh
          ref={helpRef}
          scale={base * 0.37}
          position={[base * 0.9, -base * 0.82, -base * 0.3]}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#A85E2E"
            distort={0.30}
            speed={1.8}
            roughness={0.14}
            metalness={0.03}
            envMapIntensity={0.95}
            transparent
            opacity={0.82}
          />
        </mesh>
      </Float>

      {/* Quaternary orb — pale cream-gold, lower-left */}
      <Float speed={1.6} rotationIntensity={0.20} floatIntensity={0.70}>
        <mesh
          ref={emerRef}
          scale={base * 0.27}
          position={[-base * 1.0, -base * 0.75, -base * 0.2]}
        >
          <sphereGeometry args={[1, 48, 48]} />
          <MeshDistortMaterial
            color="#F5C684"
            distort={0.22}
            speed={2.4}
            roughness={0.10}
            metalness={0.03}
            envMapIntensity={0.9}
            transparent
            opacity={0.80}
          />
        </mesh>
      </Float>
    </>
  )
}
