import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

export default function MusicContact() {
  return (
    <div className="music-contact">
      <ScrollReveal>
        <h2 className="section-title">Contact &amp; Booking</h2>
        <p className="section-subtitle">Get in touch for collaborations, bookings, or just to say hi</p>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="music-contact-content">
          <div className="music-contact-card">
            <p className="music-contact-label">Email</p>
            <a className="music-contact-value" href="mailto:hello@yumisworld.com">hello@yumisworld.com</a>
          </div>
          <div className="music-contact-card">
            <p className="music-contact-label">Socials</p>
            <div className="music-contact-links">
              <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="#" target="_blank" rel="noopener noreferrer">SoundCloud</a>
              <a href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
