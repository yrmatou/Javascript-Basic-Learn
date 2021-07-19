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
class PromiseA {
    // 定义一个自执行器函数
    constructor(executor) {
        this.status = PENDING; // promise当前状态
        this.fulfill = null; // resolve 执行的参数
        this.reason = null; // reject 参数
        this.onResolvedCallbacks = [];// 存放成功的回调
        this.onRejectedCallbacks = [];// 存放失败的回调
        let resolve = (value) => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = FULFILLED;
                    this.fulfill = value;
                    // 如果存在异步调用的成功回调则执行
                    while (this.onResolvedCallbacks.length) {
                        const callback = this.onResolvedCallbacks.shift();
                        callback();
                    }
                }
            }, 0);
        }
        let reject = (reason) => {
            setTimeout(() => {
                if (this.status === PENDING) {
                    this.status = REJECTED;
                    this.reason = reason;
                    // 如果存在异步调用的失败回调则执行
                    while (this.onRejectedCallbacks.length) {
                        const callback = this.onRejectedCallbacks.shift();
                        callback();
                    }
                }
            }, 0);
        }
        try {
            executor(resolve, reject)
        } catch (err) {
            reject(err)
        }
    }
    /**
     * 1 还要满足链式调用加上 .then().then()
     * 2 值的穿透
     * 这样的话需要每次都要返回一个新的Promise 首先定义一个新的Promise
     */
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
        onRejected = typeof onFulfilled === 'function' ? onFulfilled : err => { throw err };
        if (this.status === FULFILLED) {
            onFulfilled(this.fulfill);
        }
        if (this.status === REJECTED) {
            onRejected(this.reason);
        }
        // 定义一个promise并且返回 里面是处理函数
        const promise2 = new PromiseA((resolve, reject) => {

        })
        // 状态为PENDING 收集回调函数
        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => {
                onFulfilled(this.fulfill);
            })
            this.onRejectedCallbacks.push(() => {
                onRejected(this.reason);
            })
        }
        return promise2;
    }
}

// 简单的测试例子
const fisrt = new PromiseA((resolve, reject) => {
    setTimeout(() => {
        resolve('成功');
    }, 1000);
}).then((data) => {
    console.log('fulfill', data)
}, (reason) => {
    console.log('reason', reason)
})

// 链式调用