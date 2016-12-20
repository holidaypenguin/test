
var config = {
  staticModule: "htmlreplace",
};

var gulp = require('gulp'),
  htmlreplace = require('gulp-html-replace'),
  less = require('gulp-less'),
  rename = require('gulp-rename');

gulp.task('js', function(){
  return gulp.src('src/js/test1.js')
    .pipe(gulp.dest('dist/'+config.staticModule+'/js'));
});

gulp.task("less", function(){
  return gulp.src("src/css/l1.less")
    .pipe(less())
    .pipe(gulp.dest('dist/'+config.staticModule+'/css'));
});

// 简单替换。替换为一行js、一行css
gulp.task("single", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js: 'all.js',
      css: 'all.css'
    }))
    .pipe(gulp.dest('dist/'));
});

// 数组替换。替换为数组的个数
gulp.task("array", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js: ['js/monster.js', 'js/hero.js', 'a.css'],
      css: 'all.css'
    }))
    .pipe(gulp.dest('dist/'));
});

// 高级替换
gulp.task("advanced", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js_advanced: {
        src: ['data-main.js', 'require-src.js'],
        tpl: '<script data-main="%s" src="%s"></script>'
      }
    }))
    .pipe(gulp.dest('dist/'));
});

// 扩展替换1
gulp.task("extended1", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js: {
        src: '.',
        tpl: '<script src="%s/%f.js"></script>'
      },
      css: 'all.css',
      js_advanced: {
        src: null,
        tpl: '<script src="%f.js"></script>'
      },
    }, {
      keepUnassigned: false,
      keepBlockTags: true,
      resolvePaths: true
    }))
    .pipe(gulp.dest('dist/'));
});

// 扩展替换2。
gulp.task("extended2", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js: {
        src: 'dir',
        tpl: '<script src="%s/%f.js"></script>'
      },
      css: {
        src: "css",
        tpl: '<style src="%s/%f.css"></style>'
      }
    }, {
      keepUnassigned: false,
      keepBlockTags: true,
      resolvePaths: false
    }))
    .pipe(gulp.dest('dist/'));
});

// 流替换。
gulp.task("stream", ["js", "less"], function(){
  return gulp.src("src/html/index.html")
    .pipe(htmlreplace({
      js: {
        src: 'dir',
        tpl: '<script src="%s/%f.js"></script>'
      },
      css: {
        src: gulp.src("src/css/l1.less").pipe(less()),
        tpl: '<style>%s</style>'
      }
    }))
    .pipe(gulp.dest('dist/'));
});