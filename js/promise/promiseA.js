/**
 * 手写promiseA 2
 * 首先定义promise状态 pending fulfilled rejected
 * 参考文章 https://juejin.cn/post/6850037281206566919
 */

// 定义三个状态常量
const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

/**
 * Promise class
 */
class Promise {
    // 定义一个自执行器函数
    constructor(executor) {
        this.status = PENDING; // promise当前状态
        this.fulfill = null; // resolve 执行的参数
        this.reason = null; // reject 参数
        this.onResolvedCallbacks = [];// 存放成功的回调
        this.onRejectedCallbacks = [];// 存放失败的回调
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED;
                this.fulfill = value;
                // 如果存在异步调用的成功回调则执行
                while(this.onResolvedCallbacks.length) {
                    const callback = this.onResolvedCallbacks.shift();
                    callback();
                }
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                // 如果存在异步调用的失败回调则执行
                while(this.onRejectedCallbacks.length) {
                    const callback = this.onRejectedCallbacks.shift();
                    callback();
                }
            }
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    then(onFulfilled, onRejected) {
        if (this.status === FULFILLED) {
            onFulfilled(this.fulfill);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
        // 状态为PENDING 收集回调函数
        if (this.status === PENDING) {
            if (onFulfilled) {
                this.onResolvedCallbacks.push(() => {
                    onFulfilled(this.fulfill);
                })
            }
            if (onRejected) {
                this.onRejectedCallbacks.push(() => {
                    onRejected(this.reason);
                })
            }
        }
    }
}

const fisrt = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then((data) => {
    console.log('fulfill', data)
}, (reason) => {
    console.log('reason', reason)
})