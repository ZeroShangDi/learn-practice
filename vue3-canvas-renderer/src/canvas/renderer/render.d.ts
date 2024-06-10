export interface CanvasNode {
  id: number
  type: string
  name?: string
  parent?: HTMLCanvasElement

  // x?: number
  // y?: number
  ctx?: CanvasRenderingContext2D
  text?: string
  // points?: { x: number; y: number }[]
  // labelPosition?: { x: number; y: number }
  eventHandlers?: { [key: string]: EventListener }
}

type Key<T> = {
  [P in keyof T]: P
}

export type CanvasNodeKey = Key<CanvasNode>

export type Node = CanvasNode | HTMLCanvasElement
