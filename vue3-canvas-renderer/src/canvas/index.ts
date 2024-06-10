export { createCanvasApp } from './renderer/renderer'
export { isCustomElement, extendDrawType } from './elements'

/**
 * TODO 重绘次数的控制,时机的控制,能否参考或者利用vue的异步更新机制
 *      使用调度器降低重绘次数
 * TODO 事件中怎么处理穿透问题? 点击某个点可能此位置有多个事件触发 =》使用id来确认图片层级?
 *      通过层级已解决, 考虑能是否进一步优化
 * TODO 触发事件之后能否获取对应的data响应式数据?
 *      通过绑定事件时候传入数据下标解决
 *
 */
