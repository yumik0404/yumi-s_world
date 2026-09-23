import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function MusicBio() {
  return (
    <div className="music-bio">
      <ScrollReveal>
        <h2 className="section-title">Bio</h2>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="music-bio-content">
          <div className="music-bio-photo">
            <img className="about-photo-img" src="/assets/me.jpg" alt="Portrait of Yumi" />
            <div className="music-bio-photo-placeholder" />
          </div>
          <div className="music-bio-text">
            <p>
              Yumi Kim is a multidisciplinary artist bridging design and music. With a love for
              experimentation, she blends electronic textures, live performance, and visual
              storytelling into immersive sonic experiences.
            </p>
            <p>
              Whether on stage or behind the screen, every project is an exploration of
              feeling, rhythm, and connection.
            </p>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
