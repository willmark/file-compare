exports.tests = function(a) {
    comparator = require("./index");
    a.throws(function() {
        comparator.compare();
    }, "OK");
    a.throws(function() {
        comparator.compare("./file1", "./file1");
    });
    a.throws(function() {
        comparator.compare("./file1", "./file1", "aaa", function() {});
    }, /Digest method not supported/);
    a.throws(function() {
        comparator.compare("./file1", "./file1", "sha1", "badcallback");
    }, /Callback required/);
    a.throws(function() {
        comparator.compare("./file1", "./file1", "hhh", "bbb", "ccc");
    }, /Invalid args length: 5/);
    comparator.compare("./file1", "./file1", function(result) {
        a.ok(result);
    });
    comparator.compare("./file1", "./file2", function(result) {
        a.ok(!result);
    });
    console.log("Passed " + module.id);
    a.done();
};