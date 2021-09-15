/**
 * 观察者模式
 * 观察者模式是对象中的一种一对多的依赖关系，当对应的状态发生改变时，执行相应的更新
 * 1.目标（发布者），发布者它会记录所有的订阅者，当状态发生改变时，由发布者通知订阅者
   2.观察者（订阅者） 所有的订阅者都有一个update方法，这个方法是用于处理状态发生改变时的业务。
   简单语言解析
   观察者模式指的是一个对象(Object a)维持一系列依赖(关注这个词感觉更好)它的对象（Object b,c,d） 当它的有关状态发生变化时Object a就要通知一系列Object b,c,d对象进行更新
   Vue响应机制中使用了观察者模式，在vue响应机制中，当数据变化的时候会调用观察者的update方法，update方法内部就是更新视图
 */

class Dep {
    constructor() {
        this.subs = []
    }
    // 添加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    // 移除订阅
    removeSub(sub) {
       const index = this.subs.findIndex(v => v === sub)
       if (index >= 0) {
           this.subs.splice(index, 1)
       }
    }
    notify() {
        this.subs.forEach(v => {
            console.log('执行')
            v.update()
        })
    }
}

class Watcher {
    constructor(name) {
        this.name = name
    }
    update() {
        console.log('更新', this.name)
    }
}

// const dep = new Dep()
// const obj = new Watcher(1)
// const obj2 = new Watcher(2)
// dep.addSub(obj)
// dep.addSub(obj2)
// dep.notify()
// dep.removeSub(obj2)
// dep.notify()

/**
 * 发布订阅模式
 * 订阅者，订阅者的作用是：向调度中心注册一个事件，这个事件的作用是处理状态改变后的业务。
   发布者，发布者的作用是：向调度中心发起一个状态改变的通知。
   调度中心，调度中心的作用是：将发布者状态改变时向调度中心发送的通知，告知给订阅者。
 */

   class EventEmitter {
       constructor() {
           this.subject = Object.create(null)
       }
       // 注册事件
       $on (type, handler) {
           console.log(this.subject[type])
           this.subject[type] = this.subject[type] ||  {}
            this.subject[type]['queque'] = this.subject[type]['queque'] || []
            this.subject[type]['queque'].push(handler)
       }
       // 触发事件
       $emit(type) {
           if (this.subject[type]) {
                while (this.subject[type].queque.length) {
                    this.subject[type].queque.pop()()
                }
           }
       }
   }

   const dispatch = new EventEmitter()
   dispatch.$on('click', () => { console.log('click') })
   dispatch.$on('enter', () => { console.log('enter') })
   dispatch.$emit('click')
   dispatch.$emit('enter')