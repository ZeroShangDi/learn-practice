import { CancelPromise } from '../index.js'

const cancel = new CancelPromise((reslove, reject) => {
    setTimeout(() => {
        reslove(1)
    }, 1001)
})
cancel.cancel() // 取消
cancel.recovery() // 恢复
cancel.promise.then(res => {
    console.log(res)
})