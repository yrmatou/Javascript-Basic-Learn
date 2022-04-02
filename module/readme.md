## commonJS
- 只是值的拷贝，不会影响原数据。
```js
1. module.exports = { a: 1, b: 2 } // 导出的是整体 一个文件中只能导出一个 多个module.exports存在的话导出的是最后一个
2. module.exports.a = 1; module.exports.b = 2; 等同于 module.exports = { a: 1, b: 2 }。exports.a = 1 等同于 module.exports.a = 1;
3. exports = { a: 1, b: 2 } 不能这样使用，但是 module.exports = { a: 1, b: 2 } 可以这样使用。
4. 假如导出的是一个整体对象的话，可以这样引入 const { a } = require('./foo');
```

## esModule
- 引用传递
```js
export const a = 1;
export default { a: 1, b: 1 };
import * as a from 'xx';
import { a, b} from 'xx';
import a from 'xx';
```

## commonJS和esModule区别
- CommonJs导出的是变量的一份拷贝，ES6 Module导出的是变量的绑定（export default 是特殊的）
- CommonJs是单个值导出，ES6 Module可以导出多个
- CommonJs是动态语法可以写在判断里，ES6 Module静态语法只能写在顶层
- CommonJs的 this 是当前模块，ES6 Module的 this 是 undefined