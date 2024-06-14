// 带取消功能
export class CancelPromise{
    constructor(executor) {
        this.cancelStatus = false
        this.handler = null

        const Executor = this.Executor = (reslove, reject) => {
            new Promise(executor).then((res) => {
                if (this.cancelStatus) {
                    this.handler = () => reslove(res)
                    return
                }
                reslove(res)
            }).catch(err => {
                if (this.cancelStatus) {
                    this.handler = () => reject(err)
                    return
                }
                reject(err)
            }) 
        }
        this.promise = new Promise(Executor)
    }

    cancel() {
        this.cancelStatus = true
    }

    recovery(isReload) {
        this.cancelStatus = false
        if (isReload) {
            this.promise = new Promise(this.Executor)
            return
        }
        if (this.handler) this.handler()
    }
}