import React, { useState, useEffect } from 'react'
import TopNav from './components/TopNav'
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Music from './pages/Music'
import MusicHome from './pages/MusicHome'
import Shows from './pages/Shows'
import Videos from './pages/Videos'
import MusicContact from './pages/MusicContact'
import Projects, { projectsData, type ProjectData } from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'

export type SiteMode = 'landing' | 'design' | 'music'

export default function App() {
  const [mode, setMode] = useState<SiteMode>('landing')
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

  // Handle choosing a mode from the landing page
  const handleChooseMode = (chosen: 'design' | 'music') => {
    setIsTransitioning(true)
    setTimeout(() => {
      setMode(chosen)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 300)
  }

  // Handle going back to landing
  const handleBackToLanding = () => {
    setIsTransitioning(true)
    setTimeout(() => {
      setMode('landing')
      setSelectedProject(null)
      setIsTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 300)
  }

  // Handle navigation from TopNav (works on both design pages)
  const handleNavigation = (sectionId: string) => {
    if (sectionId === 'landing') {
      handleBackToLanding()
      return
    }
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
      const el = document.getElementById(pendingSection)
      if (el) {
        el.scrollIntoView({ behavior: 'instant' })
      }
      setPendingSection(null)
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

  /* ── Landing page ─────────────────────────── */
  if (mode === 'landing') {
    return (
      <div className={`landing-wrapper ${isTransitioning ? 'page-fade-out' : 'page-fade-in'}`}>
        <Landing onChoose={handleChooseMode} nightMode={nightMode} setNightMode={setNightMode} />
      </div>
    )
  }

  /* ── Music experience ─────────────────────── */
  if (mode === 'music') {
    return (
      <main className={`onepage ${isTransitioning || isScrolling ? 'page-fade-out' : 'page-fade-in'}`} key="music">
        <TopNav
          onNavigate={handleNavigation}
          nightMode={nightMode}
          setNightMode={setNightMode}
          siteMode="music"
          onBackToLanding={handleBackToLanding}
        />
        <section id="music-home" className="section section--music-hero">
          <MusicHome />
        </section>

        <section id="music-tracks" className="section">
          <div className="section-inner">
            <Music />
          </div>
        </section>

        <section id="shows" className="section">
          <div className="section-inner">
            <Shows />
          </div>
        </section>

        <section id="videos" className="section">
          <div className="section-inner">
            <Videos />
          </div>
        </section>

        <section id="music-contact" className="section">
          <div className="section-inner">
            <MusicContact />
          </div>
        </section>
      </main>
    )
  }

  /* ── Design experience (project detail) ───── */
  if (selectedProject) {
    return (
      <main className={`onepage ${isTransitioning ? 'page-fade-out' : 'page-fade-in'}`} key="detail">
        <TopNav
          onNavigate={handleNavigation}
          isOnDetailPage
          nightMode={nightMode}
          setNightMode={setNightMode}
          siteMode="design"
          onBackToLanding={handleBackToLanding}
        />
        <section className="section detail-page-bg">
          <div className="project-detail-wrapper">
            <ProjectDetail
              project={selectedProject}
              onBack={handleBackToProjects}
            />
          </div>
        </section>
      </main>
    )
  }

  /* ── Design experience (main) ─────────────── */
  return (
    <main className={`onepage ${isTransitioning || isScrolling ? 'page-fade-out' : 'page-fade-in'}`} key="main">
      <TopNav
        onNavigate={handleNavigation}
        nightMode={nightMode}
        setNightMode={setNightMode}
        siteMode="design"
        onBackToLanding={handleBackToLanding}
      />
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
