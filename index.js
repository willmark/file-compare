
/**
 * Call the hash function for each file synchronously
 * file1 - first file to compare
 * fiel2 - second file to compare
 * algo (optional) - algorithm for hash.  default 'sha1'
 * callback - result callback function(result, err) where result is true if hashes are equal
 */
exports.compare = function() {
    if (typeof arguments[0] === "undefined") throw new Error("File1 required");
    if (typeof arguments[1] === "undefined") throw new Error("File2 required");
    if (typeof arguments[2] === "undefined") throw new Error("Callback required");

    var file1 = arguments[0];
    var file2 = arguments[1];
    var algo = 'sha1';
    var callback = arguments[2];
    
    // @ifdef DEBUG
    if (typeof arguments[0] != 'string') throw new Error("File1 must be a string");
    if (typeof arguments[1] != 'string') throw new Error("File2 must be a string");
    if (arguments.length == 4) {
        if (typeof arguments[2] != 'string') throw new Error("Algorithm must be a string");
        if (typeof arguments[3] != 'function') throw new Error("Callback required");
        algo = arguments[2];
        callback = arguments[3];
    } else if (arguments.length == 3) {
        if (typeof arguments[2] != 'function') throw new Error("Callback required");
    } else {
        throw new Error("Invalid args length: " + arguments.length);
    }
    // @endif

    /**
    * Call the hash algorithms for each file, and send result to callback
    */
    computeHash(file2, algo, function (file2hash) {
        computeHash(file1, algo, function (file1hash) {
                callback(file1hash === file2hash);
        });
    });
};

/**
 * Create a new hash of given file name
 */
computeHash = function(filename, algo, callback) {
    var crypto = require('crypto');
    var fs = require('fs');

    var chksum = crypto.createHash(algo);

    var s = fs.ReadStream(filename);
    s.on('error', function (err) {
        //no file, hash will be zero
        callback(0);
    });
    s.on('data', function (d) {
        chksum.update(d);
    });

    s.on('end', function () {
        var d = chksum.digest('hex');
        //util.debug(d + '  ' + filename);
        callback(d);
    });
};
