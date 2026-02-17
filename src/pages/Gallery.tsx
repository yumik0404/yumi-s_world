import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

type GalleryItem = {
  title: string
  image?: string
}

const placeholderItems: GalleryItem[] = [
  { title: 'artwork_bunny', image: '/assets/artwork_bunny.JPG' },
    { title: 'snoopyxmiffy', image: '/assets/snoopyxmiffy.MP4' },
  { title: 'artwork_sketch', image: '/assets/artwork_sketch.png' },
  { title: 'artwork_cafe', image: '/assets/artwork_cat.png' },
  { title: 'Piece 04' },
  { title: 'Piece 05' },
  { title: 'Piece 06' },
  { title: 'Piece 07' },
  { title: 'Piece 08' },
  { title: 'Piece 09' },
]

export default function Gallery() {
  return (
    <div className="gallery">
      <ScrollReveal>
        <h2 className="section-title">Gallery</h2>
        <p className="section-subtitle">Here are my creations :)</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="gallery-marquee" role="list">
          <div className="gallery-track">
            {placeholderItems.filter(item => item.image).concat(placeholderItems.filter(item => item.image)).map((item, idx) => {
              const isVideo = item.image && item.image.match(/\.mp4$/i);
              const key = `${item.title}-${idx}`;
              return (
                <div className="gallery-item" key={key} role="listitem">
                  {isVideo ? (
                    <video
                      src={item.image}
                      className="gallery-video-row"
                      controls
                      loop
                      playsInline
                      autoPlay
                      muted
                      preload="auto"
                      style={{ background: 'transparent' }}
                    />
                  ) : (
                    <img
                      src={item.image}
                      alt={item.title}
                      className={item.title === 'artwork_sketch' ? 'gallery-image-row gallery-image-large' : 'gallery-image-row'}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
