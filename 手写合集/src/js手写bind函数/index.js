// 手写bind函数
Function.prototype.MyBind = function(newThis) {
    // 注: 
    // 通过bind函数改造的新函数 在被当做构造函数实例化时 
    // this不会指向绑定的上下文 而是绑定到新的实例化对象上
    let funArt = this;
    let args = [].slice.call(arguments, 1);

    if (typeof this !== 'function') {
        return new TypeError('Is not a Function!');
    }

    let funNOP = function () {};
    let funBound = function() {
        // 实例化新函数时 this指向funBound 而funBound继承自funNOP
        // 所以当 this instanceof funNOP 时，调用了new方法，不绑定
        return funArt.apply( this instanceof funNOP && newThis 
            ? this : newThis || window, 
            args.concat([].slice.call(arguments, 0)))
    };

    // 组合继承 原函数的方法与属性 保证对新函数的原型修改不影响原函数
    funNOP.prototype = this.prototype;
    funBound.prototype = new funNOP();
    return funBound;

    return function() {
        funArt.apply(newThis, [].concat(args, [].slice.call(arguments, 0)));
    }
}