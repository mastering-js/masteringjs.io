Webpack's `url-loader` is a nice choice to compress large files
for storage. In the options property, you can specify the max `limit`
of a file, in bytes, to be compressed before having to try a different
method for compressing. What's even cooler is that you can also specify
what that different method is should the file go over the limit, using
the `fallback` property. It defaults to `file-loader` in the case you
don't specify it. the fallback loader will recieve all configuration
options specified for `url-loader`.

# mimetype, encoding, and generator

`mimetype` defaults to `text/plain;charset=US-ASCII` if you omit the option.
Setting it to true generates the mimetype from a npm module that webpack
uses. Setting `mimetype` to false removes the mediatype from the Data URL.
`encoding` specifies what the name implies, the encoding of the file. The
default is `base64` but it also supports
`utf8, utf16le, latin1, hex, ascii, binary, and ucs2`. If you set `encoding`
to false, it does not encode the file while true encodes in `base64`.
`generator` is a function that defaults to the following structure,
`(mimetype,encoding,content,resourcePath) => mimetype; encoding, base64_content`.
Use this option if you want to use your own encoding implementation.

# Example

Here is an example that compresses a `.png` file.

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              mimetype: 'image/png',
              encoding: true,
            },
          },
        ],
      },
    ],
  },
};
```
