/**
 * Compare two files base on their computed hash rather than just size or timestamp
 * usage: compare(file1, file2, [algo], callback);
 * where:
 *    file1 - required string path to file 1
 *    file2 - required string path to file 2
 *    algo - option string algorithm for hash computation
 *    callback - required callaback(copied, err)
 *    where: 
 *       copied - boolean indicating if compare succeeded
 *       err - Error if there was a problem with the compare
 */
exports.compare = function() {
    var Args = require("vargs").Constructor;

    /**
     * Common argument checking for crop and resize
     */
    function checkCommonArgs(args) {
        if (args.length < 2) throw new Error("File1, File2, and callback required");
        if (typeof args.at(1) != "string") throw new Error("File2 required");
        if (typeof args.at(0) != "string") throw new Error("File1 required");
        if (!args.callbackGiven()) throw new Error("Callback required");
    }
    var args = new Args(arguments);
    checkCommonArgs(args);
    var file1 = args.at(0);
    var file2 = args.at(1);
    var algo = "sha1";
    var callback = args.callback;
    if (args.length === 3) {
        if (typeof args.at(2) !== "string") throw new Error("Algorithm must be a string");
        algo = args.at(2);
    } else if (args.length > 3) {
        throw new Error("Invalid args length: " + args.length);
    }
    /**
    * Call the hash algorithms for each file, and send result to callback
    */
    computeHash(file2, algo, function (file2hash, err) {
        if (err) {
           callback(false, err);
        } else {
           computeHash(file1, algo, function (file1hash, err) {
              callback(file1hash === file2hash, err);
           });
        }
    });
};

/**
 * Create a new hash of given file name
 */
function computeHash(filename, algo, callback) {
    var crypto = require('crypto');
    var fs = require('fs');

    var chksum = crypto.createHash(algo);

    var s = fs.ReadStream(filename);
    s.on('error', function (err) {
        //no file, hash will be zero
        callback(0, err);
    });
    s.on('data', function (d) {
        chksum.update(d);
    });

    s.on('end', function () {
        var d = chksum.digest('hex');
        //util.debug(d + '  ' + filename);
        callback(d);
    });
}
