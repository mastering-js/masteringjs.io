The easiest way to convert a string to base64 is using the global [`btoa()` function](https://developer.mozilla.org/en-US/docs/Web/API/btoa) as follows.

```javascript
btoa('hello'); // "aGVsbG8="
```

`btoa()` is supported in all modern browsers and Node.js `>= 16.0.0`.
Given that Node.js 14 was EOL in April 2023, you should use native `btoa()` to convert strings to base64, unless you need to support older browsers or older Node.js versions.

Using [Node.js Buffers](/tutorials/node/buffer)
-------------------------------

`btoa()` is well supported in browsers, but is a relatively new addition to Node.js.
Thankfully, you can also use Node.js buffers to convert strings to base64 using [buffers' `toString()` method](/tutorials/node/buffer-to-string) as follows.

```javascript
const buf = Buffer.from('hello', 'utf8');
buf.toString('base64'); // "aGVsbG8="
```