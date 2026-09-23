import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

type Video = {
  title: string
  embedUrl?: string   // YouTube / Vimeo embed
  thumbnail?: string
}

const videos: Video[] = [
  { title: 'Video 01' },
  { title: 'Video 02' },
  { title: 'Video 03' },
]

export default function Videos() {
  return (
    <div className="videos">
      <ScrollReveal>
        <h2 className="section-title">Videos</h2>
        <p className="section-subtitle">Visuals &amp; live footage</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="videos-grid">
          {videos.map((v, i) => (
            <div className="videos-card" key={i}>
              {v.embedUrl ? (
                <iframe
                  className="videos-embed"
                  src={v.embedUrl}
                  allow="autoplay; encrypted-media; fullscreen"
                  loading="lazy"
                  title={v.title}
                />
              ) : (
                <div className="videos-placeholder" />
              )}
              <p className="videos-title">{v.title}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  )
}
