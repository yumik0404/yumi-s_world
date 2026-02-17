import React, { useState, useEffect, useMemo } from 'react'

export type ProjectData = {
  id: string
  title: string
  subtitle: string
  tags?: string[]
  heroImage?: string
  tileImage?: string
  overview: React.ReactNode
  problem: React.ReactNode
  solution: React.ReactNode
  solutionImage?: string
  process?: string[]
  results?: string
  gallery?: string[]
}

type Props = {
  project: ProjectData
  onBack: () => void
}

export default function ProjectDetail({ project, onBack }: Props) {
  const sections = useMemo(() => {
    const s = [
      { id: 'pd-overview', label: 'Overview' },
      { id: 'pd-problem', label: 'The Problem' },
      { id: 'pd-solution', label: 'The Solution' },
    ]
    if (project.process && project.process.length > 0) s.push({ id: 'pd-process', label: 'Process' })
    if (project.results) s.push({ id: 'pd-results', label: 'Results' })
    if (project.gallery && project.gallery.length > 0) s.push({ id: 'pd-gallery', label: 'Gallery' })
    return s
  }, [project])

  const [activeId, setActiveId] = useState(sections[0]?.id || '')

  useEffect(() => {
    const handleScroll = () => {
      const mid = window.innerHeight / 2
      let closestId = sections[0]?.id || ''
      let closestDist = Infinity
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const sectionMid = rect.top + rect.height / 2
        const dist = Math.abs(sectionMid - mid)
        if (dist < closestDist) {
          closestDist = dist
          closestId = s.id
        }
      }
      setActiveId(closestId)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="project-detail">
      <div className="project-detail-hero">
        {project.heroImage ? (
          <img src={project.heroImage} alt={`${project.title} hero`} className="project-detail-hero-img" />
        ) : (
          <div className="project-detail-hero-placeholder" />
        )}
        <div className="project-detail-hero-overlay">
          <button className="project-detail-back" onClick={onBack} type="button">
            ← Back to Projects
          </button>
          <div className="project-detail-hero-text">
            <h1 className="project-detail-title">{project.title}</h1>
            <p className="project-detail-subtitle">{project.subtitle}</p>
            {project.tags && project.tags.length > 0 && (
              <div className="project-detail-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="project-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="project-detail-layout">
        <nav className="project-detail-sidenav">
          {sections.map(s => (
            <button
              key={s.id}
              type="button"
              className={`project-detail-sidenav-item${activeId === s.id ? ' active' : ''}`}
              onClick={() => scrollToSection(s.id)}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <div className="project-detail-body">
          <section id="pd-overview" className="project-detail-section">
            <h2 className="project-detail-section-title">Overview</h2>
            <p className="project-detail-section-body">{project.overview}</p>
          </section>

          <section id="pd-problem" className="project-detail-section">
            <h2 className="project-detail-section-title">The Problem</h2>
            <p className="project-detail-section-body">{project.problem}</p>
          </section>

          <section id="pd-solution" className="project-detail-section project-detail-section--wide">
            <h2 className="project-detail-section-title">The Solution</h2>
            <div className="project-detail-solution-grid">
              <div className="project-detail-solution-text">
                <p className="project-detail-section-body">{project.solution}</p>
              </div>
              {project.solutionImage && (
                <div className="project-detail-solution-img-wrap">
                  <img
                    src={project.solutionImage}
                    alt={`${project.title} solution`}
                    className="project-detail-section-img"
                  />
                </div>
              )}
            </div>
          </section>

          {project.process && project.process.length > 0 && (
            <section id="pd-process" className="project-detail-section">
              <h2 className="project-detail-section-title">Process</h2>
              <ol className="project-detail-process">
                {project.process.map((step, i) => (
                  <li key={i} className="project-detail-process-step">{step}</li>
                ))}
              </ol>
            </section>
          )}

          {project.results && (
            <section id="pd-results" className="project-detail-section">
              <h2 className="project-detail-section-title">Results</h2>
              <p className="project-detail-section-body">{project.results}</p>
            </section>
          )}

          {project.gallery && project.gallery.length > 0 && (
            <section id="pd-gallery" className="project-detail-section">
              <h2 className="project-detail-section-title">Gallery</h2>
              <div className="project-detail-gallery">
                {project.gallery.map((img, i) => (
                  <div key={i} className="project-detail-gallery-item">
                    <img src={img} alt={`${project.title} screenshot ${i + 1}`} />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
