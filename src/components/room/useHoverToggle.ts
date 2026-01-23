import { useEffect, useRef, useState } from 'react'

/**
 * While `isHovering` is true, toggles between frame 1 and 2 on an interval.
 * When not hovering, resets back to frame 1.
 */
export function useHoverToggle(isHovering: boolean, intervalMs: number) {
  const [frame, setFrame] = useState<1 | 2>(1)
  const intervalRef = useRef<number | null>(null)

  useEffect(() => {
    if (isHovering) {
      if (intervalRef.current != null) window.clearInterval(intervalRef.current)
      intervalRef.current = window.setInterval(() => {
        setFrame(f => (f === 1 ? 2 : 1))
      }, intervalMs)
    } else {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      setFrame(1)
    }

    return () => {
      if (intervalRef.current != null) {
        window.clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isHovering, intervalMs])

  return frame
}
