import type { CanvasNode } from '@/canvas/types'

// 绘制不规则区域
export const drawRegion = (node: CanvasNode) => {
  const {
    ctx,
    text,
    props: { points, color, labelPosition }
  } = node
  if (points) {
    const start = points[0]

    ctx.beginPath()
    ctx.moveTo(start.x, start.y)
    points.slice(1).forEach((point: any) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.closePath()

    ctx.fillStyle = color || 'transparent'
    ctx.fill()

    ctx.strokeStyle = 'black'
    ctx.stroke()

    if (labelPosition) {
      ctx.font = '16px Arial'
      ctx.fillStyle = 'black'
      ctx.fillText(text || '', labelPosition.x, labelPosition.y)
    }
  }
}

// 射线法（Ray Casting Method）检测是否命中
export const drawRegionIsHit = (node: CanvasNode, x: number, y: number) => {
  let inside = false
  const { points } = node.props
  if (!points) return inside
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const xi = points[i].x,
      yi = points[i].y
    const xj = points[j].x,
      yj = points[j].y

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi
    if (intersect) inside = !inside
  }

  return inside
}

export default {
  draw: drawRegion,
  isHit: drawRegionIsHit
}
