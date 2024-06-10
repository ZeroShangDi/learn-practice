let isFlushPending = false
let queue: Function[] = []

export function queueJob(job: Function) {
  if (!queue.includes(job)) {
    queue.push(job)
    queueFlush()
  }
}

export function queueFlush() {
  if (!isFlushPending) {
    isFlushPending = true
    nextTick(flushJobs)
  }
}

export function flushJobs() {
  isFlushPending = false
  let job
  while ((job = queue.shift()) !== undefined) {
    job()
    // canvas绘制不同于dom更新,只需要最后一次更新事件即可
    queue = []
  }
}

export function nextTick(cb: (value: void) => void | PromiseLike<void>) {
  return Promise.resolve().then(cb)
}

// 示例使用
// queueJob(() => {
//   console.log('Job 1');
// });

// queueJob(() => {
//   console.log('Job 2');
// });
