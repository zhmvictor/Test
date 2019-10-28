// 插入排序：默认左边第一个位置为有序列表，右边为无序列表，
// 每次从右边无序列表的第一个位置取值作为待插入的值，插入到左边合适的位置

// 折半插入思想： 折半查找+插入排序
// 将待插入的值用折半查找思想，在左边有序列表中找出合适的插入位置，
// 若值相同，则默认插入相同值的后面

// 普通插入排序
function insertSort(arr) {
  console.log(arr);
  const { length } = arr;
  let temp; // 存储待插入的值
  for (let i = 1; i < length; i++) {
    let j = i;
    temp = arr[i]; // 待插入的值
    console.log(`i=${i}, j=${j}, temp=${temp}`);
    while (j > 0 && temp < arr[j - 1]) {
      // 待插入的值小于前面位置的值
      arr[j] = arr[j - 1]; // 将待插入的值前移
      j--;
      console.log(`j=${j}, arr:=[${arr}]`);
    }
    arr[j] = temp; // 将待插入的值插入到正确位置
    console.log(`j=${j}, arr:=[${arr}]\n===================`);
  }
  return arr;
}

// 这折半插入排序
function binaryInsertSort(arr) {
  const { length } = arr;
  let temp, low, high, mid;
  for (let i = 1; i < length; i++) {
    if (arr[i] < arr[i - 1]) {
      temp = arr[i]; // 待插入的值
      low = 0;
      high = i - 1;
      while (low <= high) {
        mid = Math.floor((low + high) / 2);
        if (temp >= arr[mid]) {
          low = mid + 1; // 当前值大于中间值时，搜索[mid + 1, high]区间
        } else {
          high = mid - 1; //  当前值小于中间值时，搜索[low, mid - 1]区间
        }
      }
      let j = i - 1;
      for (; j > high; j--) {
        arr[j + 1] = arr[j];
      }
      arr[high + 1] = temp;
    }
  }
  return arr;
}

function inser_sort(arr) {
    console.log(arr);
    const { length } = arr;
    let temp;  // 存储待插入的值
    // 默认最开始数据结构第一项作为有序列表，无序列表的第一项从数据结构第二项开始
    // 外层循环控制循环轮次
    for(let i = 1; i < length; i++) {
        // 每轮循环将无序列表的第一项作为待插入的值
        temp = arr[i]; 
        // 无序列表的前一项即为有序列表的最后一项
        // 有序列表从后向前循环迭代
        // 将有序列表的每一项与待插入值比较，若大于待插入值，则将其向后移动
        // 如此循环， 直到：
        // 1. j < 0 说明有序列表的值均大于待插入值，此时将待插入值插入有序列表第一项
        // 2. arr[j] <= temp 说明有序列表第 j 位置的值不大于待插入值，那么将待插入值插入其后
        let j = i - 1;
        console.log(`i=${i}, j=${j}, temp=${temp}`);
        while(j >= 0 && arr[j] > temp) {
            arr[j + 1] = arr[j];
            j--;
            console.log(`j=${j}, arr=[${arr}]`);
        }
        arr[j + 1] = temp;
        console.log(`j=${j}, arr=[${arr}]\n===================`);
    }
    return arr;
}

let arr = [ 4, 5, 1, 3, 2];
// insertSort(arr);
// console.log(binaryInsertSort(arr));
inser_sort(arr);
