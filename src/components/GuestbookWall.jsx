import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fireConfettiBurstOnce } from './confettiBurst'

const STORAGE_KEY = 'birthday-wishes'

function loadWishes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveWishes(wishes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes))
  } catch {
    // storage unavailable, skip persisting
  }
}

export default function GuestbookWall() {
  const canViewWishes = useMemo(
    () => new URLSearchParams(window.location.search).get('wishes') === '1',
    [],
  )
  const [wishes, setWishes] = useState([])
  const [message, setMessage] = useState('')
  const [justSubmitted, setJustSubmitted] = useState(false)

  useEffect(() => {
    if (canViewWishes) setWishes(loadWishes())
  }, [canViewWishes])

  const submit = (e) => {
    e.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    const existing = loadWishes()
    const wish = { id: Date.now(), message: trimmedMessage }
    const next = [wish, ...existing]
    saveWishes(next)
    if (canViewWishes) setWishes(next)

    setMessage('')
    fireConfettiBurstOnce()
    setJustSubmitted(true)
    setTimeout(() => setJustSubmitted(false), 3500)
  }

  return (
    <div style={{ width: '100%', maxWidth: 560 }}>
      <form onSubmit={submit} className="glass-card" style={{ borderRadius: 18, padding: 20, textAlign: 'left' }}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Leave an anonymous birthday wish..."
          maxLength={240}
          rows={3}
          style={{
            width: '100%', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,215,0,0.25)',
            borderRadius: 10, padding: '10px 12px', color: '#f2f7f2', fontSize: '0.9rem', resize: 'none',
            outline: 'none', fontFamily: 'inherit',
          }}
        />
        <button
          type="submit"
          disabled={!message.trim()}
          style={{
            marginTop: 12, width: '100%', border: 'none', borderRadius: 10, padding: '10px 16px',
            background: 'linear-gradient(90deg,#ffd700,#10b981)', color: '#04120b', fontWeight: 700,
            fontSize: '0.9rem', opacity: message.trim() ? 1 : 0.5,
          }}
        >
          Add my wish ✨
        </button>

        <AnimatePresence>
          {justSubmitted && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{ marginTop: 10, marginBottom: 0, color: '#9fe3c4', fontSize: '0.85rem', textAlign: 'center' }}
            >
              Thank you, your wish was added 💛
            </motion.p>
          )}
        </AnimatePresence>
      </form>

      {canViewWishes && (
        <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 340, overflowY: 'auto' }}>
          <AnimatePresence initial={false}>
            {wishes.length === 0 && (
              <p style={{ color: '#5fae82', fontSize: '0.85rem', textAlign: 'center' }}>
                No wishes yet.
              </p>
            )}
            {wishes.map((w) => (
              <motion.div
                key={w.id}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="glass-card"
                style={{ borderRadius: 14, padding: '12px 16px', textAlign: 'left' }}
              >
                <div style={{ color: '#e8f5ec', fontSize: '0.9rem' }}>{w.message}</div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}
