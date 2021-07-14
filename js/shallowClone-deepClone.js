/**
 * 浅拷贝和深拷贝 暂时只考虑对象和数组 其他直接返回
 * 浅拷贝：只能改变一层的引用 多层引用无法更改
 * 深拷贝: 拷贝多层
 * 解决问题：1 爆栈 2循环引用
 * 
 * 栈内存存储的 是局部变量，凡是定义在方法中的都是局部变量，栈里存放的都是单个变量，变量被释放了，就没有。
   堆内存存储的 是数组和对象，凡是new建立的都在堆中，堆中存放的都是实体，实体用于封装数据，而且是封装多个，
   如果一个数据消失，这个实体也没有消失，还可以用，所以堆是不会随时释放的。
 */

/**
 * 首先手写一个生成多层数据结构的函数 测试是否爆栈
 * @param deep {number} 对象的深度
 * @param breadth {number} 每层有几个数据
 * @returns data
 *思路 首先data和temp指向同一个堆地址 然后 temp=temp['data']={} 此时 data={data:{}}、temp={}
 * data.data和temp['data']的引用指向新的temp={} 此时temp={} 赋值变化 temp['data']和data.data也会变化
 * 下一个循环继续
 */
const createDataLevel = (deep, breadth) => {
    let data = {};
    let temp = data;
    for (let i = 0; i < deep; i++) {
        // 此处 上面定的temp和data引用地址一样的 所以data变成 {data:{}}
        // 然后temp = {} 重新赋值 temp和temp['data'] 引用地址一致 temp循环插入值 temp['data'] 也会改变
        temp = temp['data'] = {};
        for (let j = 0; j < breadth; j++) {
            temp[j] = j;
        }
    }
    return data;
}

// 检测js数据类型
const detectionType = (s) => {
    // let type = Object.prototype.toString.call(s);
    // let value = {
    //     "[object Object]": 'Object',
    //     "[object String]": 'String',
    //     "[object Boolean]": 'Boolean',
    //     "[object Number]": 'Number',
    //     "[object Null]": 'Null',
    //     "[object Undefined]": 'Undefined',
    //     "[object Array]": 'Array',
    //     "[object Symbol]": 'Symbol',
    //     "[object Function]": 'Function'
    // }
    // return value[type] || 'Undefined';
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

// 浅拷贝
const shallowClone = (o) => {
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
// 测试浅拷贝 是否爆栈 浅拷贝不会爆栈
//  console.log('shallowClone', shallowClone(createDataLevel(10000)))

// 深拷贝 ① 解决了循环引用问题但是爆栈了 也挺好用的
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
// 测试是否爆栈 解决了循环引用问题但是爆栈了
// console.log('deepClone', deepClone(createDataLevel(10000)))

// 深拷贝 ② 解决了循环引用问题 深度爆栈了 广度没爆 也挺好用的
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

// let a = { b: 1 };
// a.a = a; // 假如出现类似结构 
// let c = deepClone2(a);
// console.log('c', c);
// 测试是否爆栈 爆栈了
//  console.log('deepClone2', deepClone2(createDataLevel(10000))) // 深度爆了
//  console.log('deepClone2', deepClone2(createDataLevel(10, 10000))) // 广度没爆

// 深拷贝 -- 解决递归爆栈、循环引用
const cloneForceFirst = (source) => {
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
        if (detectionType(key) !== "Undefined") {
            target = parent[key] = {};
        }
        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                // 如果判断此对象是自我引用
                if (data[k] === source) {
                    target[k] = target;
                    continue;
                }
                if (detectionType(data[k]) === "Object") {
                    loopList.push({
                        parent: target,
                        key: k,
                        data: data[k]
                    });
                } else {
                    target[k] = data[k];
                }
            }
        }
    }
    return root;
}

// let a = { b: 1 };
// a.a = a; // 假如出现类似结构 
// let c = cloneForceFirst(a);
// console.log('c=1', c);
// c.b = 2;
// console.log('c=2', c);
// 测试爆栈 没爆栈可以的
// console.log('cloneForceFirst', cloneForceFirst(createDataLevel(10000)))
// console.log('cloneForceFirst', cloneForceFirst(createDataLevel(10, 10000)))

// 深拷贝 ③ 迭代 改进版本循环引用和爆栈都没问题 但是就是写法有点麻烦开辟新的数组
const cloneForceLast = (x) => {
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
        if (detectionType(key) !== "Undefined") {
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
                if (detectionType(data[k]) === "Object") {
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
// 测试循环引用问题 没问题
// let a = { b: 1 };
// a.a = a; // 假如出现类似结构 
// let c = cloneForceLast(a);
// console.log('c', c);
// 测试爆栈 没爆栈可以的
// console.log('cloneForceLast', cloneForce(createDataLevel(10000)))
// console.log('cloneForceLast', cloneForce(createDataLevel(10, 10000)))

// 深拷贝 只兼容数据和对象两种方式-- 解决递归爆栈和循环引用有问题 利用 new WeakMap()
const cloneForceWeakMap = (x, map = new WeakMap()) => {
    let result;
    if (detectionType(x) === "Object") {
        result = {};
    } else if (detectionType(x) === "Array") {
        result = [];
    }
    let stack = [
        {
            parent: result,
            key: undefined,
            data: x,
        },
    ];
    while (stack.length) {
        let node = stack.pop();
        let { parent, key, data } = node;
        let res = parent;
        if (typeof key !== "undefined") {
            res = parent[key] = detectionType(data) === "Object" ? {} : [];
        }
        if (map.get(data)) {
            parent[key] = map.get(data);
            continue;
        }
        map.set(data, res);
        if (detectionType(data) === "Object") {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (typeof data[key] === "object") {
                        stack.push({
                            parent: res,
                            key,
                            data: data[key],
                        });
                    } else {
                        res[key] = data[key];
                    }
                }
            }
        } else if (detectionType(data) === "Array") {
            for (let i = 0; i < data.length; i++) {
                if (typeof data[i] === "object") {
                    // 下一次循环
                    stack.push({
                        parent: res,
                        key: i,
                        data: data[i],
                    });
                } else {
                    res[i] = data[i];
                }
            }
        }
    }
    return result;
};

// let a = { b: 1 };
// a.a = a; // 循环引用
// let c = cloneForceWeakMap(a);
// console.log('c', c);
// 测试爆栈 没爆栈可以的
// console.log('cloneForceWeakMap', cloneForceWeakMap(createDataLevel(10000)))
// console.log('cloneForceWeakMap', cloneForceWeakMap(createDataLevel(10, 10000)))