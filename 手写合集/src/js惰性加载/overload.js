/**
 * 惰性加载 (overload)
 * 场景：浏览器判断、设备判断(频繁调用、且判断结果固定不变)
 * 功能：调用第一次时按分支返回和覆盖原函数、下次执行直接执行该分支内容
 * 实现：函数重写
 * 理解：
 * @param term
*/
let overload = function(term, param) {
    let one = function(param) {
        console.log('one');
    }
    let two = function(param) {
        console.log('two');
    }
    switch(term) {
        case 'one':
            overload = one;
            break;
        case 'two':
            overload = two;
            break;
        default:
            break;
    }
    return overload(param);
}