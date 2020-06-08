// Observer
// 初始化数据监听器
function observe(data) {
  // 验证传入的参数是否为对象
  if(!data && typeof data !== 'object') {
    return;
  }
  Object.keys(data).forEach(key => {
    defineReactive(data, key, data[key]);
  });
}
// 监听所有属性
function defineReactive(data, key, val) {
  observe(val); // 递归遍历所有的子属性
  let dep = new Dep(); // 创建订阅器
  Object.defineProperty(data, key, {
    enumerable: true,
    configurable: false,
    get() {
      if(Dep.target) { // 添加订阅者
        dep.addSub(Dep.target);
      }
      return val;
    },
    set(newVal) {
      val = newVal;
      dep.notify(); // 数据有变化，通知所有订阅者
    }
  });
}

Dep.target = null;

// 订阅器容器
function Dep() {
  this.subs = [];
}
// 订阅器原型方法
Dep.prototype.addSub = function(sub) {
  this.subs.push(sub);
};
Dep.prototype.notify = function() {
  this.subs.forEach(sub => {
    sub.update();
  });
};

// watcher 订阅者
function Watcher(vm, exp, cb) {
  this.vm = vm;
  this.exp = exp;
  this.cb = cb;
  this.value = this.get();
}

Watcher.prototype = {
  update() {
    this.run();
  },
  run() {
    let value = this.vm.data[this.exp];
    let oldVal = this.value;
    if()
  }
};
