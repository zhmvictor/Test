// es6 类与继承

// class ColorPoint extends Point {
// }

// // 等同于
// class ColorPoint extends Point {
//   constructor(...args) {
//     super(...args);
//   }
// }

// ========= 类 ==========
// 1. 类内部的普通属性定义在类实例对象上
// 2. 类内部的普通方法定义在类的原型对象上
// 3. 类内部的静态方法直接定义在类上，不会被实例继承，可以被子类继承
//    在子类的静态方法中可以用 super 关键字调用父类的静态方法
//    静态方法中的this指向类
// 4. 静态属性是类本身的属性，不是定义在实例对象上，不会被实例继承，可以被子类继承
// 5. new.target 返回构造函数，子类继承父类时，返回子类
//    如果构造函数不是通过new命令或Reflect.construct()调用的，new.target会返回undefined

// ========= 继承 =========
// 1. es6 继承使用 extends 关键字
// 2. 在子类的构造函数(constructor)中调用super方法，
//    super 代表父类的构造函数，返回子类的实例，将父类实例对象的属性和方法添加到this上
//    super() 相当于 A.prototype.constructor.call(this)
// 3. 在子类的方法中使用 super 关键字,
//    在普通方法中，super指向父类原型，可以调用父类原型的方法，但是方法内部的this指向子类实例
//    在静态方法中，super指向父类，可以调用父类的静态方法，方法内部的this指向子类
// 4. 作为对象，子类的原型是父类
//    B.__proto__ = A;
//    作为构造函数，子类的原型对象是父类的原型对象的实例
//    B.prototype.__propto__ = A.prototype;
//    子类实例的__proto__属性的__proto__属性，指向父类实例的__proto__竖向
//    b.__proto__.__proto__ = a.__proto__;

// ========= 问题 ==========
// 1. 为什么要在子类构造函数里调用 super 方法？
//    或者 为什么只有调用了 super 方法之后才能使用 this 关键字？
// 答：
//    因为 ES6 的继承机制就是 子类实例的构建基于父类实例，
//    只有调用 super 方法才能调用父类的实例，
//    然后将父类实例对象的属性和方法添加到 this 上，
//    然后再用子类的构造函数修改 this。这个 this 指向子类的实例。 
//    (super 代表父类的构造函数，super() 相当于 A.prototype.constructor.call(this)
//     只要参数传够了，父类构造函数里定义的方法和属性都会被子类继承过来
//    )
//    换句话说，子类的this也是继承自父类，然后在自己的构造函数中加以修改，变成自己的this。

//  2. 为什么不能在子类的普通方法中调用 super()?
class Animal {
  constructor(name='animal', age=0) {
    console.log(new.target);
    this.name = name;
    this.age = age;
    this.x = 1;
    this.print = function() {
      console.log(111);
    }
  }
  toString() {
    // return `name: ${this.name}, age: ${this.age}`;
    return this.x;
  }
  static staticAnimalMethods() {
    return 'hello';
  }
}

class Cat extends Animal {
  // constructor(color, ...args) {
  //   console.log('super可以不在第一行，但是必须在this之前');
  //   super(...args);
  //   console.log(this);
  //   this.color = color;
  //   this.x = 2;
  // }
  toString() {
    return super.toString();
    // return `${super.toString()}, color: ${this.color}`;
  }
  static staticCatMethods() {
    return super.staticAnimalMethods() + ',too';
  }
}

let animal = new Animal('animals', 10);      // [Function: Animal]
let cat1 = new Cat('white','damao', 5);  // super可以不在第一行，但是必须在this之前 
                                           // [Function: Cat]
                                           // Cat { name: 'damao', age: 5, x: 1, print: [Function] }
Animal.staticAnimalProp = 'animal';
Cat.staticCatProp = 'cat';
console.log(cat1.hasOwnProperty('name'));                     // true
console.log(cat1.hasOwnProperty('color'));                    // true
console.log(cat1.hasOwnProperty('toString'));                 // false
console.log(cat1.__proto__.hasOwnProperty('toString'));       // true   
console.log(cat1.__proto__.hasOwnProperty('staticMethods'));  // false
console.log(Animal.hasOwnProperty('staticAnimalMethods'));    // true
console.log(Cat.staticAnimalMethods());                       // hello  
console.log(Cat.staticCatMethods());                          // hello,too
console.log(Cat.staticAnimalProp);                            // aanimal
console.log(Cat.staticCatProp);                               // cat
console.log(cat1.toString());                                 // 2


// 混入
function mix(...mixins) {
  class Mix {
      constructor() {
          for(let mixin of mixins) {
              // 拷贝实例属性
              copyProperties(this, new mixin());
          }
      }
  }
  for(let mixin of mixins) {
      // 拷贝静态属性
      copyProperties(Mix, mixin);
      // 拷贝原型属性
      copyProperties(Mix.prototype, mixin.prototype);
  }
  return Mix;
}
function copyProperties(target, source) {
  for(let key of Reflect.ownKeys(source)) {
      if(key !== 'constructor'
      && key !== 'prototype'
      && key !== 'name'
      ) {
          let desc = Object.getOwnPropertyDescriptor(source, key);
          Object.defineProperty(target, key, desc);
      }
  }
}

class DistributedEdit extends mix(Animal) {
  constructor(...args) {
    super(...args);
  }
}

let dis = new DistributedEdit();
console.log(dis)

