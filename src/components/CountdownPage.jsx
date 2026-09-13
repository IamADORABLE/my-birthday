import { motion } from 'framer-motion'
import CountdownTimer from './CountdownTimer'
import PhotoCarousel3D from './PhotoCarousel3D'
import AboutMeReveal from './AboutMeReveal'
import SecretCake from './SecretCake'

export default function CountdownPage({ target, name, onComplete }) {
  const dateLabel = target.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div style={{
      position: 'relative', zIndex: 1, minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '48px 16px 64px', textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="neon-font glow-gold" style={{
          fontSize: 'clamp(0.85rem, 2vw, 1.1rem)', letterSpacing: 6, color: '#ffd700',
          textTransform: 'uppercase', marginBottom: 14,
        }}>
          Something Sparkly Is Coming
        </div>
        <h1 className="neon-font glow-emerald" style={{
          fontSize: 'clamp(2.2rem, 7vw, 4.5rem)', margin: 0, color: '#fff', fontWeight: 900,
          lineHeight: 1.1,
        }}>
          {name}'s Birthday
        </h1>
        <p style={{
          marginTop: 14, fontSize: 'clamp(1rem, 2.4vw, 1.3rem)', color: '#d9f2e3',
          maxWidth: 560,
        }}>
          is almost here, mark your calendars for <strong style={{ color: '#fff' }}>{dateLabel}</strong> ✨
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ marginTop: 40 }}
      >
        <CountdownTimer target={target} onComplete={onComplete} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        style={{ marginTop: 56, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="neon-font" style={{ fontSize: '1.1rem', letterSpacing: 3, color: '#9fe3c4', marginBottom: 14 }}>
          WHO I AM
        </h2>
        <AboutMeReveal />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        style={{ marginTop: 56, width: '100%', maxWidth: 900 }}
      >
        <h2 className="neon-font" style={{ fontSize: '1.1rem', letterSpacing: 3, color: '#9fe3c4', marginBottom: 4 }}>
          A LITTLE PREVIEW
        </h2>
        <PhotoCarousel3D />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        style={{ marginTop: 48, color: '#5fae82', fontSize: '0.85rem', maxWidth: 480 }}
      >
        <SecretCake /> The countdown ends and the celebration unlocks automatically on the big day.
      </motion.p>
    </div>
  )
}
