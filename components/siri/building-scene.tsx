'use client'

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * BuildingScene — a procedurally-assembled low-poly building that
 * constructs itself floor-by-floor as `progress` (0 → 1) advances,
 * with a slow continuous rotation. No external 3D model files needed —
 * every shape is built from primitive Three.js geometry.
 *
 * `progress` is expected to be driven by the same GSAP ScrollTrigger
 * progress value already used elsewhere (e.g. ProcessTimeline).
 */

const FLOOR_COUNT = 6
const BRONZE = '#c9a15e'
const CHARCOAL = '#171512'
const CONCRETE = '#8a8378'

function Floor({
  index,
  total,
  progress,
}: {
  index: number
  total: number
  progress: number
}) {
  const ref = useRef<THREE.Group>(null)
  // Each floor "arrives" during its own slice of the overall progress
  const start = index / total
  const end = (index + 1) / total
  const localProgress = useMemo(() => {
    const p = (progress - start) / (end - start)
    return Math.min(1, Math.max(0, p))
  }, [progress, start, end])

  const eased = 1 - Math.pow(1 - localProgress, 3) // ease-out cubic
  const y = index * 0.62
  const targetY = y
  const startY = y - 3.2

  useFrame(() => {
    if (!ref.current) return
    ref.current.position.y = THREE.MathUtils.lerp(startY, targetY, eased)
    const mat = (ref.current.children[0] as THREE.Mesh)
      ?.material as THREE.MeshStandardMaterial
    if (mat) mat.opacity = eased
  })

  const isTop = index === total - 1
  const color = isTop ? BRONZE : index % 2 === 0 ? CHARCOAL : CONCRETE

  return (
    <group ref={ref} position={[0, startY, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.5, 2.4]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0}
          roughness={0.4}
          metalness={isTop ? 0.6 : 0.15}
        />
      </mesh>
      {/* Thin bronze edge line per floor for an architectural / blueprint feel */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(2.4, 0.5, 2.4)]} />
        <lineBasicMaterial color={BRONZE} transparent opacity={0.5 * eased} />
      </lineSegments>
    </group>
  )
}

function Building({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (!groupRef.current) return
    // Slow continuous rotation, like a product-shot turntable
    groupRef.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={groupRef}>
      {Array.from({ length: FLOOR_COUNT }).map((_, i) => (
        <Floor key={i} index={i} total={FLOOR_COUNT} progress={progress} />
      ))}
      {/* Ground / blueprint grid */}
      <gridHelper args={[8, 16, BRONZE, '#2a2722']} position={[0, -0.3, 0]} />
    </group>
  )
}

function Particles() {
  const points = useMemo(() => {
    const arr = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = Math.random() * 6 - 1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.02
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial color={BRONZE} size={0.025} transparent opacity={0.4} />
    </points>
  )
}

export function BuildingScene({ progress = 0 }: { progress?: number }) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [5, 3.5, 6], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-4, 2, -3]} intensity={0.6} color={BRONZE} />
        <Float speed={1} rotationIntensity={0} floatIntensity={0.4}>
          <Building progress={progress} />
        </Float>
        <Particles />
        <Environment preset="city" environmentIntensity={0.3} />
      </Suspense>
    </Canvas>
  )
}
