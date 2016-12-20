

	var [a, b, c] = [1, 2, 3]; // 从数组中提取值，按照对应位置，对变量赋值。这一过程是模式匹配
	let [foo, [[bar], baz]] = [1, [[2], 3]]; // 嵌套的解构 
	const [ , , third] = ["foo", "bar", "baz"]; // 解构赋值适用于var、let和const命令
	let [x, , y] = [1, 2, 3, 4]; // 不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组
	let [head, ...tail] = [1, 2, 3, 4];
	let [x1, y1, ...z1] = ['a']; // 如果解构不成功，变量的值就等于undefined
	let [foo1] = false; // 报错，因为等号右边是不可遍历的解构，不具备Iterator接口
	let [x2, y2, z2] = new Set(["a", "b", "c"]); // 对于Set结构，也可以使用数组的解构赋值
	[x2='aa', y2='b', z2, foo=f(), x1=x2] = ['a', undefined, null] // x2='a', y2='b', z2=null，foo=f()返回值，x1='a'


	let {bar, foo} = { foo: "aaa", bar: "bbb" }; // 对象也可以解构，且不用按照顺序
	var {foo1: baz} = { foo1: "aaa", bar: "bbb" }; // foo1是模式，baz被真正赋值。先找到同名属性，然后再赋给对应的变量
	let {bar} = {bar: "bbb"}; // 报错
	({bar, p:[x, {y}]}={bar: "bbb", p: ["Hello",{y: "World"}]}); // 成功。不加小括号会把大括号当做一个代码块导致报错，同时是个嵌套
	var {a0=0, a=1, b=2, c=3, d} = {a0: 1, a: undefined, b: null, }; //a0=1, a=1, b=null, c=3, d=undefined  对象的属性值严格等于undefined


	const [a, b, c, d, e] = 'hello'; // a=h, b=e .....
	let {length : len} = 'hello'; // len=5，字符串被转换成了一个类数组对象
	let {toString: s} = 123;
	s === Number.prototype.toString // true
	let {toString: s} = true;
	s === Boolean.prototype.toString // true
	// 数值和布尔值，则会先转为对象
	// 由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错

	function add([x, y]) // add([1, 2])
	function move({x = 0, y = 0} = {}) // move({x: 3, y: 8})  move({x: 3})
	function move({x, y} = { x: 0, y: 0 }) // move({x: 3, y: 8})  move({x: 3})  move()	

	// 可以使用圆括号的情况：赋值语句的非模式部分且不是声明语句
	[(b)] = [3]; // 正确
	({ p: (d) } = {}); // 正确
	[(parseInt.prop)] = [3]; // 正确


	[x, y] = [y, x]; // 交换变量的值
	var [a, b, c] = function() { return [1, 2, 3]; }(); // 函数返回多个参数并解构赋值
	function f({x, y, z}) { ... } // f({z: 3, y: 2, x: 1}) 函数参数定义
	var jsonData = {id: 42, status: 'OK'};
	let {id, status} = jsonData; // 提取JSON数据
	function move({x = 0, y = function(){}}) // 函数参数的默认值

(function(){
	var [a, b, c] = [1, 2, 3];
	console.log(a, b, c)

	let [foo, [[bar], baz]] = [1, [[2], 3]];
	console.log(foo, bar, baz);

	let [ , , third] = ["foo", "bar", "baz"];
	console.log(third);

	let [x, , y] = [1, 2, 3];
	console.log(x, y);

	let [head, ...tail] = [1, 2, 3, 4];
	console.log(head, tail);

	let [x1, y1, ...z1] = ['a'];
	console.log(x1, y1, z1);

	let [x2, y2] = [1, 2, 3];
	console.log(x2, y2);

	let [a3, [b3], d3] = [1, [2, 3], 4];
	console.log(a3, b3, d3);

	const [a4, [b4], d4, e4=5, f4=6] = [1, [2, 3], 4, undefined, null];
	console.log(a4, b4, d4, e4, f4);

	// 报错
	// let [foo1] = 1;
	// let [foo2] = false;
	// let [foo3] = NaN;
	// let [foo4] = undefined;
	// let [foo5] = null;
	// let [foo6] = {};
	 
	let [x3, y3, z3] = new Set(["a", "b", "c"])
	console.log(x3, y3, z3)
}());


(function(){
	function* fibs() {
		var a = 0;
		var b = 1;
		while (true) {
			yield a;
			[a, b] = [b, a + b];
		}
	}

	var [first, second, third, fourth, fifth, sixth] = fibs();

	console.log(first, third, fifth, sixth)
}());

(function(){
	function f(){
		console.log('aaa');
	}
	const [a4,  d4, e4=5, f4=6, g4 = f()] = [1, 4, undefined, null];
	console.log(a4, d4, e4, f4, g4);

	// let [x = y, y = 1] = [];     // ReferenceError
}());

(function(){
	var { foo, bar, baz, fos: foc} = { foo: "aaa", bar: "bbb", fos: "ccc"};
	console.log(foo, bar, foc);

	let fod, bas;
	({fod, bar: bas}= {fod: 1, bar: 2});

	console.log(fod, bas);
}());

(function(){

	var { p: [x, { y }] } = {
		p: [
			"Hello",
			{ y: "World" }
		]
	};
	console.log(x, y);

	let obj = {};
	let arr = [];
	({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
	console.log(obj, arr);

	var {x1, y1 = 5, x2 = 2, x3 = 3, x5} = {x1: 1, x2: undefined, x3: null};
	console.log(x1, y1, x2, x3, x5);

	// 报错
	// var {foo: {bar}} = {baz: 'baz'}
	var {foo: {bar}} = {foo: {bar: 'baz'}}
	console.log(bar)

	var x9;
	// {x} = {x: 1};
	({x} = {x: 1});

	({} = [true, false]);

	let { log, sin, cos } = Math;
	console.log(log, sin, cos);

	const [a, b, c, d, e] = 'hello';
	console.log(a,b,c,d,e);

	let {length : len} = 'hello';
	console.log(len);

	let {toString: s1} = 123;
	let {toString: s2} = true;
	console.log(s1 === Number.prototype.toString, s2 === Boolean.prototype.toString, s1, s2);


}());

(function(){
	function add([x, y]){
		return x + y;
	}

	console.log(add([1, 2])); // 3

	var b = [[1, 2], [3, 4]];
	b.map(([a, b]) => console.log(a + b));
	console.log(b);

	function move({x3 = 0, y3 = 0} = {}) {
		// return [x, y];
		console.log([x3, y3])
	}
	move({x3: 3, y3: 8}); // [3, 8]
	move({x3: 3}); // [3, 0]
	move({}); // [0, 0]
	move(); // [0, 0]

	function move2({x4, y4} = { x4: 0, y4: 0 }) {
		// return [x4, y4];
		console.log([x4, y4])
	}
	move2({x4: 3, y4: 8}); // [3, 8]
	move2({x4: 3}); // [3, undefined]
	move2({}); // [undefined, undefined]
	move2(); // [0, 0]

	[1, undefined, 3, null].map((x5 = 'yes') => console.log(x5));

	//可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。
	[(b)] = [3]; // 正确
	({ p: (d) } = {}); // 正确
	[(parseInt.prop)] = [3]; // 正确


}());

(function(){
	// 交换变量的值
	let x = 1, y = 2;
	[x, y] = [y, x];
	console.log(x, y);

	// 返回一个数组
	function example() {
	  return [1, 2, 3];
	}
	var [a, b, c] = example();
	console.log(a,b,c);

	// 返回一个对象
	function example1() {
	  return {
	    foo: 1,
	    bar: 2
	  };
	}
	var { foo, bar } = example1();
	console.log(foo,bar);

	// 参数是一组有次序的值
	function f1([x1, y1, z1]) {
		console.log(x1, y1, z1)
	}
	f1([1, 2, 3])

	// 参数是一组无次序的值
	function f2({x, y, z, a=0}) {
		console.log(x, y, z, a)
	}
	f2({z: 3, y: 2, x: 1})

	// 提取JSON数据
	var jsonData = {
		id: 42,
		status: "OK",
		data: [867, 5309]
	}
	let { id, status, data: number } = jsonData;
	console.log(id, status, number)

	var map = new Map();
	map.set('first', 'hello');
	map.set('second', 'world');

	for (let [key, value] of map) {
		console.log(key + " is " + value);
	}
	// 获取键名
	for (let [key] of map) {
	 	console.log(key)
	}

	// 获取键值
	for (let [,value] of map) {
		console.log(value)
	}
}());