import React from 'react'
import { type ProjectData } from './ProjectDetail'

export type { ProjectData }

export const projectsData: ProjectData[] = [
  {
    id: 'project-one',
    title: 'Facebook Marketplace Navigation Redesign',
    subtitle: "I explored how introducing map-based browsing enhances a facebook marketplace user's experience when searching for items nearby to them.",
    tags: ['UX Design', 'Research'],
    overview: '(Placeholder) Provide a brief overview of the project, the client/context, and your role.',
    heroImage: '/assets/marketplace.png',
    problem: "Facebook Marketplace is a popular platform to buy and sell second hand items locally. At this moment, the only browsing feature that Marketplace provides is in a list format, giving only general geographical context. For users in cities where owning a car is rare, location/distance is a key factor when searching for items. How can we help users quickly understand an item's proximity and discover listings near them?",
solution: '(Placeholder) Explain your design solution and how it addresses the problem.',
    process: [
      '(Placeholder) Research & Discovery',
      '(Placeholder) Ideation & Wireframes',
      '(Placeholder) Prototyping & Testing',
      '(Placeholder) Final Design & Handoff',
    ],
    results: '(Placeholder) Share the outcomes—metrics, user feedback, or impact on the business.',
  },
  {
    id: 'project-two',
    title: 'Project Two',
    subtitle: '(Placeholder) Another case study tagline',
    tags: ['Product Design', 'Mobile'],
    overview: '(Placeholder) Overview of project two.',
    problem: '(Placeholder) The problem this project addressed.',
    solution: '(Placeholder) How you solved it.',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    subtitle: '(Placeholder) Third case study tagline',
    tags: ['Branding', 'Visual Design'],
    overview: '(Placeholder) Overview of project three.',
    problem: '(Placeholder) The challenge.',
    solution: '(Placeholder) Your approach.',
  },
]

type Props = {
  onSelectProject: (project: ProjectData) => void
}

export default function Projects({ onSelectProject }: Props) {
  return (
    <div className="projects">
      <h2 className="section-title">Projects</h2>
      <p className="section-subtitle">(Placeholder) A few things I've made.</p>

      <div className="projects-list" role="list">
        {projectsData.map(project => (
          <article
            key={project.id}
            className="project-row project-row--clickable"
            role="listitem"
            onClick={() => onSelectProject(project)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onSelectProject(project) }}
            tabIndex={0}
          >
            <div className="project-tile" aria-hidden="true">
              <div className="project-tile-label">Image / Video</div>
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
        ))}
      </div>
    </div>
  )
}
