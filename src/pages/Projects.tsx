import React from 'react'
import { type ProjectData } from './ProjectDetail'
import Highlight from '../components/Highlight'
import ScrollReveal from '../components/ScrollReveal'

export type { ProjectData }

export const projectsData: ProjectData[] = [
  {
    id: 'project-one',
    title: 'Facebook Marketplace Navigation Redesign',
    subtitle: "I explored how introducing map-based browsing enhances a facebook marketplace user's experience when searching for items nearby to them.",
    tags: ['UX Design', 'Research'],
    overview: 'This project explores how adding a map‑based browsing experience to Facebook Marketplace can improve the way users discover and evaluate second‑hand items based on proximity. In dense urban environments—especially places like New York City—distance and convenience often matter as much as price or item quality. This redesign aims to make location a first‑class part of the browsing experience.',
    heroImage: '/assets/marketplace.png',
    tileImage: '/assets/fb_marketplace_intro_pic.png',
    problem: <>Facebook Marketplace is a popular platform to buy and sell second hand items locally. At this moment, the only browsing feature that Marketplace provides is in a list format, giving <Highlight>only general geographical context</Highlight>. For users in cities where owning a car is rare, location/distance is a key factor when searching for items. <Highlight>How can we help users quickly understand an item's proximity and discover listings near them?</Highlight></>,
    solution: <>Introduce a <Highlight>map‑based browsing mode</Highlight> that displays listings spatially, similar to platforms like Airbnb, Zillow, and Apartments.com. The redesigned experience includes:
      <ul>
        <li>A map on the left and a list view on the right</li>
        <li>Hover interactions that highlight corresponding map markers</li>
        <li>Adjustable radius‑based searching</li>
        <li>Support for <Highlight>both precise and generalized seller locations</Highlight></li>
        <li>A more intuitive, proximity‑first browsing flow</li>
      </ul>
      This approach <Highlight>makes distance instantly clear</Highlight>, reduces unnecessary clicks, and aligns Marketplace with modern location‑based browsing patterns.</>,
    solutionImage: '/assets/fb_marketplace_solution.png',
    process: [
      '(Placeholder) Research & Discovery',
      '(Placeholder) Ideation & Wireframes',
      '(Placeholder) Prototyping & Testing',
      '(Placeholder) Final Design & Handoff',
    ],
    results: '(Placeholder) Share the outcomes—metrics, user feedback, or impact on the business.',
  },
]

type Props = {
  onSelectProject: (project: ProjectData) => void
}

export default function Projects({ onSelectProject }: Props) {
  return (
    <div className="projects">
      <ScrollReveal>
        <h2 className="section-title">Projects</h2>
        <p className="section-subtitle">Case Studies</p>
      </ScrollReveal>

      <div className="projects-list" role="list">
        {projectsData.map((project, i) => (
          <ScrollReveal key={project.id} delay={i * 100}>
            <article
              className={`project-row project-row--clickable${i % 2 === 1 ? ' project-row--alt' : ''}`}
              role="listitem"
              onClick={() => onSelectProject(project)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project) }}
              tabIndex={0}
            >
            <div className="project-tile" aria-hidden="true">
              {project.tileImage ? (
                <img src={project.tileImage} alt={project.title} className="project-tile-img" />
              ) : (
                <div className="project-tile-label">Image / Video</div>
              )}
            </div>

            <div className="project-meta">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.subtitle}</p>
              {project.tags && project.tags.length > 0 && (
                <div className="project-tags" aria-label="Project tags">
                  {project.tags.map(tag => (
                    <span key={tag} className="project-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  )
}
