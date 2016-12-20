/**
 * 通过遍历器实现指针结构
 */
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
        return {done: done, value: value}
      } else {
        return {done: true}
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

}());