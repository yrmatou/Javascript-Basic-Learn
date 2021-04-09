/**
 *  Promise 会有三种状态
    Pending 等待 Fulfilled 完成 Rejected 失败
    状态只能由 Pending --> Fulfilled 或者 Pending --> Rejected，且一但发生改变便不可二次修改；
    Promise 中使用 resolve 和 reject 两个函数来更改状态；
    then 方法内部做但事情就是状态判断
    如果状态是成功，调用成功回调函数
    如果状态是失败，调用失败回调函数
 * 
 *  
 */

// 定义三个状态变量
const PENDING = 'pengdig';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // executor 执行器
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  // promise状态
  status = PENDING;
  value = null; // 成功回调后的值
  reason = null; // 失败回调后的值
  onFulfilledCallback = []; // 存储成功后回调
  onRejectedCallback = []; // 存储失败后回调
  // 更改状态成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallback.length) {
        this.onFulfilledCallback.shift()(value);
      }
    }
  }
  // 更改状态失败后的状态
  reject = (reason) => {
    if (this.status === REJECTED) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallback.length) {
        this.onRejectedCallback.shift()(reason);
      }
    }
  }
  // then的复杂实现
  then = (onFulfilled, onRejected) => {
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === PENDING) {
        this.onFulfilledCallback.push(onFulfilled);
        this.onRejectedCallback.push(onRejected);
      }
      else if (this.status === FULFILLED) {
        // 获取成功回调函数的执行结果
        const x = onFulfilled(this.value);
        // 传入 resolvePromise 集中处理
        resolvePromise(x, resolve, reject);
      }
      else if (this.status === REJECTED) {
        onRejected(this.reason);
      }
    })
    return promise2;
  }
}

function resolvePromise(x, resolve, reject) {
  // 判断x是不是 MyPromise 实例对象
  if(x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else{
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise;