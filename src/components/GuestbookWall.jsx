import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fireConfettiBurstOnce } from './confettiBurst'

const FORM_ACTION = 'https://docs.google.com/forms/d/e/1FAIpQLSdTNdzIO-IZDdH0jl9CwaeSy0DzdcJtbsFUIDp2LJ2GWg1dQw/formResponse'
const ENTRY_FIELD = 'entry.133960006'

export default function GuestbookWall() {
  const [message, setMessage] = useState('')
  const [justSubmitted, setJustSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const trimmedMessage = message.trim()
    if (!trimmedMessage || submitting) return

    setSubmitting(true)
    try {
      const body = new URLSearchParams()
      body.set(ENTRY_FIELD, trimmedMessage)
      await fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body })
    } catch {
      // best effort, no-cors gives no visibility into success anyway
    }
    setSubmitting(false)

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
          disabled={!message.trim() || submitting}
          style={{
            marginTop: 12, width: '100%', border: 'none', borderRadius: 10, padding: '10px 16px',
            background: 'linear-gradient(90deg,#ffd700,#10b981)', color: '#04120b', fontWeight: 700,
            fontSize: '0.9rem', opacity: message.trim() && !submitting ? 1 : 0.5,
          }}
        >
          {submitting ? 'Sending...' : 'Add my wish ✨'}
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
    </div>
  )
}
