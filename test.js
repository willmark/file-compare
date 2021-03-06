

exports.noArgsFails = function(a) {
    var comparator = require("./index");
    a.expect(1);
    a.throws(function() {
        comparator.compare();
    }, "OK");
    a.done();
};

exports.noCallbackFails = function(a) {
    var comparator = require("./index");
    a.expect(1);
    a.throws(function() {
        comparator.compare("./file1", "./file1");
    });
    a.done();
};

exports.badDigestFails = function(a) {
    var comparator = require("./index");
    a.expect(1);
    a.throws(function() {
        comparator.compare("./file1", "./file1", "aaa", function() {});
    }, /Digest method not supported/);
    a.done();
};

exports.badCallbackFails = function(a) {
    var comparator = require("./index");
    a.expect(1);
    a.throws(function() {
        comparator.compare("./file1", "./file1", "sha1", "badcallback");
    }, /Callback required/);
    a.done();
};

exports.invalidArgsFails = function(a) {
    var comparator = require("./index");
    a.expect(1);
    a.throws(function() {
        comparator.compare("./file1", "./file1", "hhh", "bbb", "ccc");
    }, /Callback required/);
    a.done();
};

exports.filesSameFalse = function(a) {
    var comparator = require("./index");
    a.expect(1);
    comparator.compare("./file1", "./file1", function(result, err) {
        a.ok(result);
        a.done();
    });
};

exports.filesDifferTrue = function(a) {
    var comparator = require("./index");
    a.expect(1);
    comparator.compare("./file1", "./file2", function(result, err) {
        a.ok(!result);
        a.done();
    });
};

exports.srcFileNotExist = function(a) {
    var comparator = require("./index");
    a.expect(1);
    comparator.compare("./fileNoFile1", "./file1", function(result, err) {
        a.ok(!result);
        a.done();
    });
};
