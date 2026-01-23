import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './room.css'

export default function Room() {
  const navigate = useNavigate()
  const [night, setNight] = useState(false)
  const [isGirlHover, setIsGirlHover] = useState(false)
  const [girlFrame, setGirlFrame] = useState<1 | 2>(1)
  const waveIntervalRef = useRef<number | null>(null)

  const [isDeerHover, setIsDeerHover] = useState(false)
  const [deerFrame, setDeerFrame] = useState<1 | 2>(1)
  const deerIntervalRef = useRef<number | null>(null)

  const [isAboutHover, setIsAboutHover] = useState(false)
  const [isArtHover, setIsArtHover] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('night-mode', night)
    return () => document.body.classList.remove('night-mode')
  }, [night])

  // Start/stop looping between girl1 and girl2 while hovering
  useEffect(() => {
    if (isGirlHover) {
      // avoid double intervals
      if (waveIntervalRef.current != null) window.clearInterval(waveIntervalRef.current)
      waveIntervalRef.current = window.setInterval(() => {
        setGirlFrame(f => (f === 1 ? 2 : 1))
      }, 450) // adjust speed (ms)
    } else {
      if (waveIntervalRef.current != null) {
        window.clearInterval(waveIntervalRef.current)
        waveIntervalRef.current = null
      }
      setGirlFrame(1)
    }

    return () => {
      if (waveIntervalRef.current != null) {
        window.clearInterval(waveIntervalRef.current)
        waveIntervalRef.current = null
      }
    }
  }, [isGirlHover])

  // Start/stop looping between deer1 and deer2
  useEffect(() => {
    // Always animate the deer (not hover-gated)
    if (deerIntervalRef.current != null) window.clearInterval(deerIntervalRef.current)
    deerIntervalRef.current = window.setInterval(() => {
      setDeerFrame(f => (f === 1 ? 2 : 1))
    }, 800) // adjust deer speed (ms)

    return () => {
      if (deerIntervalRef.current != null) {
        window.clearInterval(deerIntervalRef.current)
        deerIntervalRef.current = null
      }
    }
  }, [])

  const onClickInteractive = (e: React.MouseEvent<SVGGElement, MouseEvent>) => {
    const link = (e.currentTarget as SVGGElement).dataset.link
    if (link) navigate(link)
  }

  const onKeyDownInteractive = (e: React.KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const link = (e.currentTarget as SVGGElement).dataset.link
      if (link) navigate(link)
    }
  }

  // Overlay SVG coordinate space (like a viewBox)
  const OVERLAY_W = 1440
  const OVERLAY_H = 900

  // Keep these the same so girl1/girl2 sit exactly on top of each other
  const girlX = 50
  const girlY = OVERLAY_H - 1100
  const girlW = 1300
  const girlH = 1300

  // Smaller hover hitbox (tune these numbers)
  const girlHitX = girlX + 215
  const girlHitY = girlY + 800
  const girlHitW = 100
  const girlHitH = 250

  // New clickable hitbox next to the hair area -> About page (tune these numbers)
  const aboutHitX = girlHitX + girlHitW - 10
  const aboutHitY = girlHitY + 60
  const aboutHitW = 110
  const aboutHitH = 200

  // Deer placement (same size so deer1/deer2 sit on top of each other)
  const deerX = 600
  const deerY = OVERLAY_H - 1000 // moved down by 100px
  const deerW = 1300
  const deerH = 1300

  // Deer hover hitbox (tune these)
  const deerHitX = deerX + 570
  const deerHitY = deerY + 800
  const deerHitW = 130
  const deerHitH = 80

  return (
    <div className="room" style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', minHeight: 0, minWidth: 0, zIndex: 0, display: 'block' }}>      

      <div
        style={{
          position: 'absolute',
          top: 24,
          left: 40,
          zIndex: 10,
          fontSize: 40,
          fontWeight: 600,
          letterSpacing: '0.2px',
          color: 'var(--fg)',
          textShadow: '0 5px 6px rgba(96, 135, 72, 0.18)',
          userSelect: 'none',
          pointerEvents: 'none',
          
        }}
      >
        Welcome to Yumi&apos;s World
      </div>

      <button
        style={{
          position: 'absolute', top: 24, right: 24, zIndex: 10,
          background: night ? '#232733' : '#fff',
          color: night ? '#e6e6e6' : '#232733',
          border: '1px solid #bbb', borderRadius: 20, padding: '8px 18px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer',
          transition: 'background 0.7s cubic-bezier(.4,0,.2,1), color 0.7s cubic-bezier(.4,0,.2,1)'
        }}
        onClick={() => setNight(n => !n)}
        aria-label={night ? 'Switch to day mode' : 'Switch to night mode'}
      >
        {night ? 'Night' : 'Day'}
      </button>

      <svg
        viewBox={`0 0 ${OVERLAY_W} ${OVERLAY_H}`}
        preserveAspectRatio="xMinYMax meet"
        style={{
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          height: 'auto',
          pointerEvents: 'none',
          zIndex: 2
        }}
        onMouseLeave={() => {
          setIsGirlHover(false)
          setIsDeerHover(false)
          setIsAboutHover(false)
          setIsArtHover(false)
        }}
      >
        {/* Girl image (display only) */}
        <image
          href={girlFrame === 2 ? '/assets/girl2.png' : '/assets/girl1.png'}
          x={girlX}
          y={girlY}
          width={girlW}
          height={girlH}
          style={{ pointerEvents: 'none' }}
        />

        {/* Girl hover target area */}
        <rect
          x={girlHitX}
          y={girlHitY}
          width={girlHitW}
          height={girlHitH}
          fill="transparent"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => setIsGirlHover(true)}
          onMouseLeave={() => setIsGirlHover(false)}
        />

        {/* About clickable area next to hair */}
        <rect
          x={aboutHitX}
          y={aboutHitY}
          width={aboutHitW}
          height={aboutHitH}
          fill="transparent"
          vectorEffect="non-scaling-stroke"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => setIsAboutHover(true)}
          onMouseLeave={() => setIsAboutHover(false)}
          onClick={() => navigate('/about')}
        />

        {isAboutHover && (
          <g style={{ pointerEvents: 'none' }}>
            <text
              x={aboutHitX + aboutHitW / 2}
              y={aboutHitY - 31}
              textAnchor="middle"
              fontSize={20}
              fontWeight={600}
              fill="var(--fg)"
              style={{ userSelect: 'none' }}
            >
              About me
            </text>
          </g>
        )}

        {/* Deer image (display only) */}
        <image
          href={deerFrame === 2 ? '/assets/deer2.png' : '/assets/deer1.png'}
          x={deerX}
          y={deerY}
          width={deerW}
          height={deerH}
          style={{ pointerEvents: 'none' }}
        />

        {/* Deer hover target area */}
        <rect
          x={deerHitX}
          y={deerHitY}
          width={deerHitW}
          height={deerHitH}
          fill="transparent"
          style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          onMouseEnter={() => {
            setIsDeerHover(true)
            setIsArtHover(true)
          }}
          onMouseLeave={() => {
            setIsDeerHover(false)
            setIsArtHover(false)
          }}
          onClick={() => navigate('/art')}
        />

        {isArtHover && (
          <g style={{ pointerEvents: 'none' }}>
            <text
              x={deerHitX + deerHitW / 2}
              y={deerHitY - 14}
              textAnchor="middle"
              fontSize={20}
              fontWeight={600}
              fill="var(--fg)"
              style={{ userSelect: 'none' }}
            >
              Art
            </text>
          </g>
        )}
        
      </svg>
    </div>
  )

}
