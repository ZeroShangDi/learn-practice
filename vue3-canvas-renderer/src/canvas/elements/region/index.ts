// 绘制不规则区域
export const drawRegion = (ctx: CanvasRenderingContext2D, node: any) => {
  console.log(node)
  console.count()
  ctx.beginPath()
  if (node.points) {
    const start = node.points[0]
    ctx.moveTo(start.x, start.y)

    node.points.slice(1).forEach((point: any) => {
      ctx.lineTo(point.x, point.y)
    })

    ctx.closePath()
    ctx.fillStyle = node.color || 'transparent'
    ctx.fill()

    ctx.strokeStyle = 'black'
    ctx.stroke()

    if (node.labelPosition) {
      ctx.font = '16px Arial'
      ctx.fillStyle = 'black'
      ctx.fillText(node.name || '', node.labelPosition.x, node.labelPosition.y)
    }

    if (node.eventHandlers?.click) {
      ctx.canvas.addEventListener('click', function (event: any) {
        const rect = ctx.canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        if (ctx.isPointInPath(x, y)) {
          node.eventHandlers && node.eventHandlers.click(event, node)
        }
      })
    }
  }
}
