file-compare
============

> Stability - 2 Unstable

Compare two files hash values

## API

````
compare(file1, file2, [algorithm], function(result))

Compares file1 hash to file2 hash and callback function gets a boolean result 'true' on a match
Optional [algorithm] is a string indicator of the type of hash to use (ie. 'sha1', 'md5', etc.)
````
