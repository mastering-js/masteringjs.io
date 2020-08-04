[Node.js buffers](/tutorials/node/buffer) are objects that store arbitrary binary data. They're Node's equivalent to
[blobs](/tutorials/fundamentals/blob).

Comparing two buffers is easy. Node.js' `Buffer` class has a static function `compare()` that returns 0 if two
buffers are equal.

```javascript
[require:Node buffers compare$]
```

That means, to check if `buf1` has the same bytes as `buf2`, you can do:

```javascript
const isEqual = Buffer.compare(buf1, buf2) === 0;
```

Sorting
-------

The `Buffer.compare()` function returns:

- 0 if `buf1` and `buf2` are equal
- 1 if `buf1 < buf2`
- -1 if `buf1 > buf2`

This means you can use `Buffer.compare()` when [sorting an array](/tutorials/fundamentals/array-sort) of buffers.
`Buffer.compare()` orders buffers lexicographically, so, for buffers containing utf8 strings, sorting using
`Buffer.compare()` is equivalent to sorting by the string representation of the buffer.

```javascript
[require:Node buffers sort$]
```