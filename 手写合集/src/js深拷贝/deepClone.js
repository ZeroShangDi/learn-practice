// 2. 深拷贝
let deepClone = function(obj) {
    // 1、JSON拷贝 | 不能拷贝函数 | 
    // return JSON.parse(JSON.stringify(obj));

    // 2、Object.assign({}, obj); | 多层时只拷贝了引用、不能修改 | 只用于对象
    // return Object.assign({}, obj);

    // 3、递归拷贝
    let isArr = Array.isArray(obj);
    let isObj = Object.prototype.toString.call(obj);
    if (isObj === '[object Object]') {
        let cloneObj = {};
        for(let key in obj) {
            let val = deepClone(obj[key]);
            cloneObj[key] = val;
        }
        return cloneObj;
    } else if (isArr) {
        let cloneArr = [];
        for(let i=0,len=obj.length; i<len; i++) {
            let item = deepClone(obj[i]);
            cloneArr.push(item);
        }
        return cloneArr;
    } else {
        return obj;
    }
}

// let testClone = [
//     {
//         id: 1,
//         name: 'hhahh',
//         testFun: function() {

//         },
//     },
//     {
//         id: 2,
//         name: 'aaas',
//         data: [3, 2, 1, 0],
//     },
//     {
//         id: 3,
//         name: 'dass',
//         bool: true
//     },
//     {
//         id: 4,
//         name: 'wawas',
//         unde: undefined
//     },
// ];
// let newCloneObj = deepClone(testClone);
// console.log(newCloneObj)