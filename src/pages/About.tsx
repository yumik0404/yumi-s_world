import React from 'react'
import ScrollReveal from '../components/ScrollReveal'
import Highlight from '../components/Highlight'

export default function About() {
  return (
    <div className="about">
      <ScrollReveal>
        <h2 className="section-title">About</h2>
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <div className="about-grid">
          <div className="about-text">
            <h3 className="about-heading">Hi! I’m Yumi.</h3>
            <p className="about-location">📍 New York, New York</p>
            <p className="about-paragraph">
              I graduated from the <Highlight>University of Virginia</Highlight> in 2024 with degrees in <Highlight>computer science</Highlight> and <Highlight>music</Highlight> — a combination that reflects how I approach problems from both a technical and creative perspective. I’m currently working as a software engineer at Liberty Mutual Insurance, and I recently completed a rotation as a UX designer, which strengthened my interest in building products from the bottom up.

My work is shaped by <Highlight>curiosity</Highlight> and a genuine appreciation for how people interact with technology. I enjoy moving between big‑picture thinking and hands‑on implementation, and I’m always looking for opportunities to learn something new.


            </p>
            <p className="about-paragraph">
Outside of work, I stay connected to the arts and to the things that keep me energized. I love singing, exploring color through oil pastels, and crocheting projects of all kinds. I’m also an enthusiastic foodie and snowboarder.

I’m motivated by creativity and the challenge of bringing ideas to life — whether in code, design, or the hobbies that keep me inspired!            </p>
          </div>

          <div className="about-photo" aria-label="Portrait">
            <img className="about-photo-img" src="/assets/me.jpg" alt="Portrait of Yumi" />
          </div>
        </div>
      </ScrollReveal>
    </div>
  )
}
