var gulp = require('gulp');
var md = require('gulp-markdown');
var header = require('./lib/header'); // 在文件头部插入
var footer = require('gulp-footer'); // 在文件尾部插入
var fs = require('fs');
var cached = require('gulp-cached'); // 过滤有修改的文件
var remember = require('gulp-remember'); // 文件返回
// var minimist = require('minimist');
// var through = require('through2'); // pipe 回调

var mdSrc = "src/md/*.md";

gulp.task("css", function(){
    return gulp.src("./src/css/md.css")
        .pipe(gulp.dest("dist/md"));
});

gulp.task("build", function(){
    const head = fs.readFileSync("./src/html/head.html");
    const foot = fs.readFileSync("./src/html/foot.html");
    gulp.src("./src/md/*.md")
        .pipe(cached("build"))  // 只传递更改过的文件
        .pipe(md())
        .pipe(header(head))
        .pipe(footer(foot))
        // .pipe(remember("build"))     // 把所有的文件放回stream，在做文件合并的时候比较有用
        .pipe(gulp.dest("dist/md"))
    ;
});


gulp.task("watch", function(){
    var watcher = gulp.watch(mdSrc, ['build']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
})

gulp.task("default", ["css", "build", "watch"], function(){
  
});
