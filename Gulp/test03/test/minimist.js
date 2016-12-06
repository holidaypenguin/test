
var minimist = require('minimist');

var options = minimist(process.argv.slice(2), {
  default: {
    type: 'html',
    size: 32
  }
});

console.log(process.argv.slice(2))
console.log(options);

// node minimist.js a -b -c 123 -def -ghi=11 --dddd=111 --type js


