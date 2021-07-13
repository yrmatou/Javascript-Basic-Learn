/**
 * 浅拷贝和深拷贝
 * 浅拷贝：只能改变一层的引用 多层引用无法更改
 */

// 检测js类型
const detectionType = (s) => {
    return Object.prototype.toString.call(s).match(/\[([^]*)\]/)[1].split(' ')[1];
}

// Object.create(null) 的对象，没有hasOwnProperty方法
const hasOwnProp = (obj, key) => {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

// 仅对对象和数组进行深拷贝，其他类型，直接返回
const isClone = (x) => {
    const t = detectionType(x);
    return t === 'Object' || t === 'Array';
}

// 浅克隆
const shallowClone = (x) => {
    if (detectionType(o) === 'Object' && detectionType(o) === 'Array') return o;
    let n;
    // 检测是数组的情况
    if (detectionType(o) === 'Array') {
        n = new Array();
        for (let i = 0; i < o.length; i++) {
            n[i] = o[i];
        }
        return n;
    };
    // 检测时对象的情况
    if (detectionType(o) === 'Object') {
        n = new Object();
        for (let i in o) {
            if (!n.hasOwnProperty(o[i])) {
                n[i] = o[i];
            }
        }
        return n;
    }
    return o;
}

// 深拷贝 ① 解决了循环引用
const deepClone = (x) => {
    if (!isClone(x)) return x;
    const t = detectionType(x);
    let res;
    if (t === 'Array') {
        res = [];
        for (let i = 0; i < x.length; i++) {
            // 避免一层死循环 a.b = a x[key] === x ? res 利用引用类型概念给res赋值
            res[i] = x[i] === x ? res : deepClone(x[i]);
        }
    } else if (t === 'Object') {
        res = {};
        for (let key in x) {
            if (hasOwnProp(x, key)) {
                // 避免一层死循环 a.b = a x[key] === x ? res 利用引用类型概念给res赋值
                res[key] = x[key] === x ? res : deepClone(x[key])
            }
        }
    }
    return res;
}

// let a = { b: 1 };
// a.a = a; // 假如出现类似结构  x[key] === x 防止爆栈
// let c = deepClone(a);
// console.log('c==1', c);
// c.a.b = 2;
// console.log('c==2', c);
// 上面这种会出现引用类型的错误 拷贝结束后 {b:1,a:{b:1,a{...}}}
// c.a.b = 2; 导致c {b:2,a:{b:2,a{...}}},

// 深拷贝 ②
const deepClone2 = (x, map = new WeakMap()) => {
    if (!isClone(x)) return x;
    const t = detectionType(x);
    let res;
    if (map.get(x)) {
        return map.get(x);
    }
    map.set(x, res);
    if (t === 'Array') {
        res = [];
        for (let i = 0; i < x.length; i++) {
            res[i] = deepClone(x[i], map);
        }
    } else if (t === 'Object') {
        res = {};
        for (let key in x) {
            if (hasOwnProp(x, key)) {
                res[key] = deepClone(x[key], map)
            }
        }
    }
    return res;
}

let a = { b: 1 };
a.a = a; // 假如出现类似结构  x[key] === x 防止爆栈
let c = deepClone2(a);
console.log('c', c);

// 深拷贝 ③ 迭代
const cloneForce = (x) => {
    const uniqueList = []; //拷贝对象记录
    let root = {};
    // 循环数组
    const loopList = [{
        parent: root,
        key: undefined,
        data: x,
    }];
    while (loopList.length) {
        //深拷贝，元素出栈
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }
        // 判断数据是否存在
        let uniqueData = find(uniqueList, data);
        //数据存在
        if (uniqueData) {
            parent[key] = uniqueData.target;
            break; // 中断本次循环
        }
        //数据不存在，将其放入数组
        uniqueList.push({
            source: data,
            target: res,
        });
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }
    return root;
}
// 辅助函数
const find = (arr, item) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].source === item) {
            return arr[i];
        }
    }
    return null;
}

// 迭代解决循环引用
/**
 * 深拷贝 -- 解决递归爆栈
 */
const cloneLoop = (source) => {
    if (!isClone(source)) {
        return source;
    }
    const root = {};
    const loopList = [
        {
            parent: root,
            key: undefined,
            data: source,
        },
    ];
    while (loopList.length) {
        const node = loopList.pop();
        const data = node.data;
        const parent = node.parent;
        const key = node.key;
        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let target = parent;
        if (typeof key !== "undefined") {
            target = parent[key] = {};
        }
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === "object") {
                    loopList.push({
                        parent: target,
                        key: k,
                        data: data[k],
                    });
                } else {
                    target[k] = data[k];
                }
            }
        }
    }
    return root;
}