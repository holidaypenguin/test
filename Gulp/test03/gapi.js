
'use strict';

var gulp = require('gulp');

var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');

//////////// gulp.task(name[, deps], fn) deps：依赖的任务
gulp.task("js", function(){ // 定义一个使用 Orchestrator 实现的任务（task）
  console.log(arguments);
  //gulp.src(globs[, options])
  gulp.src('src/js/*.js', { // 输出（Emits）符合所提供的匹配模式（glob）或者匹配模式的数组（array of globs）的文件。将返回一个 Vinyl files 的 stream 它可以被 piped 到别的插件中。
    buffer: true, // 默认值： true。设置为 false，那么将会以 stream 方式返回 file.contents 而不是文件 buffer 的形式。
    read: true, // 默认值： true。设置为 false， 那么 file.contents 会返回空值（null），也就是并不会去读取文件。
    base: "src" // 将会加在 glob 之前
  })
  ;

  //////////// gulp.dest(path[, options]) options.cwd   options.mode：指定被创建文件夹的权限，默认0777。
  gulp.src("src/js/*.js")
    .pipe(gulp.dest("build1")) // 能被 pipe 进来，并且将会写文件。并且重新输出（emits）所有数据，因此你可以将它 pipe 到多个文件夹。如果某文件夹不存在，将会自动创建它。
    .pipe(gulp.dest("build2")); // 保存至多个文件夹

  gulp.src('src/js/*.js') // 匹配 'src/js/test1.js' 并且将 `base` 解析为 `src/js/`
    .pipe(gulp.dest('build3'));  // 写入 'build3/test1.js'

  //////////// gulp.src('js/*.js', { base: 'src' })
  gulp.src('src/js/*.js', { base: 'src' })
    .pipe(gulp.dest('build4'))  // 写入 'build4/js/test1.js'
    .pipe(uglify());
  console.log('--------js--------')
});


gulp.task("watch", function(){
  var watcher = gulp.watch('src/js/*.js', ['js']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });

  gulp.watch('src/js/c/test4.js', function(event){ // 无法执行后续任务
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});

gulp.task('default', ["js", "watch"], function(){ // 一个包含任务列表的数组，这些任务会在你当前任务运行之前完成，确保你所依赖的任务列表中的任务都使用了正确的异步执行方式：使用一个 callback，或者返回一个 promise 或 stream。
  console.log('--------default--------')
  // gulp --dd aa  命令行参数传值
  console.log(gulp.env);   // { _: [], dd: 'aa' }

});

