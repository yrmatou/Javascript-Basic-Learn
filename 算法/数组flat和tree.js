// 原始
let arr = [
  { id: 1, name: '部门1', pid: 0 },
  { id: 2, name: '部门2', pid: 1 },
  { id: 3, name: '部门3', pid: 1 },
  { id: 4, name: '部门4', pid: 3 },
  { id: 5, name: '部门5', pid: 4 }
]
// 输出
// [
//   {
//       "id": 1,
//       "name": "部门1",
//       "pid": 0,
//       "children": [
//           {
//               "id": 2,
//               "name": "部门2",
//               "pid": 1,
//               "children": []
//           },
//           {
//               "id": 3,
//               "name": "部门3",
//               "pid": 1,
//               "children": [
//                   // 结果 ,,,
//               ]
//           }
//       ]
//   }
// ]
/**
 * 递归思想
 * 循环查找子项
 * 方法三个参数
 * data源数组，result存放结果集，pid上级id
 * let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 }
  ]
 */
// function getChildren(data, result, pid) {
//   for (item of data) {
//     if (item.pid === pid) {
//       const newItem = { ...item, children: [] }
//       result.push(newItem)
//       getChildren(data, newItem.children, item.id)
//     }
//   }
// }
// function flatFunc(arr, pid) {
//   const result = []
//   getChildren(arr, result, pid)
//   return result;
// }
// console.log(flatFunc(arr, 0))
/**
 * 利用map方法
 * let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 }
  ]
 */
// function arrayToTree(items) {
//   const result = [];   // 存放结果集
//   const itemMap = {};  // 

//   for (const item of items) {
//     const id = item.id;
//     const pid = item.pid;
//     if (!itemMap[id]) {
//       itemMap[id] = {
//         children: [],
//       }
//     }
//     itemMap[id] = {
//       ...item,
//       children: itemMap[id]['children']
//     }
//     const treeItem =  itemMap[id];
//     if (pid === 0) {
//       result.push(treeItem);
//     } else {
//       if (!itemMap[pid]) {
//         itemMap[pid] = {
//           children: [],
//         }
//       }
//       itemMap[pid].children.push(treeItem)
//     }

//   }
//   return result;
// }
// console.log(arrayToTree(arr))

/**
 * 拍平tree 
 * [
  //   {
  //       "id": 1,
  //       "name": "部门1",
  //       "pid": 0,
  //       "children": [
  //           {
  //               "id": 2,
  //               "name": "部门2",
  //               "pid": 1,
  //               "children": []
  //           },
  //           {
  //               "id": 3,
  //               "name": "部门3",
  //               "pid": 1,
  //               "children": [
  //                   // 结果 ,,,
  //               ]
  //           }
  //       ]
  //   }
  // ]
 */
let tree = {
  "id": 1,
  "name": "部门1",
  "pid": 0,
  "children": [
    {
      "id": 2,
      "name": "部门2",
      "pid": 1,
      "children": []
    },
    {
      "id": 3,
      "name": "部门3",
      "pid": 1,
      "children": [
        {
          "id": 4,
          "name": "部门4",
          "pid": 3,
        }
      ]
    }
  ]
}
// 输出 [{"id":1,"name":"部门1","pid":0},{"id":2,"name":"部门2","pid":1},{"id":3,"name":"部门3","pid":1},{"id":4,"name":"部门4","pid":3}]
function getFlat(tree, result) {
  result.push({
    id: tree.id,
    name: tree.name,
    pid: tree.pid
  })
  if (tree.children) {
    for (item of tree.children) {
      getFlat(item, result)
    }
  }
  return result
}

console.log(getFlat(tree, []))