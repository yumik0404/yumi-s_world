import React from 'react'
import type { SiteMode } from '../App'

type NavItem = {
  id: string
  label: string
}

type TopNavProps = {
  onNavigate?: (sectionId: string) => void
  isOnDetailPage?: boolean
  nightMode: boolean
  setNightMode: (value: boolean) => void
  siteMode?: SiteMode
  onBackToLanding?: () => void
}

const designItems: NavItem[] = [
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'resume', label: 'Resume' },
]

const musicItems: NavItem[] = [
  { id: 'music-tracks', label: 'Music' },
  { id: 'shows', label: 'Shows' },
  { id: 'videos', label: 'Videos' },
  { id: 'music-contact', label: 'Contact' },
]

export default function TopNav({ onNavigate, isOnDetailPage, nightMode, setNightMode, siteMode = 'design', onBackToLanding }: TopNavProps) {
  const night = nightMode
  const items = siteMode === 'music' ? musicItems : designItems

  const scrollTo = (id: string) => {
    // If on detail page, use onNavigate to go back to main page first
    if (isOnDetailPage && onNavigate) {
      onNavigate(id)
      return
    }
    const el = document.getElementById(id)
    if (!el) return
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <header className="topnav" role="navigation" aria-label="Section navigation">
      <div className="topnav-inner">
        <button
          type="button"
          className="topnav-brand"
          onClick={() => onBackToLanding ? onBackToLanding() : scrollTo('home')}
        >
          Yumi&apos;s World
        </button>
        <div className="topnav-right">
          <nav className="topnav-links">
            {items.map(item => (
              <button
                key={item.id}
                type="button"
                className="topnav-link"
                onClick={() => scrollTo(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="topnav-toggle"
          style={{
            background: night ? '#232733' : '#fff',
            border: '1px solid rgba(0,0,0,0.12)', borderRadius: 999, width: 72, height: 34,
            boxShadow: '0 2px 6px rgba(0,0,0,0.08)', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '3px 5px', boxSizing: 'border-box', flexShrink: 0,
            transition: 'background 0.5s cubic-bezier(.4,0,.2,1)'
          }}
          onClick={() => setNightMode(!night)}
          aria-label={night ? 'Switch to day mode' : 'Switch to night mode'}
        >
          {/* Sun icon */}
          <span style={{
            width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: !night ? '#ffe066' : 'transparent',
            boxShadow: !night ? '0 2px 6px rgba(245,166,35,0.35)' : 'none',
            transition: 'background 0.3s ease, box-shadow 0.3s ease'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={!night ? '#f5a623' : '#888'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </span>
          {/* Moon icon */}
          <span style={{
            width: 24, height: 24, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: night ? '#3a4a6b' : 'transparent',
            boxShadow: night ? '0 2px 6px rgba(60,80,120,0.35)' : 'none',
            transition: 'background 0.3s ease, box-shadow 0.3s ease'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={night ? '#f5d76e' : '#bbb'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          </span>
        </button>
        </div>
      </div>
    </header>
  )
}
