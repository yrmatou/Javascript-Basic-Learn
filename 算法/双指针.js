/**给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，
 * 要求也按 非递减顺序 排序。
 * */
// function sortedSquares(nums) {
//     let n = nums.length;
//     let negative = -1;
//     for (let i = 0; i < n; ++i) {
//         if (nums[i] < 0) {
//             negative = i;
//         } else {
//             break;
//         }
//     }

//     let ans = [];
//     let index = 0, i = negative, j = negative + 1;
//     while (i >= 0 || j < n) {
//         if (i < 0) {
//             ans[index] = nums[j] * nums[j];
//             ++j;
//         } else if (j == n) {
//             ans[index] = nums[i] * nums[i];
//             --i;
//         } else if (nums[i] * nums[i] < nums[j] * nums[j]) {
//             ans[index] = nums[i] * nums[i];
//             --i;
//         } else {
//             ans[index] = nums[j] * nums[j];
//             ++j;
//         }
//         ++index;
//     }

//     return ans;
// }

// sortedSquares([1, 5, 6, 9, 10])
// // 2
// function sortedSquares2(nums) {
//     let n = nums.length;
//     let ans = [];
//     for (let i = 0, j = n - 1, pos = n - 1; i <= j;) {
//         if (nums[i] * nums[i] > nums[j] * nums[j]) {
//             ans[pos] = nums[i] * nums[i];
//             ++i;
//         } else {
//             ans[pos] = nums[j] * nums[j];
//             --j;
//         }
//         --pos;
//     }
//     return ans;
// }
// sortedSquares2([-7, -3, 2, 3, 11])

// var sortedSquares = function (nums) {
//     if (!nums || nums.length <= 0) return [];
//     let n = nums.length;
//     let result = Array(n - 1).fill();
//     let temp = -1;
//     // 有序递减数组，首先找到正数和负数的交接处索引值
//     let is = 0;
//     while (cn) {
//         is++
//         if (nums[cn] < 0) {
//             temp = is
//         } else {
//             break
//         }
//         --cn;
//     }
//     let index = 0, i = temp, j = temp + 1;
//     while (i >= 0 || j < n) {
//         if (i < 0) {
//             result[index] = Math.pow(nums[j], 2);
//             j++;
//         } else if (j === n) {
//             result[index] = Math.pow(nums[i], 2);
//             i--;
//         } else if (Math.abs(nums[i]) < Math.abs(nums[j])) {
//             result[index] = Math.pow(nums[i], 2);
//             i--;
//         } else {
//             result[index] = Math.pow(nums[j], 2);
//             j++;
//         }
//         index++;
//     }
//     return result;
// };

// sortedSquares([-7, -5, -4, -3, -2])