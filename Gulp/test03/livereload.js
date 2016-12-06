'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({DEBUG: true, pattern: ["gulp-*"]});

gulp.task("less", function(){
  return gulp.src("src/less/head.less")
    .pipe(plugins.less())
    .pipe(gulp.dest("live"))
    .pipe(plugins.livereload());
});

gulp.task("js", function(){
  return gulp.src("src/js/test1.js")
    .pipe(gulp.dest("live"))
    .pipe(plugins.livereload());
});

gulp.task("html", function(){
  return gulp.src("src/html/a.html")
    .pipe(gulp.dest("live"))
    .pipe(plugins.livereload());
});

gulp.task("watch", function(){
  plugins.livereload.listen();
  gulp.watch("src/less/head.less", ["less"]);
  gulp.watch("src/html/a.html", ["html"]);
  gulp.watch("src/js/test1.js", ["js"]);
});

gulp.task("default", ["less", "js", "html", "watch"], function(){

})