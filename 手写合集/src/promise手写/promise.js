// 示例
// new Promise((reslove, reject) => {
//     if (Math.random() > 0.5) {
//         reslove(1)
//     } else {
//         reject(-1)
//     }
// }).then((res) => {
//     console.log(res)
// }).catch().finally()

// 手写
class MyPromise {
    status = 'pedding' // pedding fulfilled rejected
    value = null
    error = null
    onFulfilledCb = null
    onRejectedCb = null

    constructor(executor) {
        this.status = 'pedding' // fulfilled rejected
        this.value = null
        this.error = null
        this.onFulfilledCbs = []
        this.onRejectedCbs = []
        
        // 必定成功
        this.resolve = () => {

        }

        // 必定失败
        this.reject = () => {

        }

        // 全部成功时，成功
        this.all = () => {

        }

        // 只要其中一个返回成功，就返回成功
        this.any = () => {
            
        }

        // 无论成功失败，全返回
        this.allSettled = () => {

        }

        // 只要其中一个返回，就返回
        this.race = () => {

        }

        const reslove = (value) => {
            if (this.status === 'pedding') {
                this.value = value
                this.status = 'fulfilled'
                this.onFulfilledCbs.forEach(fn => fn())
            }
        }

        const reject = (error) => {
            if (this.status === 'pedding') {
                this.error = error
                this.status = 'rejected'
                this.onRejectedCbs.forEach(fn => fn())
            }
        }

        try {
            executor(reslove, reject)
        } catch(err) {
            reject(err)
        }

    }

    then(onFulfilled, onRejected) {
        if (typeof onFulfilled !== 'function') {
            onFulfilled = value => value
        }
        if (typeof onRejected !== 'function') {
            onRejected = error => { throw error }
        }
        if (this.status === 'pedding') {
            this.onFulfilledCbs.push(() => {
                onFulfilled(this.value)
            })
            this.onRejectedCbs.push(() => {
                onRejected(this.error)
            })
        }
        if (this.status === 'fulfilled') {
            onFulfilled(this.value)            
        }
        if (this.status === 'rejected') {
            onRejected(this.error)
        }
    }

    catch(onRejected) {
        return this.then(null, onRejected)
    }

    finally(handler) {
        this.onFulfilledCbs.push(() => handler())
        this.onRejectedCbs.push(() => handler())
    }
}