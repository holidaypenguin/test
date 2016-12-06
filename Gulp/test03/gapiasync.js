
'use strict';

var gulp = require('gulp');
var Q = require('q');


/**
 * 异步-callback
 */
gulp.task("async_callback", function(cb){
  setTimeout(function(){
    console.log("--------async_callback--------")
      cb(); // 完成 task
  }, 4000);
});

/**
 * 异步-promise
 */
gulp.task("async_promise", function(){
  var deferred = Q.defer();
  setTimeout(function(){
    console.log("--------async_promise--------")
    deferred.resolve();
  }, 1000);
  return deferred.promise;
});

/**
 * 异步-stream
 */
gulp.task("async_stream", function(){
  console.log("--------async_stream--------");
  var stream = gulp.src('src/js/*.js')
    .pipe(gulp.dest('build5'));
  return stream;
});

/**
 * 不等待
 */
gulp.task("async_not", function(){
  setTimeout(function(){
    console.log("--------async_not--------");
  }, 5000);
});

gulp.task("clear", ["async_callback", "async_promise", "async_stream", "async_not"], function(a, b){
  console.log(a, b);

  var deferred = Q.defer();
  setTimeout(function(){
    console.log("--------clear--------")
    deferred.resolve();
  }, 900);
  return deferred.promise;

});



gulp.task('default', ["clear"], function(){ // 一个包含任务列表的数组，这些任务会在你当前任务运行之前完成，确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。
  console.log('--------default--------')
  
});


gulp.task("runtask", ["async_callback"], function(){
  console.log("--------runtask--------");

  gulp.run("async_not");
  console.log("--------runtask----async_not----");
  
  gulp.run("async_promise");
  console.log("--------runtask----async_promise----");
});
