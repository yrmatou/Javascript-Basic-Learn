/**
 * 实现一个数组去重函数 unique
 * [1,'1',1]                            -> [1,'1']
 * [{a: 1}, {b: 1}, {a: 1}]             -> [{a: 1}, {b: 1}]
 * [{a: 1, b: 2}, {b: 1}, {a: 1, b: 2}] -> [{a: 1, b: 2}, {b: 1}]
 * [[1, {a: 1}], [2], [3], [1, {a: 1}]] -> [[1, {a: 1}], [2], [3]]
 */
/**
 * 实现思路：
 * 1.普通类型的直接判断全等
 * 2. 引用类型的先判断length，再进行里面的递归判断
 */
function unique(arr) {
  if (!arr || arr.length <= 0) return [];
  let newArr = [];
  for (let item of arr) {
    if (['number', 'string', 'null'].includes(item)) {
      if (newArr.includes(item)) {
        newArr.push(item);
      }
    } else {
      const isExist = newArr.find(one => isEqual(one, item))
      if (!isExist) {
        newArr.push(item)
      }
    }
  }
  return newArr;
}
/**
 * 判断两个对象或者数组是否相等
 * 1. 先判断长度是否相等 不等为false
 * 2. 类型不同则为false
 * 3. 类型不是object或者数组则进入普通值对比
 * 4. 类型是引用类型的进入递归判断直到出结果
 */
function isEqual(obj1, obj2) {
  if (Object.keys(obj1).length !== Object.keys(obj2).length) return false;
  for (let item of Object.keys(obj1)) {
    const type1 = dataType(obj1[item]);
    const type2 = dataType(obj2[item]);
    if (type1 !== type2) return false;
    if (['number', 'string', 'null'].includes(type1)) {
      if (obj1[item] !== obj2[item]) return false;
    } else {
      return isEqual(obj1[item], obj2[item]);
    }
  }
  return true;
}
/**
 * 识别数据类型方法
 */
function dataType(str) {
  if (!str) return ''
  return Object.prototype.toString.call(str).toLowerCase().slice(8, -1)
}
// unique([{a: 1}, {b: 1}, {a: 1}])

/**
 * 3. 将一天24小时按每半小划分成48段，我们用一个位图表示选中的时间区间，
      例如`110000000000000000000000000000000000000000000000`，
      表示第一个半小时和第二个半小时被选中了，其余时间段都没有被选中，
      也就是对应00:00~01:00这个时间区间。一个位图中可能有多个不连续的
      时间区间被选中，例如`110010000000000000000000000000000000000000000000`，
      表示00:00-1:00和02:00-02:30这两个时间区间被选中了。
      要求：写一个函数timeBitmapToRanges，
      将上述规则描述的时间位图转换成一个选中时间区间的数组。
      示例输入：`"110010000000000000000000000000000000000000000000"`
      示例输出：`["00:00~01:00", "02:00~02:30"]`
 */
function timeSplit(str) {
  if (!str || str.length <= 0) return [];
  let res = [];
  let index = 0;
  while (index < str.length) {
    if (str.charAt(index) === '0') {
      index++;
      continue;
    }
    let current = { start: index, end: index };
    while (str.charAt(index) === '1') {
      current.end = index;
      index++;
    }
    res.push(current);
    index++;
  }
  let result = res.map((v) => `${formate(v.start/2)}~${formate(v.end/2+0.5)}`)
  return result
}
function formate(time) {
  let h = Math.floor(time);
  h = h > 9 ? h : `0${h}`
  let m = time - h === 0.5 ? '30' : '00';
  return `${h}:${m}`;
}