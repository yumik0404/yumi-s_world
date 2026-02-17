import React, { useState, useEffect } from 'react'
import Room from '../components/Room'
import ScrollReveal from '../components/ScrollReveal'

const phrases = ['Yumi', 'a Designer', 'an Engineer', 'a Creative']
const TYPING_SPEED = 100
const DELETING_SPEED = 60
const PAUSE_AFTER_TYPING = 2000
const PAUSE_AFTER_DELETING = 500

export default function Home() {
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        setDisplayText(currentPhrase.slice(0, displayText.length + 1))
        if (displayText.length + 1 === currentPhrase.length) {
          // Done typing — pause then start deleting
          setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING)
        }
      } else {
        // Deleting
        setDisplayText(currentPhrase.slice(0, displayText.length - 1))
        if (displayText.length - 1 === 0) {
          setIsDeleting(false)
          setPhraseIndex((phraseIndex + 1) % phrases.length)
        }
      }
    }, isDeleting ? DELETING_SPEED : TYPING_SPEED)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, phraseIndex])

  return (
    <div className="home-hero">
      <Room />

      <ScrollReveal>
        <div className="home-intro" aria-label="Intro text">
          <h1 className="home-intro-title">
            Hi, I'm <span className="typewriter">{displayText}<span className="typewriter-cursor">|</span></span>
          </h1>
          <p className="home-intro-body">
            Aspiring designer exploring the intersection of technology, creativity, and human connection. I'm passionate about crafting thoughtful digital experiences that are inclusive, intuitive, and a little bit playful. Welcome to my world!
          </p>
        </div>
      </ScrollReveal>
    </div>
  )
}
