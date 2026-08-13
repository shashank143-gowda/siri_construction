'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
import * as THREE from 'three'

/**
 * BuildingScene — a recognizable low-poly HOUSE (foundation, walls, roof,
 * door, windows, chimney) that assembles itself piece-by-piece as
 * `progress` (0 → 1) advances, with a slow continuous rotation.
 * Pure primitive geometry — no external model files needed.
 */

const PART_COUNT = 6
const BRONZE = '#c9a15e'
const CHARCOAL = '#171512'
const CHARCOAL_LIGHT = '#4a4438'
const CONCRETE = '#8a8378'
const GLASS = '#d8cdb0'

function AnimatedPart({
  index,
  total,
  progress,
  position,
  dropHeight = 1.4,
  children,
}: {
  index: number
  total: number
  progress: number
  position: [number, number, number]
  dropHeight?: number
  children: React.ReactNode
}) {
  const ref = useRef<THREE.Group>(null)
  const start = index / total
  const end = (index + 1) / total

  useFrame(() => {
    if (!ref.current) return
    const local = THREE.MathUtils.clamp((progress - start) / (end - start), 0, 1)
    const eased = 1 - Math.pow(1 - local, 3) // ease-out cubic
    ref.current.position.set(
      position[0],
      position[1] + (1 - eased) * dropHeight,
      position[2]
    )
    const s = 0.4 + 0.6 * eased
    ref.current.scale.set(s, s, s)
  })

  return (
    <group ref={ref} position={position}>
      {children}
    </group>
  )
}

function House({ progress }: { progress: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.15
  })

  const wallW = 2.6
  const wallH = 1.3
  const wallD = 2.1
  const foundH = 0.25
  const foundTopY = foundH / 2
  const wallY = foundH + wallH / 2
  const wallTopY = foundH + wallH
  const roofH = 1.0
  const roofY = wallTopY + roofH / 2

  return (
    <group ref={groupRef}>
      {/* 0: Foundation */}
      <AnimatedPart index={0} total={PART_COUNT} progress={progress} position={[0, foundTopY, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wallW + 0.3, foundH, wallD + 0.3]} />
          <meshStandardMaterial color={CONCRETE} roughness={0.7} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(wallW + 0.3, foundH, wallD + 0.3)]} />
          <lineBasicMaterial color={BRONZE} transparent opacity={0.4} />
        </lineSegments>
      </AnimatedPart>

      {/* 1: Walls */}
      <AnimatedPart index={1} total={PART_COUNT} progress={progress} position={[0, wallY, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[wallW, wallH, wallD]} />
          <meshStandardMaterial color={CHARCOAL_LIGHT} roughness={0.5} metalness={0.05} />
        </mesh>
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(wallW, wallH, wallD)]} />
          <lineBasicMaterial color={BRONZE} transparent opacity={0.4} />
        </lineSegments>
      </AnimatedPart>

      {/* 2: Roof (pyramid/hip) */}
      <AnimatedPart index={2} total={PART_COUNT} progress={progress} position={[0, roofY, 0]}>
        <mesh castShadow rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.85, roofH, 4]} />
          <meshStandardMaterial color={BRONZE} roughness={0.35} metalness={0.5} />
        </mesh>
      </AnimatedPart>

      {/* 3: Door */}
      <AnimatedPart
        index={3}
        total={PART_COUNT}
        progress={progress}
        position={[0, foundH + 0.45, wallD / 2 + 0.03]}
        dropHeight={0.6}
      >
        <mesh>
          <boxGeometry args={[0.5, 0.9, 0.06]} />
          <meshStandardMaterial color={CHARCOAL} roughness={0.6} />
        </mesh>
      </AnimatedPart>

      {/* 4: Windows */}
      <AnimatedPart
        index={4}
        total={PART_COUNT}
        progress={progress}
        position={[0, wallY + 0.15, wallD / 2 + 0.03]}
        dropHeight={0.5}
      >
        {[-0.75, 0.75].map((x) => (
          <mesh key={x} position={[x, 0, 0]}>
            <boxGeometry args={[0.42, 0.42, 0.05]} />
            <meshStandardMaterial color={GLASS} roughness={0.15} metalness={0.3} />
          </mesh>
        ))}
      </AnimatedPart>

      {/* 5: Chimney */}
      <AnimatedPart
        index={5}
        total={PART_COUNT}
        progress={progress}
        position={[0.85, wallTopY + 0.55, -0.3]}
        dropHeight={0.8}
      >
        <mesh castShadow>
          <boxGeometry args={[0.28, 0.7, 0.28]} />
          <meshStandardMaterial color={CHARCOAL} roughness={0.6} />
        </mesh>
      </AnimatedPart>

      {/* Ground / blueprint grid */}
      <gridHelper args={[8, 16, BRONZE, '#2a2722']} position={[0, -0.15, 0]} />
    </group>
  )
}

function Particles() {
  const points = (() => {
    const arr = new Float32Array(120 * 3)
    for (let i = 0; i < 120; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10
      arr[i * 3 + 1] = Math.random() * 6 - 1
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  })()

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
      camera={{ position: [5, 3.2, 5.5], fov: 40 }}
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
          <House progress={progress} />
        </Float>
        <Particles />
        <Environment preset="city" environmentIntensity={0.3} />
      </Suspense>
    </Canvas>
  )
}