
/**
 * 自定义Interator接口
 */
(function(){
  

  var it = makeIterator(['a']);
  console.log(it.next()); // { value: "a", done: false }
  console.log(it.next()); // { value: undefined, done: true }

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



}());



