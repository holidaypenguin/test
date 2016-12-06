var cp = require('child_process');
var path = require('path');
var fs = require('fs');

var paths = module.paths;

for (var i = 0, len = paths.length; i < len; i++) {
    var gulpDir = path.join(paths[i], './gulp/bin/gulp.js');
    
    var isExist = fs.existsSync(gulpDir);
    if (isExist) {
        var gulpFile = path.join(__dirname,'./gulpfile.js');
        console.log(gulpDir);
        console.log(gulpFile);
        cp.fork(gulpDir,['--gulpfile=' + gulpFile]);
        break;
    }
}