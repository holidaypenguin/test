var gulp = require('gulp');
// var md = require('gulp-format-md');
var md = require('gulp-markdown-it');

gulp.task("default", function(){
  return gulp.src("./src/md/test2.md")
    // .pipe(md({newline: false}))
    .pipe(md({msg: 'More Coffee!'}))
    .pipe(gulp.dest("dist/md"));
});
