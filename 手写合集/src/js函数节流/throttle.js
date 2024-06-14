/**
 * 函数节流（throttle） 
 * 场景： 滚动事件、游戏刷新、DOM拖拽、Canvas画笔
 * 功能： 连续触发事件但是在n秒内、函数只执行一次、起事件聚合作用
 * 实现： 定时器版、时间戳版
 * 理解： 连续触发、一段时间内无论触发多少次都只执行一次
 * 问题： 当前函数在固定频率触发的情况下 函数执行的次数不稳定
 * @param   fun         执行函数
 * @param   delay       时间间隔
 * @return  function    装饰后的函数
 * */
 let canvas = () => console.count('绘制canvas');

 let throttle = function(fun, delay) {
     return function(args) {
         let that = this;
         if (fun.id) return;
         fun.id = setTimeout(() => {
             fun.call(that, ...args);
             fun.id = null;
         }, delay);
     }
 }
 
 throttle = function(fun, delay) {
     let last = 0;
     return function(args) {
         let timer = new Date();
         if (timer - last > delay) {
             fun.call(this, ...args);
             // 这里因为还有函数执行的时间 所以不能等于 timer
             last = timer; // timer new Date()
         }
     }
 }
 
 // let throttleFun = throttle(canvas, 100);
 // for(let i=0,len=10; i<len; i++) {
 //     setTimeout(() => {
 //         throttleFun('args');
 //     }, i * 100);
 // }