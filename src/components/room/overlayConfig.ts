export type HoverRect = { x: number; y: number; w: number; h: number }

export type OverlaySpriteConfig = {
  id: 'girl' | 'deer'
  x: number
  y: number
  width: number
  href1: string
  href2: string
  hoverRect: HoverRect
  intervalMs: number
}

const OVERLAY_W = 1440
const OVERLAY_H = 900

export const overlayViewBox = {
  w: OVERLAY_W,
  h: OVERLAY_H,
  viewBox: `0 0 ${OVERLAY_W} ${OVERLAY_H}`,
} as const

// Values match the last tuned placement/hitboxes.
export const overlaySprites: OverlaySpriteConfig[] = [
  {
    id: 'girl',
    x: 50,
    y: OVERLAY_H - 1300,
    width: 1300,
    href1: '/assets/girl1.png',
    href2: '/assets/girl2.png',
    intervalMs: 450,
    hoverRect: {
      x: 50 + 215,
      y: OVERLAY_H - 1300 + 800,
      w: 100,
      h: 250,
    },
  },
  {
    id: 'deer',
    x: 90,
    y: OVERLAY_H - 1100,
    width: 1300,
    href1: '/assets/deer1.png',
    href2: '/assets/deer2.png',
    intervalMs: 500,
    hoverRect: {
      x: 90 + 570,
      y: OVERLAY_H - 1100 + 800,
      w: 130,
      h: 80,
    },
  },
]
