module.exports = runTests;

var fs = require('fs');
var findit = require('findit');
var mocha = require('mocha');
var expect = require('chai').expect;

function runTests(args) {
  var files = findTestFiles(args);
  var suite = createTests(files);
  var runner = new mocha.Runner(suite);
  var reporter = new mocha.reporters.List(runner);
  runner.run();
}

// args can contain both file and directory names
function findTestFiles(args) {
  var files = [];
  args.forEach(function(arg) {
    var found = findit.sync(arg);
    found = found.filter(function(file) { return file.substr(-5) === '.test' });
    found = found.filter(function(file) { return fs.statSync(file).isFile(); });
    files = files.concat(found);
  });
  return files;
}

function createTests(files) {
  var suite = new mocha.Suite('', new mocha.Context);

  files.forEach(function(file) {
    var test = new mocha.Test(file, function(done) {
      runTestFile(file, done);
    });
    
    suite.addTest(test);
  });

  return suite;
}

function runTestFile(filename, done) {
  var test = fs.readFileSync(filename, 'utf8').replace(/\r\n/g,'\n');

  var match = /^(.*)\n<<<\n([\s\S]*)>>>\n([\s\S]*)$/.exec(test);
  var command = match[1];
  var input   = match[2];
  var output  = match[3];

  var dir = require('path').dirname(filename);
  
  require('child_process').exec(command, { cwd: dir },
    function (error, stdout, stderr) {
      if (error !== null) {
        done(error);
      } else {
        expect(stdout).to.eql(output);
        done();
      }
    }
  ).stdin.end(input);
};
