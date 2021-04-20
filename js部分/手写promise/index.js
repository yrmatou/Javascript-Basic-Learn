const MyPromise = require('./MyPromise');
const promise = new MyPromise((resolve, reject) => {
  resolve('succ')
})
 
promise.then().then(val => {console.log(val)}).then(val => {console.log(val)})
