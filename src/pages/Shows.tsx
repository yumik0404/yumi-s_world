import React from 'react'
import ScrollReveal from '../components/ScrollReveal'

type Show = {
  date: string
  venue: string
  city: string
  link?: string
  past?: boolean
}

const shows: Show[] = [
  { date: '2026-04-12', venue: 'TBD Venue', city: 'New York, NY' },
  { date: '2025-12-01', venue: 'Past Venue', city: 'Brooklyn, NY', past: true },
]

export default function Shows() {
  const upcoming = shows.filter(s => !s.past)
  const past = shows.filter(s => s.past)

  return (
    <div className="shows">
      <ScrollReveal>
        <h2 className="section-title">Shows</h2>
        <p className="section-subtitle">Upcoming &amp; past performances</p>
      </ScrollReveal>

      {upcoming.length > 0 && (
        <ScrollReveal delay={100}>
          <h3 className="shows-heading">Upcoming</h3>
          <div className="shows-list">
            {upcoming.map((s, i) => (
              <div className="shows-card" key={i}>
                <span className="shows-date">{s.date}</span>
                <span className="shows-venue">{s.venue}</span>
                <span className="shows-city">{s.city}</span>
                {s.link && <a className="shows-link" href={s.link} target="_blank" rel="noopener noreferrer">Tickets →</a>}
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}

      {past.length > 0 && (
        <ScrollReveal delay={200}>
          <h3 className="shows-heading">Past</h3>
          <div className="shows-list">
            {past.map((s, i) => (
              <div className="shows-card shows-card--past" key={i}>
                <span className="shows-date">{s.date}</span>
                <span className="shows-venue">{s.venue}</span>
                <span className="shows-city">{s.city}</span>
              </div>
            ))}
          </div>
        </ScrollReveal>
      )}
    </div>
  )
}
