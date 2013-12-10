var a = require('assert'),
    comparator = require('./index');

//no args invalid
a.throws(function() {comparator.compare()}, 'OK');

//missing callback
a.throws(function() {comparator.compare('./file1', './file1')});

//bad algo
a.throws(function() {comparator.compare('./file1', './file1', 'aaa', function(){})}, /Digest method not supported/);

a.throws(function() {comparator.compare('./file1', './file1', 'sha1', 'badcallback');}, /Callback required/);

a.throws(function() {comparator.compare('./file1', './file1', 'hhh', 'bbb', 'ccc')}, /Invalid args length: 5/);

//check true for comparing same file
comparator.compare('./file1', './file1', function(result) {a.ok(result);});

//check false for comparing same file
comparator.compare('./file1', './file2', function(result) { a.ok(!result);});

'<srv'
console.log('Passed ' + module.id)
'srv>'
