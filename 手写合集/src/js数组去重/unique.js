// 3. 数组去重
let unique = function(arr) {
    // 1、循环判断法 | 将原数组的第一个元素放到新数组中、从第二个元素开始、先判断是否在新数组中存在、不存在的时候加入到新数组中
    //      5、利用数组的 indexOf 函数查询
    //      6、利用数组的 includes 函数查询
    //      7、利用数组的 filter 过滤函数
    //      8、利用数组的 lastIndexOf 函数查询
    // 2、排序判断法 | 先将原数组进行排序、排序后循环判断相邻元素是否相同、不相同的时候将其存入到新的数组中 | 只能判断数值数组、且未保留原数组的顺序
    // 3、对象判断法 | 先将原数组中的元素循环添加到一个对象中、用数组的每一项作为对象的key、用该元素出现的次数作为val、最后返回对象的key的集合 | 不能保留原有的顺序、但增加了重复次数的数据
    //      9、同样利用对象的属性、不过不在最后返回key集合 而是在第一次得到不存的key的时候就将这个元素添加到新的数组中去 | 即保留了数组原有的顺序、有能够得到数组中元素重复的次数、但是空间复杂度高了
    // 4、ES6判断法 | 利用 set 对象和 Array.form 函数 
    // 5、多层循环遍历、判断后面是否还有没有相同的
    // 问题： 如果数组不是简单的数组的时候怎么判断？
    // 省略代码： 判断arr是数组且数组长度大于0
    let newArr = [];

    // 循环判断法
    for(let i=0,len=arr.length; i<len; i++) {
        let item = arr[i];
        let isIndexOf = newArr.indexOf(item) > -1;
        let isIncludes = newArr.includes(item);
        let isLastIndexOf = newArr.lastIndexOf(item) > -1;

        if (!isIndexOf && !isIncludes && !isLastIndexOf) {
            newArr.push(item);
        }
    }
    console.log('循环法', newArr);

    // 对象判断法
    newArr = [];
    let newObj = {};
    arr.forEach(item => {
        if (newObj[item]) {
            newObj[item] += 1;
        } else {
            newObj[item] = 1;
            newArr.push(item);
        }
    });
    console.log('对象法', newArr);

    // 过滤重组法
    let checkArr = [];
    newArr = arr.filter((item) => {
        return checkArr.includes(item) ? '' : checkArr.push(item);
    });
    console.log('过滤法', newArr);

    // ES6判断法
    newArr = Array.from(new Set(arr));
    console.log('ES6法', newArr);

    // 复杂对象的判断

    return newArr;
}

// let uniqueTest = [1, 1, 2, '2', '2', true, true, null, null, NaN, NaN, undefined, undefined, [1, 2, 3], [1, 2, 3], [1, 2], { id: 2}, { id: 2}, { id: 3}, Array, Array, new Array(), new Array(), new Date(), new Date()];
// unique(uniqueTest);