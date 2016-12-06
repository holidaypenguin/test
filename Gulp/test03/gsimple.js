'use strict';

var gulp = require('gulp');

gulp.task("default", function(){
  
});

gulp.task('scripts', ['params'], function() {
  
});

var minimist = require('minimist');
gulp.task('params', function(){
  // console.log(gulp.env)
var options = minimist(process.argv.slice(2), {
  default: {
    type: 'html'
  }
});

  console.log(process.argv.slice(2))
  console.log(options);
});