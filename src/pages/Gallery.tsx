import React from 'react'

type GalleryItem = {
  title: string
}

const placeholderItems: GalleryItem[] = [
  { title: 'Piece 01' },
  { title: 'Piece 02' },
  { title: 'Piece 03' },
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
      <h2 className="section-title">Gallery</h2>
      <p className="section-subtitle">(Placeholder) Add your art, photos, or screenshots here.</p>

      <div className="gallery-grid" role="list">
        {placeholderItems.map(item => (
          <div key={item.title} className="gallery-tile" role="listitem">
            <div className="gallery-tile-label">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
