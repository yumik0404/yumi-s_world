import React, { useState } from 'react'

type LandingProps = {
  onChoose: (mode: 'design' | 'music') => void
  nightMode: boolean
  setNightMode: (v: boolean) => void
}

export default function Landing({ onChoose, nightMode, setNightMode }: LandingProps) {
  const [hovered, setHovered] = useState<'design' | 'music' | null>(null)

  return (
    <div className={`landing ${hovered ? `landing--hover-${hovered}` : ''}`}>
      {/* Animated background layers */}
      <div className="landing-bg landing-bg--design" />
      <div className="landing-bg landing-bg--music" />

      {/* Day / Night toggle in corner */}
      <button
        className="landing-mode-toggle"
        onClick={() => setNightMode(!nightMode)}
        aria-label={nightMode ? 'Switch to day mode' : 'Switch to night mode'}
      >
        {nightMode ? '☀️' : '🌙'}
      </button>

      {/* Name */}
      <h1 className="landing-title">Yumi&apos;s World</h1>

      {/* Two doors */}
      <div className="landing-doors">
        <button
          className="landing-door landing-door--design"
          onMouseEnter={() => setHovered('design')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChoose('design')}
        >
          <span className="landing-door-icon">✏️</span>
          <span className="landing-door-label">Design</span>
          <span className="landing-door-sub">Product Design &amp; UX</span>
        </button>

        <span className="landing-divider" />

        <button
          className="landing-door landing-door--music"
          onMouseEnter={() => setHovered('music')}
          onMouseLeave={() => setHovered(null)}
          onClick={() => onChoose('music')}
        >
          <span className="landing-door-icon">🎵</span>
          <span className="landing-door-label">Music</span>
          <span className="landing-door-sub">Performance &amp; Sound</span>
        </button>
      </div>
    </div>
  )
}
