/**
 * 一些计算密集型或高延迟的任务，被 Worker 线程负担了，
 * 主线程（通常负责 UI 交互）就会很流畅，不会被阻塞或拖慢。
 */
 var worker = new Worker('work.js');
 worker.postMessage('Hello World');


