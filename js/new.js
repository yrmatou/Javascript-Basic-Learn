/**
 * 手写js实现 new关键字
 * 新建一个构造函数的实例对象 每个对象都有_proto_指向构造函数的原型prototype
 * 假如构造函数返回的是一个对象 那么返回的是这个return 的对象
 * 假如构造函数返回的基本类型 那就跟没有return一样
 */

function Person(name, age) {
    this.name = name;
    this.age = age;
}

// var o = new Person('wq', 20);

// console.log(o.name) // wq

function objectFactory() {
    var obj = {};
    Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    // 所以我们还需要判断返回的值是不是一个对象，如果是一个对象，我们就返回这个对象，如果没有，我们该返回什么就返回什么。
    const ret = Constructor.apply(obj, arguments);
    return typeof ret === 'object' ? ret : obj;
}

var b = objectFactory(Person, 'wq2', 18);
console.log(b.name);