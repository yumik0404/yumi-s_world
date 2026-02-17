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
    overview: '(Placeholder) Provide a brief overview of the project, the client/context, and your role.',
    heroImage: '/assets/marketplace.png',
    tileImage: '/assets/fb_marketplace_intro_pic.png',
    problem: <>Facebook Marketplace is a popular platform to buy and sell second hand items locally. At this moment, the only browsing feature that Marketplace provides is in a list format, giving <Highlight>only general geographical context</Highlight>. For users in cities where owning a car is rare, location/distance is a key factor when searching for items. <Highlight>How can we help users quickly understand an item's proximity and discover listings near them?</Highlight></>,
solution: 'I chose to present items in a map view in order to prioritize geographical context when searching for an item. Upon hovering or clicking on an item, the user can gain more information such as a more full fledged item description, ability to message seller. Using the list view on the right, users can hover over items and see the location price marker darken on the map, allowing for that location information to be given to the user seamlessly and automatically.',
    solutionImage: '/assets/fb_marketplace_solution.png',
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
