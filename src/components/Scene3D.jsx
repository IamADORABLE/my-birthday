import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Stars, MeshDistortMaterial, MeshWobbleMaterial, Sparkles } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

function NeonBlob({ position, color, scale = 1, speed = 1, distort = 0.25 }) {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.06 * speed
    mesh.current.rotation.y = state.clock.elapsedTime * 0.09 * speed
  })
  return (
    <Float speed={speed * 0.6} rotationIntensity={0.25} floatIntensity={0.7}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.28}
          distort={distort}
          speed={0.8}
          roughness={0.3}
          metalness={0.35}
        />
      </mesh>
    </Float>
  )
}

function NeonRing({ position, color, scale = 1, speed = 1 }) {
  const mesh = useRef()
  useFrame((state) => {
    mesh.current.rotation.z = state.clock.elapsedTime * 0.08 * speed
  })
  return (
    <Float speed={speed * 0.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <torusGeometry args={[1, 0.28, 32, 100]} />
        <MeshWobbleMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.32}
          factor={0.15}
          speed={0.6}
          roughness={0.35}
          metalness={0.4}
        />
      </mesh>
    </Float>
  )
}

function Rig() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 1.2 - state.camera.position.x) * 0.02
    state.camera.position.y += (state.pointer.y * 0.8 - state.camera.position.y) * 0.02
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene3D() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 9], fov: 55 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#041209']} />
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#ffd700" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#10b981" />

        <Suspense fallback={null}>
          <Stars radius={60} depth={40} count={2000} factor={2.4} saturation={0} fade speed={0.4} />
          <Sparkles count={35} scale={12} size={2} speed={0.2} color="#ffd700" />

          <NeonBlob position={[-3.2, 1.4, -2]} color="#10b981" scale={1.3} speed={0.6} />
          <NeonBlob position={[3.4, -1.2, -3]} color="#ffd700" scale={1.6} speed={0.7} />
          <NeonBlob position={[2.6, 2.4, -4]} color="#34d399" scale={0.85} speed={0.8} />
          <NeonRing position={[-2.8, -1.8, -2.5]} color="#ffd700" scale={0.85} speed={0.7} />

          <EffectComposer disableNormalPass>
            <Bloom mipmapBlur luminanceThreshold={0.4} intensity={0.45} radius={0.5} />
          </EffectComposer>
        </Suspense>
        <Rig />
      </Canvas>
    </div>
  )
}
