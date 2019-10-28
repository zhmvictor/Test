// 选择排序：
// 在数据结构中找到最小的值，将其放在第一位，
// 再继续找第二小的数，放在第二位，如此循环
// 默认第一个数是最小的数
function selectSort(arr) {
  console.log(arr);
  const { length } = arr;
  let indexMin;
  for (let i = 0; i < length - 1; i++) {
    indexMin = i;
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[indexMin]) {
        indexMin = j;
      }
      console.log(`最小值：${arr[indexMin]}`);
    }
    if (i !== indexMin) {
      [arr[i], arr[indexMin]] = [arr[indexMin], arr[i]];
    }
    console.log(arr);
  }
  return arr;
}

arr = [5, 4, 3, 2, 6];
selectSort(arr);
