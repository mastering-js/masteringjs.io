[Node.js buffers](http://thecodebarbarian.com/an-overview-of-buffers-in-node-js.html) are objects that store arbitary binary data. The most common reason for running into buffers is [reading files using Node.js](https://nodejs.dev/reading-files-with-nodejs):

```javascript
[require:Node buffers from filesystem$]
```

Buffers have a [`toString()` function](https://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings) that takes a single
argument `encoding`. The `toString()` function lets you convert
buffers into meaningful strings depending on encoding. For example,
if you read an ordinary text file using `fs.readFile()`, you can
convert the buffer into the text from the file using `.toString('utf8')`:

```javascript
[require:Node buffers toString utf8$]
```

Another common encoding is `hex`, which encodes the buffer as a string
of characters `[0-9A-F]`. Hex encoding is useful because it doesn't
require escaping - you can put a hex encoded buffer into a URI without
using `encodeURIComponent()` or put it into JSON without escaping `"`,
because hex encoding only contains alphanumeric characters.

```javascript
[require:Node buffers toString hex$]
```

Creating a New Buffer
---------------------

You can create buffers from strings using the [`Buffer.from()` function](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_array). Like `toString()`, you can pass [an `encoding` argument to `Buffer.from()`](https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_string_encoding).

```javascript
[require:Node buffers from string$]
```

The `Buffer.from()` function also accepts arrays and buffers. You can
use `Buffer.from()` to clone a buffer:

```javascript
const buf2 = Buffer.from(buf);

buf2 === buf; // false
buf2.toString('utf8'); // 'Hello, World'
```

Or from an array of numeric bytes:

```javascript
const buf = Buffer.from([
  0x48,
  0x65,
  0x6c,
  0x6c,
  0x6f,
  0x2c,
  0x20,
  0x57,
  0x6f,
  0x72,
  0x6c,
  0x64
]);

buf.toString('utf8'); // Hello, World
```

With [`JSON.stringify()`](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html)
----------------------------

The [`JSON.stringify()` function converts buffers into objects](https://nodejs.org/api/buffer.html#buffer_buf_tojson). The raw data is encoded as an array of bytes that you can pass in to `Buffer.from()`.

```javascript
[require:Node buffers json$]
```