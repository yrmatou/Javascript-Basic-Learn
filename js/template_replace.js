/**
 * 替换模板
 */
const template = 'My name is ${name}, I am a ${job}I am a ${job2}'
const data = { name: 'shenjiuer', job: 'engineer', job2: 'zadi' }
// 正则1
// function printf(template, data) {
//     let n = template.replace(/\$\{.*?\}/g, (e) => {
//         if (!e) return '';
//         let key = e.replace(/[${|}]/g, '');
//         return data[key] || '';
//     })
//     return n;
// }

// 正则2
function printf(template, data) {
    return template.replace(/\$\{(.*?)\}/g, (match, key) => data[key] || '')
}

console.log(printf(template, data))