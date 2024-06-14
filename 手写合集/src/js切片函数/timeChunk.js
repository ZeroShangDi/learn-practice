/**
 * 切片函数（timeChunk）
 * 场景：大量数组数据的渲染
 * 功能：将容易造成阻塞的大量数据渲染切分、分段执行
 * 实现：延时器、定时器
 * 理解：
 * 优化：
 *      1、数组需要克隆
 *      2、注意执行函数的上下文
 *      3、设定分割的份数或分割体的大小和间隔时间
 *      4、调用完毕回调？执行完毕回调？TODO
 * 问题：
 *      1、如果需要渲染界面、那么UI渲染所需时间与当前设定时间间隔之间的关系应该是怎样的
 * @param arr   待分割数组
 * @param fun   待执行函数
 * @param count 每个分割单元的元素数量
 * @param context 上下文
 * @return function
*/
let timeChunk = function(arr, fun, count, context) {
    let t = null;
    let timeout = 200; // 执行时间间隔
    let that = context || this;
    let ary = arr.concat(); // 克隆出新数组、防止影响原数组、注意复杂数组 
    return function() {
        let len = ary.length;
        if (len === 0) {
            return clearTimeout(t);
        }
        t = setTimeout(() => {
            let min = Math.min(count || 1, len);
            for(let i=0; i<min; i++) {
                fun.call(that, ary.shift());
            }
            if (ary.length > 0) {
                console.count('拆分数量：');
                setTimeout(arguments.callee, timeout);
            }
        }, timeout);
    }
}