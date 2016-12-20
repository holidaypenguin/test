
/**
 * 普通对象添加Iterator接口
 */
(function(){
  console.log('--------普通对象添加Iterator接口--------')
  var obj = {
    data: [ 'hello', 'world' ],
    [Symbol.iterator]() {
      const self = this;
      var index = 0;
      return {
        next() {
          console.log("get next------------------")
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
    console.log(1)
  }
}());

/**
 * 对于类数组对象（存在数值键名和length属性），部署Iterator接口，有一个简便方法，就是Symbol.iterator方法直接引用数组的Iterator接口
 */
(function(){
  console.log('--------类数组对象添加Iterator接口--------')
  var iterable = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3,
    [Symbol.iterator]: Array.prototype[Symbol.iterator]
  };
  for (var item of iterable) {
    console.log(item); // 'a', 'b', 'c'
  }

  var next, it = iterable[Symbol.iterator]();
  do{
    next = it.next();
    console.log(next);
  }while(!next.done);

}());



/**
 * 字符串的Iterator接口
 */
(function(){
  console.log('--------字符串的Iterator接口--------');
  var someString = "hi";
  typeof someString[Symbol.iterator]
  // "function"
  
  var iterator = someString[Symbol.iterator]();
  iterator.next()  // { value: "h", done: false }
  iterator.next()  // { value: "i", done: false }
  iterator.next()  // { value: undefined, done: true }


}());

/**
 * 覆盖字符串的Iterator接口
 */
(function(){
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

  console.log([...str]) // ["bye"]
  console.log(str) // "hi"


}());