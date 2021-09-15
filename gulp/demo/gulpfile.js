/**
 * series 如果需要让任务（task）按顺序执行，请使用 series() 方法。
 */
// const { series } = require('gulp');

// // `clean` 函数并未被导出（export），因此被认为是私有任务（private task）。
// // 它仍然可以被用在 `series()` 组合中。
// function clean(cb) {
//     // body omitted
//     cb();
// }

// // `build` 函数被导出（export）了，因此它是一个公开任务（public task），并且可以被 `gulp` 命令直接调用。
// // 它也仍然可以被用在 `series()` 组合中。
// function build(cb) {
//     // body omitted
//     cb();
// }

// // exports.build = build;
// exports.default = series(clean, build);

/**
 * parallel 最大并发来运行的任务（tasks），可以使用 parallel() 方法将它们组合起来
 */

//  const { series, parallel } = require('gulp');

// const clean = function(cb) {
//   // body omitted
//   cb();
// };

// const css = series(clean, function(cb) {
//   // body omitted
//   cb();
// });

// const javascript = series(clean, function(cb) {
//   // body omitted
//   cb();
// });

// exports.build = parallel(css, javascript);
/**
 * 处理文件
 */
// const { src, dest } = require('gulp');
// const uglify = require('gulp-uglify');
// const rename = require('gulp-rename');

// exports.default = function() {
//   return src('src/*.js')
//     .pipe(uglify())
//     // 因此使用 gulp-rename 插件修改文件的扩展名
//     .pipe(rename({ extname: '.min.js' }))
//     .pipe(dest('dist/'));
// }

/**
 * 删除文件
 */
// const del = require('delete');

// exports.default = function(cb) {
//   // 直接使用 `delete` 模块，避免使用 gulp-rimraf 插件
//   del(['dist'], cb);
// }
/**
 * roolup 
 */
//  const { rollup } = require('rollup');

//  // Rollup 提供了基于 promise 的 API，在 `async` 任务（task）中工作的很好
//  exports.default = async function() {
//    const bundle = await rollup.rollup({
//      input: 'src/index.js'
//    });

//    return bundle.write({
//      file: 'dist/bundle.js',
//      format: 'iife'
//    });
//  }

/**
 * 监控文件
 */

const { watch, series } = require('gulp');

function clean(cb) {
    // body omitted
    cb();
}

function javascript(cb) {
    // body omitted
    cb();
}

function css(cb) {
    // body omitted
    cb();
}
// 可以只关联一个任务
// watch('src/*.css', css);
// 或者关联一个任务组合
// watch('src/*.js', series(clean, javascript));

// 所有事件都将被监控
watch('src/*.js', { events: 'all' }, function (cb) {
    // body omitted
    console.log(cb)
    cb();
});
