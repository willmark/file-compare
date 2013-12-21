file-compare
============

> Stability - 2 Unstable

Compare two files hash values

## API

````
compare(file1, file2, [algorithm], function(result))

Compares file1 hash to file2 hash and callback function gets a boolean result 'true' on a match
 * usage: compare(file1, file2, [algo], callback);
 * where:
 *    file1 - required string path to file 1
 *    file2 - required string path to file 2
 *    algo - option string algorithm for hash computation
 *    callback - required callaback(copied, err)
 *    where: 
 *       copied - boolean indicating if compare succeeded
 *       err - Error if there was a problem with the compare
Optional [algorithm] is a string indicator of the type of hash to use (ie. 'sha1', 'md5', etc.)
````
