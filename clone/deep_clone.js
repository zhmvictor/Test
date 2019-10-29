// 基础版
function cloneDeep1(source) {
    let target = {};
    for(let key in source) {
        if(typeof key === 'object') {
            target[key] = cloneDeep1(source[key]);
        } else {
            target[key] = source[key];
        }
    }
    return target;
}
// 考虑数组并且优化版本
function cloneDeep2(source) {
    if(source && typeof source === 'object') {
        let target = Array.isArray(source) ? [] : {};
        for(let key in source) {
            target[key] = cloneDeep2(source[key]);
        }
        return target;
    }
    // 非对象返回自身
    return source;
}

// 考虑数组以及循环引用版本
function cloneDeep3(source, map=new WeakMap()) {
    if(source && typeof source === 'object'){
        let target = Array.isArray(source) ? [] : {};
        if(map.has(source)) {
            return map.get(source);
        }
        map.set(source, target);
        for(let key in source) {
            target[key] = cloneDeep3(source[key], map);
        }
        return target;
    }
    return source;
}

//==========================================================================
// 判断详细类型的函数
// 考虑数组兼容、循环引用、Symbol、String、Number、Boolean、Date、Error
function isObject(obj) {
    return obj && (Object.prototype.toString.call(obj) === '[object Object]' || 
    Object.prototype.toString.call(obj) === '[object Array]');
}
// 考虑数组兼容、循环引用、Symbol
function cloneDeep4(source, map = new WeakMap()) {
    // null、undefined 自动返回
    if(isObject(source)) {
        // 解决循环引用
        if(map.has(source)) {
            return map.get(source);
        }
        // 解决数组兼容
        let target = Array.isArray(source) ? [] : {};
        map.set(source, target);
        //  Reflect.ownKeys() 获取对象所有属性，包含 Symbol 类型
        Reflect.ownKeys(source).forEach(key => {
            target[key] = cloneDeep4(source[key], map);
        });
        return target;
    }
    return source;
}
// forEach不能深拷贝原型链，如果需要拷贝原型链
function cloneDeep5(source, map = new WeakMap()) {
    if(isObject(source)) {
        // 解决循环引用
        if(map.has(source)) {
            return map.get(source);
        }
        // 解决数组兼容
        let target = Array.isArray(source) ? [] : {};
        map.set(source, target);
        // 获取Symbol类型属性
        let symKeys = Object.getOwnPropertySymbols(source);
        if(symKeys && symKeys.length) {
            symKeys.forEach(symkey => {
                target[symkey] = cloneDeep5(source[symkey], map);
            });
        }
        // 获取普通类型属性，包括原型链
        for(let key in source) {
            target[key] = cloneDeep5(source[key], map);
        }
        return target;
    }
    return source;
}

let a = {
    arr: [1,2,[3,4]],
    data: new Date(),  // 日期类型
    str: new String('abc'), // String()
    num: new Number(10),
    bool: new Boolean(''),
    err: new Error('error'),
    fun: () => {},
};
// Symbol类型
let sym1 = Symbol("a"); // 创建新的symbol类型
let sym2 = Symbol.for("b"); // 从全局的symbol注册?表设置和取得symbol
a[sym1] = "localSymbol";
a[sym2] = "globalSymbol";
a.circleObj = a;

var b = cloneDeep4(a);
console.log(a);
console.log(b);




