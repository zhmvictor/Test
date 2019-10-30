function Super(){
  this.value = 1;
}
Super.prototype.colors = ['red','blue','green'];
function Sub(){};

Sub.prototype = Object.create(Super.prototype);
Sub.prototype.constructor = Sub;
let sub = new Sub();
sub.colors.push('black');
console.log(sub.colors);
let sub1 = new Sub();
console.log(sub1.colors);