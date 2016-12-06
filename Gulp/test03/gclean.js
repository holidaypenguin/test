var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
  return gulp.src(['build1', "build2", "build3", 'build4', 'build5', 'src/js.js', "src/js.min.js", "dist", "live", "htmlreplace"])
    .pipe(clean());
});


// Default
gulp.task('default', ['clean']);


