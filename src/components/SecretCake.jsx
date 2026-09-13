import { useState } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fireConfetti } from './confettiBurst'

const THRESHOLD = 5

export default function SecretCake() {
  const [clicks, setClicks] = useState(0)
  const [revealed, setRevealed] = useState(false)

  const onClick = () => {
    const next = clicks + 1
    if (next >= THRESHOLD) {
      setClicks(0)
      setRevealed(true)
      fireConfetti()
      setTimeout(() => setRevealed(false), 4500)
    } else {
      setClicks(next)
    }
  }

  return (
    <>
      <span onClick={onClick} style={{ cursor: 'pointer' }} role="button" aria-label="Secret cake, keep clicking">
        🎂
      </span>

      {createPortal(
        <AnimatePresence>
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="glass-card"
              style={{
                position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
                zIndex: 10000, padding: '18px 24px', borderRadius: 18, maxWidth: 320,
                textAlign: 'center', pointerEvents: 'none',
              }}
            >
              <div style={{ fontSize: '1.4rem', marginBottom: 6 }}>🕹️✨ Secret found!</div>
              <div style={{ color: '#e8f5ec', fontSize: '0.9rem' }}>
                You've officially got VIP status at this birthday. Go treat yourself to something nice today 💛
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  )
}
