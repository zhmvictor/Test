// 归并排序：自顶向下
// 1.将一个大数组拆分成多个小数组，直到每个小数组都只有一个元素
// 2.将小数组归并成大数组，直到最后只有一个归并排序完成的大数组

// 拆分数组函数
function mergeSort(array) {
    if(array.length > 1) { // 递归结束的条件
        const { length } = array;
        const middle = Math.floor(length / 2);
        const left = mergeSort(array.slice(0, middle));
        const right = mergeSort(array.slice(middle, length));
        array = merge(left, right);
    }
    return array;
}

// 归并函数
function merge(left, right) {
    let i = 0, 
    j = 0;
    const result = [];
    while(i < left.length && j < right.length) {
        result.push(
            left[i] < right[j] ? left[i++] : right[j++]
        );
    }
    return result.concat(
        i < left.length ? left.slice(i) : right.slice(j)
    );
}

let arr = [5, 4, 3, 2, 6];
console.log(mergeSort(arr));