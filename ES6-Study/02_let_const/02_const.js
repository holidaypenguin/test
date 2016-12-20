  'use strict';
  const PI = 3.1415; // const一旦声明变量，就必须立即初始化
  PI = 3; // 报错，如果是常规模式对常量赋值，是无效的
  console.log(PI) // 3.1415
  const foo; // 报错，常规模式不报错

  const bar = {};
  bar.prop = 123; // const命令只是保证变量名指向的地址不变，并不保证该地址的数据不变

  const baz = Object.freeze({}); // 冻结对象
  baz.prop = 123; // 报错，常规模式不报错

(function(){

}());