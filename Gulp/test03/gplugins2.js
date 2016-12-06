'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({DEBUG: true, pattern: ["gulp-*", "minimist", "merge-stream"]});

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minijs', function(){
  return gulp.src('src/**/*.js')
    .pipe(plugins.concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(plugins.rename('all.min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify less
gulp.task("miniless", function(){
  return gulp.src("src/**/*.less")
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.less())
    .pipe(plugins.concat("all.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(plugins.rename('all.min.css'))
    .pipe(plugins.cleanCss({debug: true}, function(details){//兼容IE7及以下需设置compatibility属性
      console.log(details.stats.originalSize, details.stats.minifiedSize, details);
    }))
    .pipe(plugins.sourcemaps.write("maps"))
    .pipe(gulp.dest("dist/css"));
});

// Minify html
gulp.task('minihtml', function () {
  var options = {
    removeComments: true,//清除HTML注释
    collapseWhitespace: true,//压缩HTML
    collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
    minifyJS: true,//压缩页面JS
    minifyCSS: true//压缩页面CSS
  };
  gulp.src('src/html/*.html')
    .pipe(plugins.htmlmin(options))
    .pipe(gulp.dest('dist/html'));
});

// Minify image
gulp.task("miniimage", function(){
  gulp.src("src/images/*")
    .pipe(plugins.imagemin())
    .pipe(gulp.dest("dist/images"));
});

// Merge stream
function test1(){
  return gulp.src("src/js/test1.js")
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/t/js'));
}
function test2(){
  return gulp.src("src/js/test2.js")
    .pipe(plugins.uglify())
    .pipe(gulp.dest('dist/t/js'));
}
gulp.task("mergeStream", function(){
  var merged = plugins.mergeStream([test1(), test2()]);
  merged.pipe(plugins.concat("all.js"))
    .pipe(plugins.uglify())
    .pipe(gulp.dest("dist/t/js"));
});

// Watch Our Files
gulp.task('watchjs', function() {
  gulp.watch('src/**/*.js', ['lint', 'minijs']);
});

// Default
gulp.task('default', ['lint', 'minijs', 'watchjs']);



