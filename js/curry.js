
/**
 * 函数柯理化
 *  参数复用、提前返回和 延迟执行
 */
// add
function add(a, b) {
    return a + b
}

// curry
function curry(fn) {
    // 函数参数的数量
    let length = fn.length;
    let slice = Array.prototype.slice;
    let args = slice.call(arguments, 1);
    return function () {
        let arg = args.concat(slice.call(arguments));
        // 判断函数参数的数量
        if (arg.length >= length) {
            return fn.call(this, ...arg);
        }
        curry(fn, ...arg);
    }
}

var curryN = curry(add);

console.log(curryN(1));