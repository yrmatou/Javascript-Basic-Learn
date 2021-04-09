const MyPromise = require('./MyPromise');
const promise = new MyPromise(function (resolve, reject) {
    resolve('success');
})
function other () {
  return new MyPromise((resolve, reject) =>{
    resolve('other');
  })
}

const p1 = promise.then(value => {
  console.log(value);
  return p1;
})