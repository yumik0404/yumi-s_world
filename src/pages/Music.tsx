import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

type Track = {
  title: string
  artist?: string
  src?: string          // direct audio URL or file path
  embedUrl?: string     // Spotify / SoundCloud / YouTube embed
}

const tracks: Track[] = [
  { title: 'Track 01' },
  { title: 'Track 02' },
  { title: 'Track 03' },
]

export default function Music() {
  return (
    <div className="music">
      <ScrollReveal>
        <h2 className="section-title">Music</h2>
        <p className="section-subtitle">A few things I've been listening to & making</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="music-grid">
          {tracks.map((t, i) => (
            <div className="music-card" key={i}>
              {t.embedUrl ? (
                <iframe
                  className="music-embed"
                  src={t.embedUrl}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title={t.title}
                />
              ) : t.src ? (
                <audio controls className="music-audio" preload="metadata">
                  <source src={t.src} />
                </audio>
              ) : (
                <div className="music-placeholder" />
              )}
              <p className="music-title">{t.title}</p>
              {t.artist && <p className="music-artist">{t.artist}</p>}
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}
