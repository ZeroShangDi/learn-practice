import { TimeoutPromise } from '../index.js'

new TimeoutPromise((reslove, _) => {
    setTimeout(() => {
        reslove(1)
    }, 1001)
}, 1000).then((res)=> {
    console.log(res)
}, (err)=> {
    console.log(err)
})