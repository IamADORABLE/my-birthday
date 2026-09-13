import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Image, Float } from '@react-three/drei'

const photoModules = import.meta.glob('../assets/photos/*.{jpg,jpeg,png}', {
  eager: true,
  import: 'default',
})
const photos = Object.values(photoModules)

const SPACING = 2.9

function Slide({ src, i, indexRef }) {
  const group = useRef()
  const imgRef = useRef()

  useFrame((_, delta) => {
    const offset = i - indexRef.current
    const abs = Math.abs(offset)
    const targetX = offset * SPACING
    const targetZ = -Math.min(abs, 3) * 1.1
    const targetScale = Math.max(0.3, 1 - abs * 0.42)
    const targetOpacity = Math.max(0.15, 1 - abs * 0.5)

    const ease = 1 - Math.pow(0.001, delta)
    group.current.position.x += (targetX - group.current.position.x) * ease
    group.current.position.z += (targetZ - group.current.position.z) * ease
    group.current.scale.x += (targetScale - group.current.scale.x) * ease
    group.current.scale.y += (targetScale - group.current.scale.y) * ease

    const mat = imgRef.current?.material
    if (mat) {
      mat.transparent = true
      mat.opacity += (targetOpacity - mat.opacity) * ease
    }
  })

  return (
    <Float speed={0.6} floatIntensity={0.2} rotationIntensity={0} floatingRange={[-0.06, 0.06]}>
      <group ref={group}>
        <Image ref={imgRef} url={src} scale={[2.9, 3.6]} radius={0.14} />
      </group>
    </Float>
  )
}

function Slides({ indexRef }) {
  return photos.map((src, i) => <Slide key={src} src={src} i={i} indexRef={indexRef} />)
}

export default function PhotoCarousel3D({ height = 480 }) {
  const [index, setIndex] = useState(0)
  const indexRef = useRef(0)
  const drag = useRef(null)
  const count = photos.length

  const goTo = (next) => {
    const clamped = Math.max(0, Math.min(count - 1, next))
    indexRef.current = clamped
    setIndex(clamped)
  }

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { pointerId: e.pointerId, startX: e.clientX, startIndex: index }
  }
  const onPointerMove = () => {}
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

  if (count === 0) return null

  return (
    <div style={{ width: '100%' }}>
      <div
        style={{ width: '100%', height, cursor: 'grab', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <Canvas camera={{ position: [0, 0.4, 8.8], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}>
          <ambientLight intensity={0.9} />
          <pointLight position={[5, 5, 5]} intensity={1} color="#ffd700" />
          <pointLight position={[-5, -2, -5]} intensity={0.8} color="#10b981" />
          <Suspense fallback={null}>
            <Slides indexRef={indexRef} />
          </Suspense>
        </Canvas>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 6 }}>
        <button
          onClick={() => goTo(index - 1)}
          disabled={index === 0}
          aria-label="Previous photo"
          className="glass-card"
          style={{
            width: 40, height: 40, borderRadius: '50%', border: 'none', color: '#fff',
            fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
            opacity: index === 0 ? 0.3 : 1,
          }}
        >
          ‹
        </button>

        <div style={{ display: 'flex', gap: 6 }}>
          {dots.map((d) => (
            <button
              key={d}
              onClick={() => goTo(d)}
              aria-label={`Go to photo ${d + 1}`}
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
          aria-label="Next photo"
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
