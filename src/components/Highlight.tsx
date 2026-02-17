import React, { useRef, useEffect, useState } from 'react'

type Props = {
  children: React.ReactNode
  color?: string
}

export default function Highlight({ children, color }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      className={`highlight${visible ? ' highlight--visible' : ''}`}
      style={color ? { '--highlight-color': color } as React.CSSProperties : undefined}
    >
      {children}
    </span>
  )
}
