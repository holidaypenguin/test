(function(){
	var ws = new WeakSet();
	// ws.add(1);
	// ws.add(Symbol());
	
var a = [[1,2], [3,4]];
var b = [3, 4];
var ws = new WeakSet(a);
// ws = new WeakSet(b);

var ws = new WeakSet();
var obj = {};
var foo = {};

ws.add(window);
ws.add(obj);

ws.has(window); // true
ws.has(foo);    // false

ws.delete(window);
ws.has(window);    // false

}());

(function(){
	
}());

(function(){
	
}());

(function(){
	
}());

(function(){
	
}());

(function(){
	
}());

(function(){
	
}());