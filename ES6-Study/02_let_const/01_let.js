console.log(foo); //报错,不存在变量提升代码出现暂时性死区
let a = 2;
{ // 块级作用域
  let a = 3; //在代码块中重复声明不报错
  let b = 4;
  console.log(a); // 3。使用块级作用域内值
}
let a = 5; var a = 5; // 不允许重复声明
console.log(a); // 使用
console.log(b); // 报错,
{{{{{let insane = 'Hello World'}}}}}; // 块级作用域的任意嵌套



// 在for循环中的应用
(function (argument) {
  var a = [];
  for (let i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[6](); // 6 
}());

