
/**
 * 函数柯理化
 *  参数复用、提前返回和 延迟执行
 * curry是一个收集参数的方法，收集够了去执行函数。
 */
// add
function add(a, b, c) {
    return a + b - c
}

// curry 柯里化
function curry(fn) {
    let arg = []
    return function _c() {
        arg = arg.concat([...arguments]);
        // 判断函数参数的数量
        if (arg.length >= fn.length) {
            return fn(...arg);
        }
        return _c;
    }
}

var curryN = curry(add);

// console.log(curryN(1)(2)(3));
// console.log(curryN(1, 2)(3));
// console.log(curryN(1)(2, 3));
// console.log(curryN(1, 2, 3));