import confetti from 'canvas-confetti'

const colors = ['#10b981', '#045d39', '#34d399', '#ffd700', '#f3d576']

export function fireConfetti() {
  const duration = 4000
  const end = Date.now() + duration

  ;(function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 65, origin: { x: 0 }, colors })
    confetti({ particleCount: 4, angle: 120, spread: 65, origin: { x: 1 }, colors })
    if (Date.now() < end) requestAnimationFrame(frame)
  })()

  confetti({ particleCount: 140, spread: 100, origin: { y: 0.4 }, colors, startVelocity: 45 })
}

export function fireConfettiBurstOnce() {
  confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 }, colors })
}
