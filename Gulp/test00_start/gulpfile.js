'use strict';

//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');
 

gulp.task('1Task', function(){
  console.log('------1Task-------')
});

 
gulp.task('default',['1Task']); 
 