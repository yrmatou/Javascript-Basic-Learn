var obj = {}, value = null;
Object.defineProperty(obj, 'num', {
  get: () => {
    console.log('执行了get')
    return value
  },
  set: (newValue) => {
    console.log('执行了 set')
    value = newValue
  }
})
obj.num = 1;
/**
 * 做一个简单的监听属性值变化函数
 */
(function() {
  function watch(obj, name, func) {
    var value = obj[name];
    Object.defineProperty(obj, name, {
      get: function () {
        return value
      },
      set: function(newValue) {
        value = newValue;
        func(value);
      }
    })
    if (value) obj[name] = value;
  }
  this.watch = watch;
})()