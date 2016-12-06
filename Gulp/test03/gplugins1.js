var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cleanCss = require('gulp-clean-css');
var sourcemap = require('gulp-sourcemaps');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin');
var mergeStream = require('merge-stream');

// Lint JS
gulp.task('lint', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Concat & Minify JS
gulp.task('minijs', function(){
  return gulp.src('src/**/*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

// Minify less
gulp.task("miniless", function(){
  return gulp.src("src/**/*.less")
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(concat("all.css"))
    .pipe(gulp.dest("dist/css"))
    .pipe(rename('all.min.css'))
    .pipe(cleanCss({debug: true}, function(details){//兼容IE7及以下需设置compatibility属性
      console.log(details.stats.originalSize, details.stats.minifiedSize, details);
    }))
    .pipe(sourcemap.write("maps"))
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
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/html'));
});

// Minify image
gulp.task("miniimage", function(){
  gulp.src("src/images/*")
    .pipe(imagemin())
    .pipe(gulp.dest("dist/images"));
});

// Merge stream
function test1(){
  return gulp.src("src/js/test1.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist/t/js'));
}
function test2(){
  return gulp.src("src/js/test2.js")
    .pipe(uglify())
    .pipe(gulp.dest('dist/t/js'));
}
gulp.task("mergeStream", function(){
  var merged = mergeStream([test1(), test2()]);
  return merged.pipe(concat("all.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/t/js"));
});

gulp.task("tr", ["mergeStream"], function(){
  console.log("------------", arguments[0]);
});

// Watch Our Files
gulp.task('watchjs', function() {
  gulp.watch('src/**/*.js', ['lint', 'minijs']);
});

// Default
gulp.task('default', ['lint', 'minijs', 'watchjs']);


