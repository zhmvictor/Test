function deepClone(source, map=new Map()) {
    if(typeof source === 'object'){
        let target = Array.isArray(source) ? [] : {};
        if(map.get(source)) {
            return map.get(source);
        }
        map.set(source, target);
        for(let key in source) {
            target[key] = deepClone(source[key], map);
        }
        return target;
    } else {
        return source;
    }
}

let oldObj = {
    name: 'hello',
    age: 1,
    array: [1,2,3],
};
oldObj.selfObj = oldObj;
let newObj = deepClone(oldObj);
console.log(newObj);