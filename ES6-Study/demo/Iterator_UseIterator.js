/**
 * 调用Iterator的场合
 */

/**
 * 结构解析
 */
(function(){

  let set = new Set().add('a').add('b').add('c');
  let [x,y] = set;
  // x='a'; y='b'
  let [first, ...rest] = set;
  // first='a'; rest=['b','c']
  
}());


/**
 * 扩展运算符
 */
(function(){
  let arr = ['b', 'c'];
  ['a', ...arr, 'd']
  // ['a', 'b', 'c', 'd']
}());


/**
 * yield*
 */
(function(){
  let generator = function* () {
    yield 1;
    yield* [2,3,4];
    yield 5;
  };

  var iterator = generator();

  iterator.next() // { value: 1, done: false } 
  iterator.next() // { value: 5, done: false }
  iterator.next() // { value: undefined, done: true }
}());


/**
 * 其他场合
 */
(function(){
  // for...of
  // Array.from()
  // Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
  // Promise.all()
  // Promise.race()
}());


/**
 * 
 */
(function(){

}());