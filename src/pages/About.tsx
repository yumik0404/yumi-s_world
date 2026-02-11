import React from 'react'

export default function About() {
  return (
    <div className="about">
      <h2 className="section-title">About</h2>
      <p className="section-subtitle">(Placeholder) A little bit about me.</p>

      <div className="about-grid">
        <div className="about-text">
          <h3 className="about-heading">Hi! I’m Yumi.</h3>
          <p className="about-paragraph">
            (Placeholder) Add a short bio here—where you’re based, what you love making, and what you’re exploring right now.
          </p>
          <p className="about-paragraph">
            (Placeholder) You can also add a few quick facts, your interests, or what you’re looking for (collabs, commissions, etc.).
          </p>
        </div>

        <div className="about-photo" aria-label="Portrait">
          <img className="about-photo-img" src="/assets/me.jpg" alt="Portrait of Yumi" />
        </div>
      </div>
    </div>
  )
}
