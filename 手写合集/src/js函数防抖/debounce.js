/**
 * 函数防抖 （debounce） 
 * 场景： 搜索、用户输入、窗口变动、最后一个人电梯后过n秒关闭电梯
 * 功能： 连续触发事件、事件触发后n秒内、函数只执行一次、若事件再次触发则重新计时
 * 实现： 立即执行版、不立即执行版
 * 理解： 连续触发、停止触发一段时间后、执行函数、不停止重置计时
 * @param   fun         执行函数
 * @param   delay       时间间隔
 * @return  function    装饰后的函数
 * */
 let timer = null;
 let isRender =  false;
 let ajax = () => console.log('执行ajax');
 
 let debounce = function(fun, delay) {
     // 非立即执行版（后置执行）
     return function(args) {
         console.log('debounce后置');
         let that = this;
         clearTimeout(fun.id);
         fun.id = setTimeout(() => {
             fun.call(that, ...args)
         }, delay);
     }
 }
 
 debounce = function(fun, delay) {
     // 立即执行函数(前置执行)
     return function(args) {
         console.log('debounce前置');
         let that = this;
         if (fun.id) clearTimeout(fun.id);
         if (!fun.id) fun.call(that, ...args);
         fun.id = setTimeout(() => {
             fun.id = null;
         }, delay)
     }
 }
 
 // let debounceFun = debounce(ajax, 1000);
 // debounceFun('args');
 // debounceFun('args');
 // debounceFun('args');
 // setTimeout(() => {
 //     debounceFun('args');
 // }, 999);