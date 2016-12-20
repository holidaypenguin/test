



Set结构的实例有以下属性:
Set.prototype.constructor：构造函数，默认就是Set函数。
Set.prototype.size：返回Set实例的成员总数。

Set实例的四个操作方法:
add(value)：添加某个值，返回Set结构本身。
delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
has(value)：返回一个布尔值，表示该值是否为Set的成员。
clear()：清除所有成员，没有返回值

Set结构的实例有四个遍历方法:
keys()：返回一个键名的遍历器
values()：返回一个键值的遍历器
entries()：返回一个键值对的遍历器
forEach()：使用回调函数遍历每个成员




var ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set

var ws = new WeakSet([[1,2], [3,4]]);
// WeakSet可以接受一个数组或类似数组的对象作为参数，参数的成员成为WeakSet的成员

new WeakSet([3,4]);
// Uncaught TypeError: Invalid value used in weak set(…)

WeakSet结构有以下三个方法。
WeakSet.prototype.add(value)：向WeakSet实例添加一个新成员。
WeakSet.prototype.delete(value)：清除WeakSet实例的指定成员。
WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在

没有size方法，且不能被遍历





Map结构的实例有以下属性:
Map.prototype.constructor：构造函数，默认就是Map函数。
Map.prototype.size：返回Map实例的成员总数。

Set实例的四个操作方法:
set(key, value)：设置key所对应的键值，返回Map结构本身。果key已经有值，则键值会被更新
get(key)：读取key对应的键值，如果找不到key，返回undefined
has(key)：返回一个布尔值，表示某个键是否在Map数据结构中。
delete(key)：删除某个值，返回一个布尔值，表示删除是否成功。
clear()：清除所有成员，没有返回值

Map原生提供三个遍历器生成函数和一个遍历方法:
keys()：返回键名的遍历器。
values()：返回键值的遍历器。
entries()：返回所有成员的遍历器。
forEach()：遍历Map的所有成员。




// 键名是对象的弱引用，所以其所对应的对象可能会被自动回收。
var map = new WeakMap()
map.set(1, 2)
// TypeError: 1 is not an object!

var wm = new WeakMap();
var element = document.querySelector(".element");

wm.set(element, "Original");
wm.get(element) // "Original"

element.parentNode.removeChild(element);
element = null;
wm.get(element) // undefined

WeakMap只有四个方法可用：get()、set()、has()、delete()
没有size属性，且不能遍历


var it = makeIterator(['a', 'b']);

it.next() // { value: "a", done: false }
it.next() // { value: "b", done: false }
it.next() // { value: undefined, done: true }

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