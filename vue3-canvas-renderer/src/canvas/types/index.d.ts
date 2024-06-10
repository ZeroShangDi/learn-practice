// 每个自定义元素的属性
export interface CanvasNode {
  id: number
  type: string
  name?: string
  parent?: HTMLCanvasElement

  ctx: CanvasRenderingContext2D
  text?: string
  props: { [key: string]: any }
  eventHandlers?: { [key: string]: EventListener }
}

// 每组绘制方法的返回类型
export interface Drawing {
  draw: (node: CanvasNode) => void
  isHit: (node: CanvasNode, x: number, y: number) => Boolean
}

type Key<T> = {
  [P in keyof T]: P
}

export type CanvasNodeKey = Key<CanvasNode>

export type Node = CanvasNode | HTMLCanvasElement
