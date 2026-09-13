import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { TRAITS } from './traits'
import { fireConfettiBurstOnce } from './confettiBurst'

const SPACING = 2.6

function Orb({ i, indexRef, color, isFinal }) {
  const group = useRef()
  const mesh = useRef()

  useFrame((state, delta) => {
    const offset = i - indexRef.current
    const abs = Math.abs(offset)
    const targetX = offset * SPACING
    const targetZ = -Math.min(abs, 3) * 1.1
    const baseScale = isFinal ? 1.15 : 1
    const targetScale = Math.max(0.32, baseScale - abs * 0.4)

    const ease = 1 - Math.pow(0.001, delta)
    group.current.position.x += (targetX - group.current.position.x) * ease
    group.current.position.z += (targetZ - group.current.position.z) * ease
    group.current.scale.x += (targetScale - group.current.scale.x) * ease
    group.current.scale.y += (targetScale - group.current.scale.y) * ease
    group.current.scale.z += (targetScale - group.current.scale.z) * ease

    mesh.current.rotation.x = state.clock.elapsedTime * 0.15
    mesh.current.rotation.y = state.clock.elapsedTime * 0.2
  })

  return (
    <Float speed={0.7} floatIntensity={0.4} rotationIntensity={0.1}>
      <group ref={group}>
        <mesh ref={mesh}>
          <icosahedronGeometry args={[0.85, 4]} />
          <MeshDistortMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isFinal ? 0.55 : 0.32}
            distort={0.3}
            speed={1}
            roughness={0.25}
            metalness={0.4}
          />
        </mesh>
      </group>
    </Float>
  )
}

function Orbs({ indexRef }) {
  return TRAITS.map((t, i) => (
    <Orb key={t.title} i={i} indexRef={indexRef} color={i % 2 === 0 ? '#10b981' : '#ffd700'} isFinal={t.isFinal} />
  ))
}

export default function AboutMeReveal() {
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const drag = useRef(null)
  const celebratedFinal = useRef(false)
  const count = TRAITS.length

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(count - 1, next))
    indexRef.current = clamped
    setIndex(clamped)
    if (TRAITS[clamped].isFinal && !celebratedFinal.current) {
      celebratedFinal.current = true
      fireConfettiBurstOnce()
    }
  }

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { pointerId: e.pointerId, startX: e.clientX, startIndex: index }
  }
  const endDrag = (e) => {
    const d = drag.current
    if (!d || d.pointerId !== e.pointerId) return
    drag.current = null
    if (e.currentTarget.hasPointerCapture?.(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId)
    }
    const deltaX = e.clientX - d.startX
    if (deltaX < -40) goTo(d.startIndex + 1)
    else if (deltaX > 40) goTo(d.startIndex - 1)
  }

  const dots = useMemo(() => Array.from({ length: count }, (_, i) => i), [count])
  const current = TRAITS[index]

  return (
    <div style={{ width: '100%', maxWidth: 640 }}>
      <div
        style={{ width: '100%', height: 220, cursor: 'grab', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Canvas camera={{ position: [0, 0.2, 6.5], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ffd700" />
          <pointLight position={[-5, -2, -5]} intensity={0.8} color="#10b981" />
          <Suspense fallback={null}>
            <Orbs indexRef={indexRef} />
          </Suspense>
        </Canvas>
      </div>

      <div className="glass-card" style={{ borderRadius: 20, padding: '24px 26px', textAlign: 'left', minHeight: 160 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <h3
              className="neon-font"
              style={{
                margin: 0, marginBottom: 10, fontSize: current.isFinal ? '1.5rem' : '1.15rem',
                color: current.isFinal ? '#ffd700' : '#fff',
                textShadow: current.isFinal
                  ? '0 0 10px rgba(255,215,0,0.7), 0 0 24px rgba(255,215,0,0.4)'
                  : 'none',
              }}
            >
              {current.title}
            </h3>
            <p style={{ margin: 0, color: '#e8f5ec', fontSize: '0.95rem', lineHeight: 1.7 }}>
              {current.body}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 16 }}>
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous"
          className="glass-card"
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none', color: '#fff',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: index === 0 ? 0.3 : 1,
          }}
        >
          ‹
        </button>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center', maxWidth: 220 }}>
          {dots.map((d) => (
            <button
              key={d}
              onClick={() => goTo(d)}
              aria-label={`Go to ${TRAITS[d].title}`}
              style={{
                width: d === index ? 18 : 7, height: 7, borderRadius: 4, border: 'none',
                background: d === index ? 'linear-gradient(90deg,#ffd700,#10b981)' : 'rgba(255,255,255,0.25)',
                transition: 'all 0.25s ease', padding: 0,
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(index + 1)}
          disabled={index === count - 1}
          aria-label="Next"
          className="glass-card"
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none', color: '#fff',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: index === count - 1 ? 0.3 : 1,
          }}
        >
          ›
        </button>
      </div>
    </div>
  )
}
