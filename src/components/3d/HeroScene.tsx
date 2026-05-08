import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei'
import type { Mesh } from 'three'

export default function HeroScene() {
  const meshRef = useRef<Mesh>(null)
  const { viewport } = useThree()

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.25
    meshRef.current.rotation.x += delta * 0.08
  })

  const scale = Math.min(viewport.width, viewport.height) * 0.32

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, -2, -4]} intensity={0.6} color="#8AB8FF" />
      <pointLight position={[4, -4, 2]} intensity={0.3} color="#D4B8FF" />

      <Environment preset="city" />

      <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6}>
        <mesh ref={meshRef} scale={scale}>
          <sphereGeometry args={[1, 128, 128]} />
          <MeshDistortMaterial
            color="#3F7FE0"
            distort={0.3}
            speed={1.8}
            roughness={0.05}
            metalness={0.1}
            envMapIntensity={1.2}
            transparent
            opacity={0.92}
          />
        </mesh>
      </Float>
    </>
  )
}
