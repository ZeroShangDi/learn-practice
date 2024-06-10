import { createRenderer, type RendererOptions } from 'vue'
import { draw, isLegalKey, getDrawing } from '../elements'
import { queueJob } from './scheduler'
import type { CanvasNode } from '../types'

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
  let id = 0
  const nodes: CanvasNode[] = []
  const ctx = canvas.getContext('2d')
  const eventListenersMap = new WeakMap()
  if (!ctx) return console.log('ctx获取失败!')
  const nodeOps: RendererOptions<any, any> = {
    createElement: (type: string): CanvasNode => {
      // 不需要创建实体元素，直接返回对象
      // fix: 增加了id, props, eventHandlers 等属性
      id += 1
      return { id, ctx, type, props: {}, eventHandlers: {} }
    },
    insert: (child: CanvasNode, parent: HTMLCanvasElement) => {
      // 没有实体，所以直接进入绘制环节, 因为是新增所以不需要清空画布
      // fix: 校验了是否为已定义的图形类型, 如果是则加入到实例中去, 取消了绘制?
      if (parent.nodeType === 1) {
        child.parent = parent
        if (isLegalKey(child.type)) {
          nodes.push(child)
          // draw(ctx, child)
        }
      }
    },
    patchProp: (el: CanvasNode, key, prevValue, nextValue) => {
      // 更新属性、事件, 对不同类型的属性做特殊处理
      if (key.startsWith('on')) {
        // 对事件监听器的更新
        const eventName = key.slice(2).toLowerCase()
        const existingListener = eventListenersMap.get(el)

        if (existingListener && existingListener[eventName]) {
          canvas.removeEventListener(eventName, existingListener[eventName])
        }

        if (nextValue) {
          // const newListener = nextValue
          const newListener = (event: any) => {
            const rect = canvas.getBoundingClientRect()
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            const drawing = getDrawing(el)
            if (!drawing || !drawing.isHit) return
            if (!drawing.isHit(el, x, y)) return
            // if (drawing.isHit(el, x, y)) {
            //   nextValue(event, el)
            // }
            const eventHits = nodes.filter((node) => drawing.isHit(node, x, y))
            const eventHit = eventHits.reduce((prev, current) => {
              return prev.id > current.id ? prev : current
            })
            if (el.id === eventHit.id) {
              nextValue(event, eventHit, eventHits)
            }
          }
          canvas.addEventListener(eventName, newListener)

          if (!existingListener) {
            eventListenersMap.set(el, { [eventName]: newListener })
          } else {
            existingListener[eventName] = newListener
          }
        }
      } else {
        el.props[key] = nextValue
        // draw(ctx, nodes)
        queueJob(() => draw(ctx, nodes))
      }
    },
    remove: (el: CanvasNode) => {
      // 删除, 把对应的元素去掉，移除监控事件, 清空画布重新绘制
      const index = nodes.findIndex((item) => item.id === el.id)
      if (index > -1) {
        nodes.splice(index, 1)
      }

      // Remove all event listeners associated with this element
      const existingListener = eventListenersMap.get(el)
      if (existingListener) {
        for (const eventName in existingListener) {
          canvas.removeEventListener(eventName, existingListener[eventName])
        }
        eventListenersMap.delete(el)
      }

      // draw(ctx, nodes)
      queueJob(() => draw(ctx, nodes))
    },

    ...defaultNodeOpts
  }
  const renderer = createRenderer<any, any>(nodeOps)
  return renderer.createApp
}
