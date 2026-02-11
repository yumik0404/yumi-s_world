import React from 'react'
import Room from '../components/Room'

export default function Home() {
  return (
    <div className="home-hero">
      <Room />

      <div className="home-intro" aria-label="Intro text">
        <h1 className="home-intro-title">Hi, I’m Yumi</h1>
        <p className="home-intro-body">
          Aspiring designer exploring the intersection of technology, creativity, and human connection. I’m passionate about crafting thoughtful digital experiences that are inclusive, intuitive, and a little bit playful. Welcome to my world!
        </p>
      </div>
    </div>
  )
}
