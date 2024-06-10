import { createRenderer, type RendererOptions } from 'vue'
import { draw } from '../elements'

let id = 0
const nodes: any[] = []

const defaultNodeOpts = {
  createText: (text: string): any => {
    return { type: 'text', text, items: [] }
  },
  setText: (node: any, text: string) => {
    node.text = text
  },
  setElementText: (node: any, text: string) => {
    node.text = text
  },

  cloneNode: (node: any): any => ({ ...node }),
  parentNode: (node: any): HTMLCanvasElement | null => node.parent || null,

  createComment: () => ({ type: 'comment', items: [] }),
  nextSibling: () => null,
  querySelector: () => null,
  setScopeId: () => {}
}

export function createCanvasApp(canvas: HTMLCanvasElement) {
  const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')
  if (!ctx) return console.log('ctx获取失败!')
  const nodeOps: RendererOptions<any, any> = {
    createElement: (type: string): any => {
      // 不需要创建实体元素，直接返回对象
      id += 1
      return { id, ctx, type, props: {}, eventHandlers: {} }
    },
    insert: (child: any, parent: HTMLCanvasElement) => {
      // 没有实体，所以直接进入绘制环节, 因为是新增所以不需要清空画布
      if (parent.nodeType === 1) {
        child.parent = parent
        nodes.push(child)
        // draw(ctx, child)
      }
    },
    patchProp: (el: any, key, prevValue, nextValue) => {
      // 更新属性、事件, 对不同类型的属性做特殊处理
      if (key.startsWith('on')) {
        // 对事件监听器的更新
        const nullFun = () => {}
        const eventFun = (event: any) => {
          const rect = canvas.getBoundingClientRect()
          const x = event.clientX - rect.left
          const y = event.clientY - rect.top
          if (ctx.isPointInPath(x, y)) {
            prevValue ? prevValue(el) : nextValue(el)
          }
        }
        const eventName = key.slice(2).toLowerCase()
        if (prevValue) {
          el.eventHandlers[eventName] = nullFun
          canvas.removeEventListener(eventName, eventFun)
        }
        if (nextValue) {
          el.eventHandlers[eventName] = nextValue
          canvas.addEventListener(eventName, eventFun)
        }
      } else {
        el[key] = nextValue
        draw(ctx, nodes)
      }
    },
    remove: (el: any) => {
      // 删除, 把对应的元素去掉，清空画布重新绘制
      const index = nodes.findIndex((item) => item.id === el.id)
      if (index > -1) {
        nodes.splice(index, 1)
      }
      draw(ctx, nodes)
    },

    ...defaultNodeOpts
  }
  const renderer = createRenderer<any, any>(nodeOps)
  return renderer.createApp
}
