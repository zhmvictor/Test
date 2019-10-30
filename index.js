function Person(name) {
  this.name = name;
  this.sum = function() {
    console.log(this.name);
  }
}
Person.prototype.age = 10;

function Per() {
  Person.call(this, 'mmm');
  // this.name = 'ker';
}
Per.prototype = new Person();
var per1 = new Per();
console.log(per1.age);
console.log(per1.sum());
