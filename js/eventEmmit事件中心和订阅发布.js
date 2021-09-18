/**
 * 复杂版本 订阅发布 eventBus方式
 * 主要思想就是定义一个储存事件中心对象，这个对象有addSub,emit,off
 * 动态的用addSub订阅事件，再用emitSub发布已添加的事件
 * 普通的订阅发布跟vue2响应式还是有区别的
 */
class EventBus {
    constructor() {
        // sub的数据结构是 
        // {
        //     "eventName": {
        //         queque: [], // 事件队列
        //         called: false, // 是否被执行
        //     }
        // }
        this.sub = {};
    }
    /**
     * 
     * @param {*} eventName 订阅类型名称
     * @param {*} cbj 订阅事件回调函数对象 cbj:{name:'', cb: (v) => {}}
     */
    on(eventName = '', cbj = {}) {
        if (!eventName) return '订阅类型不能为空'
        let queObj = this.sub[eventName]
        // 不存在此订阅则初始化一个默认订阅
        if (!queObj) {
            queObj = {
                queque: [],
                called: false
            }
        }
        queObj.queque.push(cbj) // cb回调 push订阅队列里面
        this.sub[eventName] = queObj
        return this
    }
    /**
     * 
     * @param {*} eventName 订阅类型名称
     * @param {*} cbj 事件回调对象
     * @param {*} del 事件执行完是否从队列中去除
     * @param {*} all 此订阅类型的回调队列是否全部执行
     */
    emit(eventName = '', cbj = {}, del = false, all = false) {
        if (!eventName) return '订阅类型不能为空'
        let queObj = this.sub[eventName]
        if (!queObj) return '不存在此订阅'// 不存在此订阅 直接return
        // 同类型订阅是否全部执行
        if (all) {
            queObj.queque.forEach(v => v.cb())
            return
        }
        const item = queObj.queque.find(v => v.name === cbj.name)
        if (!item) return '没有订阅类型的回调哦' // 订阅类型里面找不到此回调函数返回
        item.cb(cbj.params)
        if (!del) return // 不从队列中去除
        let queque = queObj.queque.filter(v => v.name !== cbj.name)
        queObj.queque = queque
        this.sub[eventName] = queObj
        return this
    }
    /**
     * 移除同订阅类型的回调事件
     * @param {*} eventName 订阅类型名称
     * @param {*} cbj 事件回调对象
     */
    off(eventName, cbj = {}) {
        let queObj = this.sub[eventName]
        if (!queObj) return '不存在此订阅' // 不存在此订阅 直接return
        if (!cbj.name) {
            delete this.sub[eventName]
        } else {
            let queque = queObj.queque.filter(v => v.name !== cbj.name)
            queObj.queque = queque
            this.sub[eventName] = queObj
        }
        return this
    }
    /**
     * once 只执行一次
     */
    once(eventName, cbj) {
        let fn = (...args) => {
            this.off(eventName, cbj)
            cbj.cb.apply(this, args)
        }
        this.on(eventName, { name: cbj.name, cb: fn })
        return this
    }
    /**
     * 清空Event 中心
     */
    clearEvent() {
        this.sub = {};
        return this
    }
}

// 测试用例
// let eventAuto = new EventBus()
// eventAuto.on('Login', {
//     name: 'activity',
//     cb: () => {
//         console.log('activity 注册后的执行')
//     }
// })
// eventAuto.on('Login', {
//     name: 'coupon',
//     cb: () => {
//         console.log('coupon 注册后的执行')
//     }
// })

// eventAuto.emit('Login', {
//     name: 'activity'
// })
// console.log('eventAuto===1', eventAuto)
// eventAuto.off('Login', { name: 'activity' })
// console.log('eventAuto===2 去除queque', eventAuto)
// eventAuto.off('Login', { name: 'activity' })
// console.log('eventAuto===3 去除类型', eventAuto)
// eventAuto.once('Login', {
//     name: 'shop',
//     cb: () => {
//         console.log('shop 注册后的执行')
//     }
// })
// console.log('eventAuto===4', eventAuto)

/**
 * vue2 的EventBus中心简单实现
 */
class VueEventBus {
    constructor() {
        // {
        //     login: [cb, cb]
        // }
        this._eventBus = {}
    }
    /**
     * on 订阅函数
     */
    on(event, cb) {
        if (!event) return
        if (event instanceof Array) {
            event.forEach(v => this.on(v, cb))
            return
        }
        if (!this._eventBus[event]) {
            this._eventBus[event] = []
        }
        this._eventBus[event].push(cb)
    }
    /**
     * emit 发布函数
     */
    emit(event) {
        if (!event) return
        if (!this._eventBus[event]) return
        let args = [].slice.call(arguments, 1)
        let cbs = this._eventBus[event]
        if (cbs) {
            cbs.forEach((v) => v.apply(this, args))
        }
    }
    /**
     * off 移除函数
     */
    off(event, cb) {
        if(!arguments){
			this._eventBus = Object.create(null)
		}
		if(event instanceof Array){
			event.forEach(evt=>this.off(evt, cb))
		}
		if(!cb){
			this._eventBus[event] = null
		}
        let eventArr = this._eventBus[event]
        if (!eventArr || eventArr.length <= 0) return
        eventArr.forEach((v, idx) => {
            // 判断cb 是否存在 还有once里面的闭包函数
            if (cb === v || cb === v.cbName) {
                eventArr.splice(idx, 1)
            }
        })
        this._eventBus[event] = eventArr
    }
    /**
     * once只执行一次
     */
    once(event, cb) {
        if (!event) return
        // 定义一个闭包函数执行一次就清除event
        function fn() {
            cb.apply(this, arguments)
            this.off(event, cb)
        }
        fn.cbName = cb
        this.on(event, fn)
    }
}

// 测试例子
let vueBus = new VueEventBus()
vueBus.on('vue', (a, b) => {
    console.log('vue', a, b)
})
vueBus.emit('vue', 'first', 'second')
vueBus.once('vue2', (a, b) => {
    console.log('vue2', a, b)
})
vueBus.emit('vue2', 'three', 'four')
console.log(vueBus)
vueBus.emit('vue2', 'three', 'four')

