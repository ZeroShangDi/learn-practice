import type { CanvasNode, Drawing } from '../types'
import region from './region'

export let drawTypes: Record<string, Drawing> = {
  region
}

export function draw(ctx: CanvasRenderingContext2D, node: CanvasNode | CanvasNode[]) {
  const isClear = Array.isArray(node)
  const nodes = isClear ? node : [node]
  if (isClear) ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  for (const item of nodes) {
    const drawing = getDrawing(item)
    if (drawing && drawing.draw) {
      drawing.draw(item)
    } else {
      // 不存在的类型
    }
  }
}

// export const getDrawTypekeys = (): string[] => {
//   return Object.keys(drawTypes)
// }

export const getDrawing = (node: CanvasNode) => {
  if (!isLegalKey(node.type))
    return {
      draw: () => {},
      isHit: () => false
    }
  const drawing: Drawing = drawTypes[node.type]
  return drawing
}

export const extendDrawType = (key: string, draw: Drawing): void => {
  if (isLegalKey(key)) return console.log('与现有类型冲突')
  drawTypes = Object.assign({}, drawTypes, { [key]: draw })
}

export const isLegalKey = (key: string): boolean => {
  return Object.keys(drawTypes).includes(key)
}

export const isCustomElement = (tag: string) => {
  return isLegalKey(tag)
}
