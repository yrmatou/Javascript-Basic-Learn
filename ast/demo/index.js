const babylon = require('babylon');

const code = `const a = 5;`;
const ast = babylon.parse(code);
console.log(ast);