function myNew(constructor, args) {
    // 1、创建一个新对象
    // 2、修改原型链
    // 3、改变 this 指向
    // 4、执行构造函数
    // 5、返回新对象

    let obj = Object.create(constructor.prototype)
    let res = constructor.apply(obj, args)
    return res instanceof Object ? res : obj

    // let newObj = new Object()
    // newObj.__proto__ = constructor.prototype
}

// this 优先级: new > 显式 > 隐式 > 默认

// this 指向: 1、window 2、当前函数所处作用域

module.exports = {
    myNew
}