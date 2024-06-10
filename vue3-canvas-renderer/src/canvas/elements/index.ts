import { drawRegion } from './region'

export let drawTypes: any = {
  region: drawRegion
}

export const getDrawTypekeys = () => {
  return Object.keys(drawTypes)
}

export function draw(ctx: CanvasRenderingContext2D, node: any) {
  if (Array.isArray(node)) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    node.forEach((item) => drawItem(ctx, item))
  } else {
    drawItem(ctx, node)
  }
}

export const drawItem = (ctx: CanvasRenderingContext2D, node: any) => {
  if (drawTypes[node.type]) {
    drawTypes[node.type](ctx, node)
  } else {
    // console.log(node)
    // console.log(`不存在的自定义类型: `, node.type)
  }
}

export const extendDrawType = (key: string, draw: Function) => {
  if (drawTypes[key]) return console.log('与现有类型冲突')
  drawTypes = Object.assign({}, drawTypes, { [key]: draw })
}

export const isCustomElement = (app: any) => {
  app.config.compilerOptions.isCustomElement = (tag: string) => {
    console.log(getDrawTypekeys(), tag, getDrawTypekeys().includes(tag))
    return getDrawTypekeys().includes(tag)
  }
  return app
}
