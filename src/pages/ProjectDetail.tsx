import React from 'react'

export type ProjectData = {
  id: string
  title: string
  subtitle: string
  tags?: string[]
  heroImage?: string
  overview: string
  problem: string
  solution: string
  process?: string[]
  results?: string
  gallery?: string[]
}

type Props = {
  project: ProjectData
  onBack: () => void
}

export default function ProjectDetail({ project, onBack }: Props) {
  return (
    <div className="project-detail">
      <button className="project-detail-back" onClick={onBack} type="button">
        ← Back to Projects
      </button>

      <header className="project-detail-header">
        <h1 className="project-detail-title">{project.title}</h1>
        <p className="project-detail-subtitle">{project.subtitle}</p>
        {project.tags && project.tags.length > 0 && (
          <div className="project-detail-tags">
            {project.tags.map(tag => (
              <span key={tag} className="project-tag">{tag}</span>
            ))}
          </div>
        )}
      </header>

      <div className="project-detail-hero">
        {project.heroImage ? (
          <img src={project.heroImage} alt={`${project.title} hero`} className="project-detail-hero-img" />
        ) : (
          <div className="project-detail-hero-placeholder">Hero Image / Video</div>
        )}
      </div>

      <div className="project-detail-content">
        <section className="project-detail-section">
          <h2 className="project-detail-section-title">Overview</h2>
          <p className="project-detail-section-body">{project.overview}</p>
        </section>

        <section className="project-detail-section">
          <h2 className="project-detail-section-title">The Problem</h2>
          <p className="project-detail-section-body">{project.problem}</p>
        </section>

        <section className="project-detail-section">
          <h2 className="project-detail-section-title">The Solution</h2>
          <p className="project-detail-section-body">{project.solution}</p>
        </section>

        {project.process && project.process.length > 0 && (
          <section className="project-detail-section">
            <h2 className="project-detail-section-title">Process</h2>
            <ol className="project-detail-process">
              {project.process.map((step, i) => (
                <li key={i} className="project-detail-process-step">{step}</li>
              ))}
            </ol>
          </section>
        )}

        {project.results && (
          <section className="project-detail-section">
            <h2 className="project-detail-section-title">Results</h2>
            <p className="project-detail-section-body">{project.results}</p>
          </section>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <section className="project-detail-section">
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
  )
}
