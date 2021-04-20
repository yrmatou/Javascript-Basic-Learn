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
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

class MyPromise {
  // executor 执行器
  constructor(executor) {
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      return this.reject(error);
    }
  }
  // promise状态
  status = PENDING;
  value = null; // 成功回调后的值
  reason = null; // 失败回调后的值
  onFulfilledCallbacks = []; // 存储成功后回调
  onRejectedCallbacks = []; // 存储失败后回调
  // 更改状态成功后的状态
  resolve = (value) => {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;
      while (this.onFulfilledCallbacks.length) {
        this.onFulfilledCallbacks.shift()(value);
      }
      console.log('resolve', this.status, value)
    }
  }
  // 更改状态失败后的状态
  reject = (reason) => {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;
      while (this.onRejectedCallbacks.length) {
        this.onRejectedCallbacks.shift()(reason);
      }
    }
  }
  // then的复杂实现
  then = (onFulfilled, onRejected) => {
    // 如果不传，就使用默认函数
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
    onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };
    const promise2 = new MyPromise((resolve, reject) => {
      // 判断状态
      if (this.status === FULFILLED) {
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 获取成功回调函数的执行结果
            const x = onFulfilled(this.value);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === REJECTED) {
        // ==== 新增 ====
        // 创建一个微任务等待 promise2 完成初始化
        queueMicrotask(() => {
          try {
            // 调用失败回调，并且把原因返回
            const x = onRejected(this.reason);
            // 传入 resolvePromise 集中处理
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.status === PENDING) {
        console.log('then', this.status, this.value)
        // 等待
        // 因为不知道后面状态的变化情况，所以将成功回调和失败回调存储起来
        // 等到执行成功失败函数的时候再传递
        this.onFulfilledCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 获取成功回调函数的执行结果
              const x = onFulfilled(this.value);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
        this.onRejectedCallbacks.push(() => {
          // ==== 新增 ====
          queueMicrotask(() => {
            try {
              // 调用失败回调，并且把原因返回
              const x = onRejected(this.reason);
              // 传入 resolvePromise 集中处理
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error)
            }
          })
        });
      }
    })
    return promise2;
  }

  // resolve静态方法

  static resolve (parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }
    return new MyPromise(resolve => {
      resolve(parameter);
    })
  }

  // reject静态方法
  static reject (reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }

}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  }
  // 判断x是不是 MyPromise 实例对象
  if (x instanceof MyPromise) {
    // 执行 x，调用 then 方法，目的是将其状态变为 fulfilled 或者 rejected
    // x.then(value => resolve(value), reason => reject(reason))
    // 简化之后
    x.then(resolve, reject)
  } else {
    // 普通值
    resolve(x)
  }
}

module.exports = MyPromise;