import React, { useEffect, useRef, useState } from 'react'

const STRIDE = 180
const FOOT_OFFSET = 24
const FOOT_WIDTH = 48
const FOOT_HEIGHT = 76

// Paths under public/, e.g. '/assets/foot-left.png'. Draw toes pointing up. Empty uses the built-in drawing.
const LEFT_FOOT_SRC = ''
const RIGHT_FOOT_SRC = ''

type Step = { x: number; y: number; rot: number; right: boolean }

function pathX(y: number, width: number) {
  const amp = Math.max(0, width / 2 - 60)
  return width / 2 + amp * (0.8 * Math.sin(y / 230) + 0.2 * Math.sin(y / 83 + 1.3))
}

function buildSteps(width: number, height: number): Step[] {
  const steps: Step[] = []
  let prevX = pathX(0, width)
  let prevY = 0
  let travelled = 0
  for (let y = 2; y < height - 20; y += 2) {
    const x = pathX(y, width)
    const dx = x - prevX
    const dy = y - prevY
    travelled += Math.hypot(dx, dy)
    if (travelled >= STRIDE) {
      travelled = 0
      const len = Math.hypot(dx, dy)
      const right = steps.length % 2 === 1
      // Walker's left side, perpendicular to the direction of travel.
      const side = right ? -FOOT_OFFSET : FOOT_OFFSET
      steps.push({
        x: x + (dy / len) * side,
        y: y - (dx / len) * side,
        rot: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
        right,
      })
    }
    prevX = x
    prevY = y
  }
  return steps
}

export default function Footsteps() {
  const ref = useRef<HTMLDivElement>(null)
  const [steps, setSteps] = useState<Step[]>([])
  const [revealY, setRevealY] = useState(0)

  useEffect(() => {
    const layer = ref.current
    if (!layer) return
    let frame = 0
    let size = ''

    const update = () => {
      frame = 0
      const { offsetWidth: w, offsetHeight: h } = layer
      if (`${w}x${h}` !== size) {
        size = `${w}x${h}`
        setSteps(buildSteps(w, h))
      }
      const top = layer.getBoundingClientRect().top + window.scrollY
      setRevealY(window.scrollY + window.innerHeight * 0.8 - top)
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const resizeObserver = new ResizeObserver(schedule)
    resizeObserver.observe(layer)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      resizeObserver.disconnect()
    }
  }, [])

  return (
    <div className="footsteps" ref={ref} aria-hidden="true">
      {steps.map((s, i) => {
        const src = s.right ? RIGHT_FOOT_SRC : LEFT_FOOT_SRC
        return (
          <span
            key={i}
            className={`footstep${s.right && !src ? ' footstep--mirror' : ''}${s.y < revealY ? ' footstep--visible' : ''}`}
            style={{ left: s.x, top: s.y, '--rot': `${s.rot}deg` } as React.CSSProperties}
          >
            {src ? (
              <img src={src} alt="" width={FOOT_WIDTH} height={FOOT_HEIGHT} />
            ) : (
              <svg viewBox="0 0 20 32" width={FOOT_WIDTH} height={FOOT_HEIGHT}>
                <ellipse cx="9" cy="21" rx="6" ry="9.5" />
                <circle cx="13.5" cy="5.5" r="2.6" />
                <circle cx="9.2" cy="4" r="1.9" />
                <circle cx="5.8" cy="5.2" r="1.6" />
                <circle cx="3.4" cy="7.8" r="1.4" />
              </svg>
            )}
          </span>
        )
      })}
    </div>
  )
}
