

/**
 * 数组
 */
(function(){
  console.log('------------数组------------')
  const arr = ['red', 'green', 'blue'];
  var iterator  = arr[Symbol.iterator]();

  for(var v of arr) {
    console.log(v); // red green blue
  }

  for(var v of iterator) {
    console.log(v); // red green blue
  }
}());



/**
 * Set Map
 */
(function(){
  console.log('------------Set------------')
  var engines = new Set(["Gecko", "Trident", "Webkit", "Webkit"]);
  for (var e of engines) {
    console.log(e);
  }


  console.log('------------Map------------')
  var es6 = new Map();
  es6.set("edition", 6);
  es6.set("committee", "TC39");
  es6.set("standard", "ECMA-262");
  for (var e of es6) {
    console.log(e);
  }


  console.log('------------Map.entries------------')
  var arr = ['a', 'b', 'c'];
  for (var pair of arr.entries()) {
    console.log(pair);
  }
}());


/**
 * 类数组对象
 */
(function(){

  console.log('------------类数组对象 字符串------------')
  // 字符串
  var str = "hello";

  for (var s of str) {
    console.log(s); // h e l l o
  }

  console.log('------------类数组对象 NodeList对象------------')
  // DOM NodeList对象
  var paras = document.querySelectorAll("p");

  for (var p of paras) {
    p.classList.add("test");
  }

  console.log('------------类数组对象 arguments对象------------')
  // arguments对象
  function printArgs() {
    for (var x of arguments) {
      console.log(x);
    }
  }
  printArgs('a', 'b');

}());




