/**
 * 柯里化 (curry)
*/
let curry = function(fn) {
    const that = this
    let args = Array.prototype.slice.call(arguments, 1)
    return function() {
        const innerArgs = Array.prototype.slice.call(arguments)
        args = args.concat(...innerArgs)
        if (args.length < fn.length) {
            return curry.call(that, fn, ...args)
        }
        return fn.apply(this, args)
    }
}


function add(x, y, z) {
    return x + y + z
}

console.log(curry(add, 3)(2)(1))

