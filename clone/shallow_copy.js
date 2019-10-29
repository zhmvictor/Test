// 实现 Object.assign() 函数
if(typeof Object.assign2 != 'function') {
  Object.defineProperty(Object, 'assign2', {
    value: function(target) {
      'user strict';
      if(target == null) {
        throw new TypeError('Cannot convert undefined or null to bbject');
      }
      let to = Object(target);
      for(let index = 1; index < arguments.length; index++) {
        let nextSource = arguments[index];
        if(nextSource != null) {
          for(let nextKey in nextSource) {
            if(Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

// 浅拷贝
function cloneShallow(source) {
  var target = {};
  for(var key in source) {
    if(Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = source[key];
    }
  }
  return target;
}

let myObject = {
  price: 'test',
  hasOwnProperty() {
      return false;
  }
};

function test() {
  for(let key in myObject) {
    if(myObject.hasOwnProperty(key)) {
      console.log(true);
    } else {
      console.log(false);
    }
  }
}
test();

