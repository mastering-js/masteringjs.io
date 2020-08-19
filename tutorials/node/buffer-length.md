[Node.js buffers](/tutorials/node/buffer) are objects that store arbitrary binary data. Buffers have a
[`length` property](https://nodejs.org/api/buffer.html#buffer_buf_length) that contains the number of bytes
in the buffer.

```javascript
[require:Node buffers length$]
```

For buffers containing UTF8 encoded strings, the buffer's length is equivalent to the length of the string. For
example, if you read a text file from the file system using `fs`, the resulting buffer's length is the same as
the number of characters in the text file.

```javascript
[require:Node buffers length of file$]
```

Allocated vs Actual
-------------------

Note that `Buffer#length` contains the number of _allocated_ bytes for the buffer, **not** how many bytes are
actually used. Often these two are equivalent, but they may be different.

For example, if you allocate a 100-byte buffer using [`Buffer.alloc()`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_alloc_size_fill_encoding), the buffer's length will always be 100, regardless
of the buffer's contents.

```javascript
[require:Node buffers alloc length$]
```