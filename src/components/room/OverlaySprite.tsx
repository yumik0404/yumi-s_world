import React from 'react'
import type { HoverRect } from './overlayConfig'

type Props = {
  id: string
  href: string
  x: number
  y: number
  width: number
  hoverRect: HoverRect
  onHoverChange: (hovering: boolean) => void
}

/**
 * Renders a display-only <image> plus an independent transparent hover hitbox <rect>.
 * The hitbox does the pointer handling; the image never blocks clicks.
 */
export function OverlaySprite({ id, href, x, y, width, hoverRect, onHoverChange }: Props) {
  return (
    <g aria-label={id}>
      <image href={href} x={x} y={y} width={width} preserveAspectRatio="xMinYMin meet" style={{ pointerEvents: 'none' }} />

      <rect
        x={hoverRect.x}
        y={hoverRect.y}
        width={hoverRect.w}
        height={hoverRect.h}
        fill="transparent"
        style={{ pointerEvents: 'auto', cursor: 'pointer' }}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
      />
    </g>
  )
}
