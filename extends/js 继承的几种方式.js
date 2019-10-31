// 原型连继承： 本质重写原型对象，以新类型的实例代替
// 缺点：
// 1. 引用类型值的原型属性会被所有实例共享(因为同一个属性作为原型属性被所有实例继承)
// 2. 子类不能向父类的构造函数传参
// function Super() {
//   this.value = true;
//   this.colors = ['red', 'blue', 'green'];
// }
// Super.prototype.getColor = function() {
//   return this.colors;
// };
// function Sub() {}
// // Sub 继承 Super, Super 的实例作为 Sub 的原型
// Sub.prototype = new Super();
// Sub.prototype.constructor = Sub;

// =======================================================================
// 借用构造函数继承（伪类继承/经典继承）
// 思想: 在子类的构造函数中调用父类的构造函数
// 缺点： 
// 方法都定义在构造函数中，函数不能复用
// 因为每新建一个实例都会生成一个实例的新方法，
// 不仅方法不能复用，而且每个新方法都会开辟一块新的内存，内存消耗较大
// function Super() {
//   this.value = true;
//   this.colors = ['red', 'blue', 'green'];
// }
// function Sub() {
//   // 继承了 Super
//   Super.call(this);
//   // 或者
//   // Super.apply(this);
// }

// =======================================================================
// 组合继承（伪经典继承）
// 组合了原型链继承和构造函数继承
// 使用原型链继承原型属性和方法，实现了函数复用
// 使用构造函数继承实例的属性
// function Super(name) {
//   this.name = name;
//   this.colors = ['red', 'blue', 'green'];
// }
// Super.prototype.sayName = function() {
//   console.log(this.name);
// }
// function Sub(name, age) {
//   // 继承实例属性
//   Super.call(this, name);
//   this.age = age;
// }
// // 继承原型方法
// Sub.prototype = new Super();
// Sub.prototype.constructor = Sub;

// =====================================================
// 寄生组合继承
// 思想： 
// 通过构造函数继承父类实例属性
// 子类的原型继承自父类的原型
// 解决了两次调用父类构造函数的问题
// function Super(name) {
//   this.name = name;
//   this.colors = ['red', 'blue', 'green'];
// }
// Super.prototype.sayName = function() {
//   return this.name;
// }
// function Sub(name, age) {
//   Super.call(this, name);
//   this.age = age;
// }
// Sub.prototype = Object.create(Super.prototype);
// Sub.prototype.constructor = Sub;

// ======================================================
// 原型继承（委托继承）
// function object(o) {
//   function F() {};
//   F.prototype = o;
//   return new F();
// }

// ======================================================
// 寄生式继承
// 创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后再返回对象
function parasite(original) {
  let clone = Object.create(original);
  clone.sayHi = function() {
    console.log('hi');
  }
  return clone;
}

// 拷贝继承
// 利用深拷贝函数实现
// 写一个深拷贝函数
function isObject(obj) {
  return obj && (Object.prototype.toString.call(obj) === '[object Object]' || Object.prototype.toString.call(obj) === '[object Array]');
}
function deepClone(source, map=new WeakMap()) {
  if(isObject(source)) {
    if(map.has(source)) {
      return map.get(source);
    }
    let target = Array.isArray(source) ? [] : {};
    map.set(source, target);
    Reflect.ownKeys(source).forEach(key => {
      target[key] = deepClone(source[key], map);
    });
    return target;
  }
  return source;
}

// 测试用例
let sub1 = new Sub();
sub1.colors.push('black');
sub1.value = false;
let sub2 = new Sub();
console.log(sub1.value);       // false
console.log(sub2.value);       // true
console.log(sub1.colors);  // [ 'red', 'blue', 'green', 'black' ]
console.log(sub2.colors);  // [ 'red', 'blue', 'green']

