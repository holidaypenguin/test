var Orchestrator = require('orchestrator');
var Q = require('q');
var orchestrator = new Orchestrator();

var dd = 0;

orchestrator.add('hello', function(){
  // do stuff
  var deferred = Q.defer();
  console.log('this is hello task...\n');
  setTimeout(function(){

    console.log('this is hello task...+++++++++++\n');
    deferred.resolve();
  }, 2000);

  return deferred.promise;
});



orchestrator.add('default', function(){
  // do stuff
  console.log('this is default task...\n');
});


orchestrator.add('dep', ['hello'], function(){
  // do stuff
  console.log('this is default task...\n');
});

module.exports = orchestrator;