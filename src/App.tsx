import React, { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Projects, { projectsData, type ProjectData } from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingSection, setPendingSection] = useState<string | null>(null)
  const [nightMode, setNightMode] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  // Apply night mode class to body
  useEffect(() => {
    document.body.classList.toggle('night-mode', nightMode)
    return () => document.body.classList.remove('night-mode')
  }, [nightMode])

  // Handle navigation from TopNav (works on both pages)
  const handleNavigation = (sectionId: string) => {
    // If on project detail, go back to main page first
    if (selectedProject) {
      setIsTransitioning(true)
      setPendingSection(sectionId)
      setIsScrolling(true)
      setTimeout(() => {
        setSelectedProject(null)
        setIsTransitioning(false)
      }, 200)
    }
  }

  // Handle going back to projects section
  const handleBackToProjects = () => {
    setIsTransitioning(true)
    setIsScrolling(true)
    setTimeout(() => {
      setSelectedProject(null)
      setPendingSection('projects')
      setIsTransitioning(false)
    }, 200)
  }

  // Handle selecting a project with fade transition
  const handleSelectProject = (project: ProjectData) => {
    setIsTransitioning(true)
    setTimeout(() => {
      setSelectedProject(project)
      setIsTransitioning(false)
    }, 200)
  }

  // Scroll to section after returning to main page
  useEffect(() => {
    if (!selectedProject && pendingSection) {
      // Scroll immediately (while still invisible)
      const el = document.getElementById(pendingSection)
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
      }
      setPendingSection(null)
      // Small delay to ensure scroll completes before showing
      requestAnimationFrame(() => {
        setIsScrolling(false)
      })
    }
  }, [selectedProject, pendingSection])

  // Scroll to top only when selecting a project
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [selectedProject])

  // If a project is selected, show the detail page
  if (selectedProject) {
    return (
      <main className={`onepage ${isTransitioning ? 'page-fade-out' : 'page-fade-in'}`} key="detail">
        <TopNav onNavigate={handleNavigation} isOnDetailPage nightMode={nightMode} setNightMode={setNightMode} />
        <section className="section detail-page-bg">
          <div className="section-inner" style={{ paddingTop: 'calc(var(--topbar-h) + 40px)' }}>
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToProjects}
            />
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className={`onepage ${isTransitioning || isScrolling ? 'page-fade-out' : 'page-fade-in'}`} key="main">
      <TopNav onNavigate={handleNavigation} nightMode={nightMode} setNightMode={setNightMode} />
      <section id="home" className="section section--hero">
        <Home />
      </section>

      <section id="projects" className="section">
        <div className="section-inner">
          <Projects onSelectProject={handleSelectProject} />
        </div>
      </section>

      <section id="about" className="section">
        <div className="section-inner">
          <About />
        </div>
      </section>

      <section id="gallery" className="section">
        <div className="section-inner">
          <Gallery />
        </div>
      </section>

    </main>
  )
}
