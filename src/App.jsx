import { useMemo, useState } from 'react'
import Scene3D from './components/Scene3D'
import CountdownPage from './components/CountdownPage'
import CelebrationPage from './components/CelebrationPage'
import CursorTrail from './components/CursorTrail'

const NAME = 'Adorable'
const BIRTHDAY_TARGET = new Date(2026, 8, 14, 0, 0, 0) // Sept 14, 2026 (month is 0-indexed)

export default function App() {
  const forcePreview = useMemo(
    () => new URLSearchParams(window.location.search).get('party') === '1',
    [],
  )
  const [arrived, setArrived] = useState(() => forcePreview || Date.now() >= BIRTHDAY_TARGET.getTime())

  return (
    <>
      <CursorTrail />
      <Scene3D />
      {arrived ? (
        <CelebrationPage name={NAME} />
      ) : (
        <CountdownPage target={BIRTHDAY_TARGET} name={NAME} onComplete={() => setArrived(true)} />
      )}
    </>
  )
}
