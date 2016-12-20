(function(){
// var it = makeIterator(['a', 'b']);
var it = makeIterator([]);
var next;
do{
  next = it.next();
  console.log(next);
}while(!next.done);

// console.log(it.next()) // { value: "a", done: false }
// console.log(it.next()) // { value: "b", done: false }
// console.log(it.next()) // { value: undefined, done: true }

function makeIterator(array){
  var nextIndex = 0;
  return {
    next: function(){
      return nextIndex < array.length ?
        {value: array[nextIndex++], done: false} :
        {value: undefined, done: true};
    }
  }
}

console.log(Symbol);
console.log(Symbol.iterator);

}());

(function(){
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

console.log(iter.next()) // { value: 'a', done: false }
console.log(iter.next()) // { value: 'b', done: false }
console.log(iter.next()) // { value: 'c', done: false }
console.log(iter.next()) // { value: undefined, done: true }
}());

(function(){
class RangeIterator {
  constructor(start, stop) {
    this.value = start;
    this.stop = stop;
  }

  [Symbol.iterator]() { return this; }

  next() {
    var value = this.value;
    if (value < this.stop) {
      this.value++;
      return {done: false, value: value};
    } else {
      return {done: true, value: undefined};
    }
  }
}

function range(start, stop) {
  return new RangeIterator(start, stop);
}
console.log(range(0, 3).next())
for (var value of range(0, 3)) {
  console.log(value);
}
}());

(function(){
function Obj(value){
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){

  var iterator = {
    next: next
  };

  var current = this;

  function next(){
    if (current){
      var value = current.value;
      var done = current === null;
      current = current.next;
      return {
        done: done,
        value: value
      }
    } else {
      return {
        done: true
      }
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(5);
var four = new Obj(4);

one.next = two;
two.next = three;
three.next = four;

for (var i of one){
  console.log(i)
}
}());

(function(){
var obj = {};

obj[Symbol.iterator] = () => 1;

// [...obj] // TypeError: [] is not a function
}());


(function(){
var myIterable = {};

myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]

// 或者采用下面的简洁写法

let obj = {
  * [Symbol.iterator]() {
    yield 'hello';
    yield 'world';
  }
};

for (let x of obj) {
  console.log(x);
}
}());


(function(){
for (let x of 'a\uD83D\uDC0A') {
  console.log(x);
}

let arrayLike = { length: 2, 0: 'a', 1: 'b' };
console.log(Array.from(arrayLike));
}());


(function(){
  
}());














默认的Iterator接口部署在数据结构的Symbol.iterator属性中
ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构
let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();

iter.next() // { value: 'a', done: false }
iter.next() // { value: 'b', done: false }
iter.next() // { value: 'c', done: false }
iter.next() // { value: undefined, done: true }

对象（Object）之所以没有默认部署Iterator接口，是因为对象的哪个属性先遍历，哪个属性后遍历是不确定的

// 下面是通过遍历器实现指针结构的例子。
function Obj(value){
  this.value = value;
  this.next = null;
}

Obj.prototype[Symbol.iterator] = function(){

  var iterator = {
    next: next
  };

  var current = this;

  function next(){
    if (current){
      var value = current.value;
      var done = current === null;
      current = current.next;
      return {
        done: done,
        value: value
      }
    } else {
      return {
        done: true
      }
    }
  }
  return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);

one.next = two;
two.next = three;

for (var i of one){
  console.log(i)
}
// 1
// 2
// 3



// 为对象添加Iterator接口的例子
let obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    let index = 0;
    return {
      next() {
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      }
    };
  }
};

// 对于类似数组的对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口
let iterable = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator]
};
for (let item of iterable) {
  console.log(item); // 'a', 'b', 'c'
}
// 普通对象部署数组的Symbol.iterator方法，并无效果

// 有了Iterator 可以使用 for...of、 do while 遍历。
var next;
do{
  next = iterable.next();
  console.log(next.value);
}while(!next.done);



// 调用Iterator接口的场合
// 解构赋值
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;
// x='a'; y='b'
let [first, ...rest] = set;
// first='a'; rest=['b','c']

// 扩展运算符
let arr = ['b', 'c'];
['a', ...arr, 'd']
// ['a', 'b', 'c', 'd']

// yield*
let generator = function* () {
  yield 1;
  yield* [2,3,4];
  yield 5;
};

var iterator = generator();

iterator.next() // { value: 1, done: false } 
iterator.next() // { value: 5, done: false }
iterator.next() // { value: undefined, done: true }

// 其他场合
// 由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。
for...of
Array.from()
Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
Promise.all()
Promise.race()

// 字符串的Iterator接口
// 字符串是一个类似数组的对象，也原生具有Iterator接口。
var someString = "hi";
typeof someString[Symbol.iterator]
// "function"

var iterator = someString[Symbol.iterator]();

iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }

// 可以覆盖原生的Symbol.iterator方法，达到修改遍历器行为的目的。
var str = new String("hi"); 

str[Symbol.iterator] = function() {
  return {
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
    _first: true
  };
};

[...str] // ["bye"]
str // "hi"


// 遍历器对象的return()，throw()
// 自己写遍历器对象生成函数，那么next方法是必须部署的，return方法和throw方法是否部署是可选的。
var obj = {
  data: [ 'hello', 'world' ],
  [Symbol.iterator]() {
    const self = this;
    var index = 0;
    return {
      next() {
        console.log("get nex1t------------------")
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false
          };
        } else {
          return { value: undefined, done: true };
        }
      },
      return() {
        console.log('return --------------')
        return { done: true };
      },
      throw(){
        console.log('throw --------------')
        return { done: true };
      }
    };
  }
};


for (var o of obj) {
  var a;
  // a.length;
  console.log(o);
  // break;
  // continue;
}






// for...of
// 一个数据结构只要部署了Symbol.iterator属性，就被视为具有iterator接口，就可以用for...of循环遍历它的成员
// for...of循环可以使用的范围包括数组、Set和Map结构、某些类数组对象（比如arguments对象、DOM NodeList对象）、Generator对象，以及字符串
// 数组
const arr = ['red', 'green', 'blue'];
let iterator  = arr[Symbol.iterator]();

for(let v of arr) {
  console.log(v); // red green blue
}

for(let v of iterator) {
  console.log(v); // red green blue
}
// 这两段是等价的
// for...of循环可以代替数组实例的forEach方法
// for...in循环，只能获得对象的键名，不能直接获取键值。
// for...of循环，获取数组的索引，可以借助数组实例的entries方法和keys方法

// Set和Map结构
// Set和Map结构也原生具有Iterator接口，可以直接使用for...of循环
// 遍历的顺序是按照各个成员被添加进数据结构的顺序。Set结构遍历时，返回的是一个值，而Map结构遍历时，返回的是一个数组，该数组的两个成员分别为当前Map成员的键名和键值

// 也可以调用数组、Set、Map的遍历器生成函数，对其结果进行遍历



// 类数组对象
// 字符串
let str = "hello";

for (let s of str) {
  console.log(s); // h e l l o
}

// DOM NodeList对象
let paras = document.querySelectorAll("p");

for (let p of paras) {
  p.classList.add("test");
}

// arguments对象
function printArgs() {
  for (let x of arguments) {
    console.log(x);
  }
}
printArgs('a', 'b');
// 'a'
// 'b'



