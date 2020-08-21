[Node.js buffers](/tutorials/node/buffer) are objects that store arbitrary binary data. Buffers have a [`toString()` method](https://nodejs.org/api/buffer.html#buffer_buf_tostring_encoding_start_end) that you can use to convert the buffer
to a string.

By default, `toString()` converts the buffer to a string using UTF8 encoding. For example, if you create a buffer
from a string using `Buffer.from()`, the `toString()` function gives you the original string back.

```javascript
[require:Node buffers toString default$]
```

The `encoding` Parameter
------------------------

The `toString()` method's first parameter is a string called `encoding`. It determines what format Node.js uses to express
the raw data. The default value is `'utf8'`.

```javascript
[require:Node buffers toString utf8$]
```

Node.js supports [numerous different encodings](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) for buffers. The most commonly used are:

- 'utf8'
- 'hex'
- 'base64'

For example, by calling `.toString('hex')`, you get a string representation of the buffer where each byte is encoded
as 2 hexadecimal characters.

```javascript
[require:Node buffers toString hex$]
```

Which encoding is correct depends on your use case and the data stored in the buffer. Typically `Buffer#toString()` is
used for debugging and trying to figure out what the contents of the buffer mean. If that's your use case, try all
3 different encodings and see if any of them look familiar.

One common use case for `.toString()` is converting a file to [base64 so it can be used as an email attachment](https://en.wikipedia.org/wiki/Email_attachment). Here's how you can convert a file to base64 encoding using Node.js:

```javascript
[require:Node buffers toString base64$]
```