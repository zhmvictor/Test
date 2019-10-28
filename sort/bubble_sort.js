// 冒泡排序： 比较相邻两项，两两交换，大数在后，小数在前
// 优化： 从内循环减去外循环已跑过的轮数，避免不必要的循环
function bubbleSort(arr) {
    console.log(arr);
    const { length } = arr;
    for(let i = 0; i < length; i++) {
        console.log(`第${i + 1}轮循环`);
        for(let j = 0; j < length - 1 - i; j++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
            console.log(arr);
        }
    }
    return arr;
}

let arr = [2,1,0,6];
bubbleSort(arr);
