/**
 * 递归里面嵌套for循环
 * 递归函数参数返回值
 * 确定终止条件
 * 单层递归逻辑
 * 回溯法的搜索过程就是⼀个树型结构的遍历过程，在如下图中，可以看出for循环⽤来横向遍历，递归的
    过程是纵向遍历。
 */

/**
* @param {number[]} nums
* @return {number[][]}
*/
var permuteUnique = function (nums) {
   nums.sort((a, b) => {
      return a - b
   })
   let result = [] 
   let path = []

   function backtracing(used) {
      if (path.length === nums.length) {
         result.push(path.slice())
         return
      }
      for (let i = 0; i < nums.length; i++) {
         if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) {
            continue
         }
         if (!used[i]) {
            used[i] = true
            path.push(nums[i])
            backtracing(used)
            path.pop()
            used[i] = false
         }


      }
   }
   backtracing([])
   console.log(result)
   return result
};

permuteUnique([1,1,2])