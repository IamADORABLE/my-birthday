import { useEffect, useRef, useState } from 'react'

const COLORS = ['#ffd700', '#10b981', '#34d399', '#f3d576']
let uid = 0

export default function CursorTrail() {
  const [sparks, setSparks] = useState([])
  const lastSpawn = useRef(0)

  useEffect(() => {
    const isCoarse = window.matchMedia('(pointer: coarse)').matches
    if (isCoarse) return undefined

    const onMove = (e) => {
      const now = performance.now()
      if (now - lastSpawn.current < 45) return
      lastSpawn.current = now

      const id = uid++
      const spark = {
        id,
        x: e.clientX,
        y: e.clientY,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 4 + Math.random() * 5,
      }
      setSparks((prev) => [...prev.slice(-24), spark])
      setTimeout(() => {
        setSparks((prev) => prev.filter((s) => s.id !== id))
      }, 700)
    }

    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}>
      {sparks.map((s) => (
        <span
          key={s.id}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            borderRadius: '50%',
            background: s.color,
            boxShadow: `0 0 8px ${s.color}, 0 0 16px ${s.color}`,
            transform: 'translate(-50%, -50%)',
            animation: 'sparkFade 0.7s ease-out forwards',
          }}
        />
      ))}
      <style>{`
        @keyframes sparkFade {
          0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -150%) scale(0.3); }
        }
      `}</style>
    </div>
  )
}
