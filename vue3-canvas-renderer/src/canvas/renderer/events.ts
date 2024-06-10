export function addEventListener(canvas: HTMLCanvasElement, callback: Function) {
  canvas.addEventListener('click', function (event: any) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    callback && callback({ x, y })
    // if (ctx.isPointInPath(x, y)) {
    //   node.eventHandlers && node.eventHandlers.click(event, node)
    // }
  })
}
