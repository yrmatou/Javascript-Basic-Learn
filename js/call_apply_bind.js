/**
 * 非严格模式
 * 还原call apply bind函数
 */

// var person = {
//     name: '王q',
//     getName(age) {
//         console.log(this.name + age);
//     }
// }
// // console.log(person.getName()) // 王q

// const company = { name: 'wq' }
// company 对象想用person getName方法 
// console.log(person.getName.call(company,1)) // call方式 wq
// console.log(person.getName.apply(company, [1])) // apply方式 wq

function mySymbol(obj) {
    // 不要问我为什么这么写，我也不知道就感觉这样nb
    let unique = (Math.random() + new Date().getTime()).toString(32).slice(0, 8)
    // 牛逼也要严谨
    if (obj.hasOwnProperty(unique)) {
        return mySymbol(obj) //递归调用
    } else {
        return unique
    }
}
/**
 * 手写 call函数
 * 功能：传入的对象能借用其他对象函数方法 整合参数
 */
Function.prototype.myCall = function (context) {
    context = context || window;
    let fn = mySymbol(context);
    context[fn] = this;
    let arg = [...arguments].slice(1);
    context[fn](...arg);
    delete context[fn];
}

// console.log(person.getName.myCall(company, 1)) // myCall方式 wq

/**
 * 手写 apply函数
 * 功能：传入的对象能借用其他对象函数方法 整合参数
 */
Function.prototype.myApply = function (context) {
    if (typeof context === "undefined" || context === null) {
        context = window
    }
    let fn = mySymbol(context);
    context[fn] = this;
    let arg = [...arguments].slice(1);
    context[fn](...arg[0]);
    delete context[fn];
}

// console.log(person.getName.myApply(company, [12, 13])) // myApply方式 wq

/**
 * 以下为bind实现测试代码加上关键代码
 */
var person2 = {
    name: '王q',
    getName(age, name2) {
        console.log(this.name + age + name2);
    }
}
// console.log(person.getName()) // 王q

const company2 = { name: 'wq' }

/**
 * 手写bind 函数
 * 特点 改变 this指向 但是不会立马执行 所以应该是返回一个闭包函数
 * new bind 兼容
 */
Function.prototype.myBind = function (context) {
    let self = this;
    let arg = [...arguments].slice(1);
    return function () {
        console.log(arguments);
        return self.apply(context, [...arg, ...arguments]);
    }
}

console.log(person2.getName.myBind(company2, 3)(1)) // myBind方式 wq