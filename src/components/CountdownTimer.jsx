import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

function getTimeLeft(target) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function Unit({ value, label }) {
  return (
    <div className="glass-card" style={{
      borderRadius: 18,
      padding: '18px 14px',
      minWidth: 88,
      textAlign: 'center',
    }}>
      <motion.div
        key={value}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="neon-font glow-emerald"
        style={{ fontSize: 'clamp(2rem, 6vw, 3.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1 }}
      >
        {String(value).padStart(2, '0')}
      </motion.div>
      <div style={{
        marginTop: 8, fontSize: '0.7rem', letterSpacing: 3, textTransform: 'uppercase',
        color: '#9fe3c4', opacity: 0.85,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function CountdownTimer({ target, onComplete }) {
  const [time, setTime] = useState(() => getTimeLeft(target))

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeLeft(target)
      setTime(t)
      if (t.total <= 0) {
        clearInterval(id)
        onComplete?.()
      }
    }, 1000)
    return () => clearInterval(id)
  }, [target, onComplete])

  return (
    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
      <Unit value={time.days} label="Days" />
      <Unit value={time.hours} label="Hours" />
      <Unit value={time.minutes} label="Mins" />
      <Unit value={time.seconds} label="Secs" />
    </div>
  )
}
