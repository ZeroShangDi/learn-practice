// 带超时功能
export class TimeoutPromise {
    constructor(executor, timeout) {
        this.promise = new Promise(executor)

        this.timeout = new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('超时'))
            }, timeout)
        })

        return Promise.race([this.promise, this.timeout])
    }
}