// 数组类型判断
let isArray = function(arr) {
    // es6写法 注意兼容
    console.log('isArray', Array.isArray(arr));

    // 判断某个实例是否属于某个对象 | 必须是在当前界面声明的数组
    console.log('instanceof', arr instanceof Array);

    // 判断创造这个实例的构造函数是否是数组 | 必须是在当前界面声明的数组
    console.log('constructor', arr.constructor && arr.constructor == Array);

    // 通过原型链调用arr的toSting方法检测是否等于[object Array]
    console.log('toString', Object.prototype.toString.call(arr) === '[object Array]');

    // 判断arr是否在Array对象的原型链上 | 
    console.log('isPrototypeOf', Array.prototype.isPrototypeOf(arr));

    // 判断arr的原型是否和Array的原型一致
    console.log('getPrototypeOf', Object.getPrototypeOf(arr) === Array.prototype);

    return Array.isArray(arr);

}

// isArray(new Array());