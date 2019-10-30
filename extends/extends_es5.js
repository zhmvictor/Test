// 构造函数的继承分两步
// 1. 在子类的构造函数中调用父类的构造函数
// 2. 让子类的原型指向父类的原型

function Super() {}

function Sub(value) {
  Super.call(this); // 调用父类的构造函数
  this.prop = value;
}

// 子类继承父类的原型 （子类整体继承父类）
// 将子类的原型指向父类的原型时,子类的原型的构造函数会变成父类
// 所以需要第二步重新指定子类的原型的构造函数
Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;

// 子类单独继承父类某个方法
// 子类单独继承父类某个方法时不会改变子类原型的构造函数的指向
// 所以不需要重新指定构造函数
Sub.prototype.methods = function() {
  Super.prototype.methods.call(this);
}

// 如果需要子类具有父类实例的方法
Sub.prototype = new Super();

//=================== 继承举例 =============================
function Shape() {
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function(x, y) {
  this.x = x;
  this.y = y;
  console.log('Shape moved');
}
Shape.prototype.print = function() {
  console.log('print');
}
function Rectangle() {
  Shape.call(this);
}
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

// Rectangle.prototype.print = function() {
//   Shape.prototype.print.call(this);
// }

let rect = new Rectangle();
console.log(rect instanceof Rectangle);
console.log(rect instanceof Shape);
console.log(rect.x);
console.log(rect.y);
rect.move(1,2);  // 子类单独继承print方法时，调用move会报错
rect.print();

// ============== 多重继承 ===================
// js 不提供多重继承，即不允许一个对象同时继承多个对象，可以变通实现

function M1() {
  this.hello = 'hello';
}
function M2() {
  this.world = 'world';
}
function S() {
  M1.call(this);
  M2.call(this);
}
S.prototype = Object.create(M1.prototype);
Object.assign(S.prototype, M2.prototype);
S.prototype.constructor = S;
let s = new S();
// =================================================


