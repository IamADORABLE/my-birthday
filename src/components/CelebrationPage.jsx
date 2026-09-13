import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PhotoCarousel3D from './PhotoCarousel3D'
import AboutMeReveal from './AboutMeReveal'
import GuestbookWall from './GuestbookWall'
import SecretCake from './SecretCake'
import { fireConfetti, fireConfettiBurstOnce } from './confettiBurst'

export default function CelebrationPage({ name }) {
  const [videoStarted, setVideoStarted] = useState(false)
  const videoRef = useRef(null)

  useEffect(() => {
    fireConfetti()
  }, [])

  const playVideo = () => {
    fireConfettiBurstOnce()
    setVideoStarted(true)
    videoRef.current?.play()
  }

  return (
    <div style={{
      position: 'relative', zIndex: 1, minHeight: '100vh',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      padding: '56px 16px 72px', textAlign: 'center',
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, type: 'spring' }}
      >
        <div className="neon-font glow-gold" style={{
          fontSize: 'clamp(1rem, 2.4vw, 1.3rem)', letterSpacing: 6, color: '#ffd700',
          textTransform: 'uppercase', marginBottom: 14,
        }}>
          🎉 It's Finally Here 🎉
        </div>
        <h1 className="neon-font glow-emerald" style={{
          fontSize: 'clamp(2.4rem, 9vw, 5.5rem)', margin: 0, color: '#fff', fontWeight: 900,
          lineHeight: 1.05,
        }}>
          Happy Birthday
        </h1>
        <h1 className="neon-font glow-emerald" style={{
          fontSize: 'clamp(2.4rem, 9vw, 5.5rem)', margin: 0, color: '#fff', fontWeight: 900,
          lineHeight: 1.05,
        }}>
          {name}!
        </h1>
        <p style={{ marginTop: 18, fontSize: 'clamp(1rem, 2.4vw, 1.3rem)', color: '#d9f2e3', maxWidth: 560 }}>
          Another year more amazing than the last. Here's to today and everything ahead ✨<SecretCake />
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="glass-card"
        style={{ marginTop: 44, padding: 16, borderRadius: 20, width: '100%', maxWidth: 640 }}
      >
        <div style={{ position: 'relative', borderRadius: 14, overflow: 'hidden' }}>
          <video
            ref={videoRef}
            src="/video/birthday-video.mp4"
            controls={videoStarted}
            playsInline
            style={{ width: '100%', display: 'block', borderRadius: 14, background: '#000' }}
          />
          {!videoStarted && (
            <button
              onClick={playVideo}
              style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
                justifyContent: 'center', background: 'rgba(6,0,20,0.35)', border: 'none',
              }}
              aria-label="Play video"
            >
              <span style={{
                width: 74, height: 74, borderRadius: '50%',
                background: 'linear-gradient(135deg, #ffd700, #10b981)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 30px rgba(255,215,0,0.5)',
              }}>
                <span style={{
                  width: 0, height: 0, borderTop: '14px solid transparent',
                  borderBottom: '14px solid transparent', borderLeft: '22px solid white',
                  marginLeft: 6,
                }} />
              </span>
            </button>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.7 }}
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
        transition={{ duration: 1, delay: 0.9 }}
        style={{ marginTop: 56, width: '100%', maxWidth: 900 }}
      >
        <h2 className="neon-font" style={{ fontSize: '1.1rem', letterSpacing: 3, color: '#9fe3c4', marginBottom: 4 }}>
          THE MEMORIES SO FAR
        </h2>
        <PhotoCarousel3D height={460} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        style={{ marginTop: 56, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h2 className="neon-font" style={{ fontSize: '1.1rem', letterSpacing: 3, color: '#9fe3c4', marginBottom: 14 }}>
          BIRTHDAY WISHES
        </h2>
        <GuestbookWall />
      </motion.div>
    </div>
  )
}
