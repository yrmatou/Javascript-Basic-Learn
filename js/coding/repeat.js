/**
 * 数组去重
 */
const arr = [1, 1, 2, 3, 4, 5, 6, 6, 7, 5];
/**
 * new Set
 */
// const newArr = [...new Set(arr)];
// console.log(newArr);

/**
 * map方式
 */
// let map = new Map();
// let newArr = [];
// for (let i = 0; i < arr.length; i++) {
//     if (!map.get(arr[i])) {
//         map.set(arr[i], i+'');
//         newArr.push(arr[i])
//     }
// }
// console.log(newArr)

/**
 * 数组扁平化
 */
// const arr2 = [1, 2, [3, 4, 5, [7, 8]], 6];
// const arr3 = []
// function flat(arr = []) {
//     if (arr.length <= 0) return [];
//     let a = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (Array.isArray(arr[i])) {
//             a = a.concat(flat(arr[i]))
//         } else {
//             a.push(arr[i])
//         }
//     }
//     return a;
// }
// console.log(flat(arr2))

/**
 * call apply 实现
 */
Function.prototype.MyCall = function (ctx) {
    let context = ctx || Window;
    let args = [...arguments].slice(1);
    context.fn = this;
    context.fn(args);
    delete context.fn;
}

// Function.prototype.MyApply = function(ctx) {
//     let context = ctx || Window;
//     const args = [...arguments].slice(1);
//     context.fn = this;
//     context.fn(args);
//     delete context.fn;
// }

const obj = {
    name: '王桥',
    age: 20
}

function getInfo(info) {
    console.log(this.name + this.age + info);
}

// getInfo.MyCall(null, '帅哥') // call方式
// getInfo.MyApply(obj, '帅哥2') // apply方式

/**
 * 函数柯里化 curry(fn, 1)(2)(3)
 */
// function curry(fn) {
//     if (!fn) return;
//     let args = [...arguments].slice(1);
//     return function () {
//         let arg = args.concat([...arguments]);
//         if (arg.length >= fn.length) {
//             fn(...arg);
//         }
//     }
// }

// function add(a, b, c) {
//     console.log(a + b + c);
// }

// curry(add, 1, 2)(2, 3);

// function tAdd(a) {
//     return function (b) {
//         return function (c) {
//             console.log(a+b+c)
//         }
//     }
// }
// tAdd(1)(2)(3)

/**
 * 浅拷贝 深拷贝
 */

// 浅拷贝 先不考虑 symbol情况
function shallowCopy(obj) {
    if (!obj) return '';
    let type = Object.prototype.toString.call(obj);
    if (type !== '[object Array]' && type !== '[object Object]') {
        return obj;
    }
    let copy = type === '[object Array]' ? [] : {};
    for (let key in obj) {
        copy[key] = obj[key];
    }
    return copy;
}
// object
// let c = {a:1,b:2};
// let copyC = shallowCopy(c);
// copyC.c=3;
// console.log(c, copyC)

// Array
// let b = [1,2,3,4];
// let copyb = shallowCopy(b);
// copyb.push(5);
// console.log(b, copyb)

function type(v) {
    return Object.prototype.toString.call(v)
}
// 深拷贝
function deepCopy(copy) {
    if (!copy) return '';
    if (type(copy) !== '[object Object]' && type(copy) !== '[object Array]') {
        return copy;
    }
    let newCopy = type(copy) === '[object Object]' ? {} : [];
    for (let key in copy) {
        if (copy[key] === copy) {
            newCopy[key] = copy
            continue;
        }
        if (type(copy[key]) === '[object Object]' || type(copy[key]) === '[object Array]') {
            newCopy[key] = deepCopy(copy[key])
        } else {
            newCopy[key] = copy[key]
        }
    }
    return newCopy;
}

// object
// let d = {a:1,b:2,c:{c:3}};
// d.d = d;
// let copyD = deepCopy(d);
// copyD.e=3;
// console.log(d, copyD)

// Array
// let D = [1,2,3,4,[5,6,[7,8]]];
// D.push(D)
// let copyD = deepCopy(D);
// console.log(D, copyD)

/**
 * 简单的实现get方法
 */
// const obj2 = {
//     a: {
//         b: {
//             c: 1
//         }
//     }
// }
// // _.get(obj2, 'a.b.c') // 1

// function get(obj2, keys) {
//     if (Object.prototype.toString.call(obj2) !== '[object Object]') {
//         return obj2;
//     }
//     let keysArr = keys.split('.');
//     if (keysArr.length <= 0) return obj2;
//     for (let i in keysArr) {
//         obj2 = obj2[keysArr[i]];
//     }
//     return obj2;
// }

// console.log(get(obj2, 'a.b.c'))

/**
 * 字符串和数组互转
 */
// function stringReverse(str) {
//     if (!str) return '';
//     let arr = str.split('');
//     return arr.reverse().join('');
// }

// console.log(stringReverse('开始冲起来了'))

/**
 * 将一个json数据的所有key从下划线改为驼峰
 */
const testData = {
    a_bb_b: 123,
    a_g: [1, 2, 3, 4],
    a_d: { s: 2, s_d: 3 },
    a_f: [1, 2, 3, { a_g: 5 }],
    a_d_s: 1
}

function type(v) {
    return Object.prototype.toString.call(v);
}

function toUpper(v) {
    return v.replace(/_\w+?/g, (match) => {
        return match.toUpperCase().replace(/_/g, '')
    })
}

// function changeTf (obj) {
//     if (!obj) return ''
//     if (type(obj) !== '[object Object]' && type(obj) !== '[object Array]') return obj;
//     let newObj = type(obj) === '[object Object]' ? {} : [];
//     for (let key in obj) {
//         if (type(obj[key]) === '[object Object]' || type(obj[key]) === '[object Array]') {
//             newObj[toUpper(key)] = changeTf(obj[key]);
//         } else {
//             newObj[toUpper(key)] = obj[key];
//         }
//     }
//     return newObj;
// }

// console.log(toUpper('a_b_c'))
// console.log(changeTf(testData))

/**
 * 解析url参数
 */
function parseParams(url) {
    if (!url) return '';
    let params = url.split('?')[1].split('&');
    if (params.length <= 0) return ''
    let obj = {};
    for (let key in params) {
        let v = params[key].split('=');
        // 判断数组和对象参数
        const regArr = /\[\]+/g;
        const regObj = /\{.*?\}/g;
        if (regArr.test(v[0])) {
            obj[v[0].replace(regArr, '')] = [v[1]];
        } else {
            if (regObj.test(decodeURIComponent(v[1]))) {
                obj[v[0]] = JSON.parse(decodeURIComponent(v[1]));
            } else {
                obj[v[0]] = v[1];
            }
        }
    }
    return obj;
}
console.log(parseParams('https://www.youzan.com?name=coder&age=20&callback=https%3A%2F%2Fyouzan.com%3Fname%3Dtest&list[]=a&json=%7B%22str%22%3A%22abc%22,%22num%22%3A123%7D'))

/**
 * 实现一个简单的事件模型
 * on off once
 */

class EventEmitter {
    constructor() {
        this.map = Object.create(null);
    }
    // in queque
    _inqueque(eventName, callback) {
        let queque = this.map[eventName]
        if (queque && queque.length > 0) {
            if (!queque.inclues(callback)) {
                queque.push(callback)
            }
        } else {
            this.map[eventName] = {
                queque: [callback],
                called: false
            }
        }
    }
    on (eventName, callback) {
        this._inqueque(eventName, callback)
        return this
    }
    off (eventName) {
        this.map[eventName] = [];
        return this
    }
    once (eventName, callback) {
        const { called } = this.map[eventName];
        if (called) { return }
        this.map[eventName].called = true
        this._inqueque(eventName, callback)
        return this
    }
    emit(eventName) {
        const { queque } = this.map[eventName]
        while(queque.length) {
            queque.pop()()
        }
        return this
    }
}

/**
 * 图片加载预处理 Promise
 */

function imageLoad(url) {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
            resolve('成功')
        }
        image.onerror = (err) => {
            reject('失败', err)
        }
        image.src = url;
    })
}

imageLoad('http://storage.custcome.com/commons_service/d67332415d3c4a02937a9a6fb39e3cf01630992902851.png').then(() => {
    console.log('成功')
}).catch((err) => {
    console.log('失败', err)
})

/**
 * 防抖 节流
 */

// 防抖
function debounce(fn, ms) {
    let timer = null;
    return function() {
        if (timer) {
            clearTimeout(timer)
        }
        const args = arguments
        timer = setTimeout(() => {
            fn && fn.apply(this, args)
        }, ms)
    }
}

// let debounceFn = debounce((a) => {
//     console.log('debounce', a)
// }, 500)

// setInterval(() => {
//     console.log('触发')
//     debounceFn(2)
// }, 1000)

// 节流
function throttle(fn, ms) {
    let time = null;
    return function () {
        let args = arguments;
        if (!time) {
            time = setTimeout(() => {
                fn && fn.apply(this, args);
                time = null;
            }, ms)
        }
    }
}

let throttleFn = throttle((a) => {
    console.log('throttle', a)
}, 3000)

setInterval(() => {
    console.log('触发')
    throttleFn(2)
}, 1000)

// setTimeout实现setInterval
function interval() {
    setTimeout(() => {
        console.log(1)
        interval()
    }, 1000)
}
// interval()
// setInterval实现setTimeout
function timeout() {
    let timer = setInterval(() => {
        console.log(1)
        clearInterval(timer)
    }, 1000)
}
// timeout()