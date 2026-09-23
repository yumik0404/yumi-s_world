import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function MusicHome() {
  return (
    <div className="music-hero">
      <ScrollReveal>
        <div className="music-hero-inner">
          <div className="music-hero-photo">
            <img src="/assets/headshot.jpg" alt="Portrait of Yumi" />
          </div>
          <div className="music-hero-text">
            <h1 className="music-hero-title">Yumi Kim</h1>
            <p className="music-hero-body">
              Multidisciplinary artist bridging design and music. With a love for
              experimentation, she blends electronic textures, live performance, and visual
              storytelling into immersive sonic experiences.
            </p>
            <p className="music-hero-body">
              Whether on stage or behind the screen, every project is an exploration of
              feeling, rhythm, and connection.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
