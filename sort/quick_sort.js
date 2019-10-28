// 快速排序：

function quickSort(array) {
    return quick(array, 0, array.length - 1);
}

function quick(array, left, right) {
    let index;
    if(array.length > 1) {
        index = partition(array, left, right); // 选择主元位置
        if(left < index - 1) {
            quick(array, left, index - 1);
        }
        if(right > index) {
            quick(array, index, right);
        }
    }
    return array;
}

function partition(array, left, right) {
    const pivot = array[Math.floor((right + left) / 2)];  // 选择中间位置的值作为主元
    let i = left;
    let j = right;
    while(i <= j) {
        while(array[i] < pivot) {
            i++;
        }
        while(array[j] > pivot) {
            j--;
        }
        if(i <= j) {
            [array[i], array[j]] = [array[j], array[i]];
            i++;
            j--;
        }
    }
    return i;
}

let arr = [5, 4, 3, 2, 6];
console.log(quickSort(arr));