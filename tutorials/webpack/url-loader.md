Webpack's `url-loader` is a nice choice to compress large files
for storage. In the options property, you can specify the max `limit`
file size, in bytes, that Webpack will compress. What's even cooler is
that you can also specify what that different method is should the file
go over the limit, using the `fallback` property. The `fallback` property
defaults to `file-loader` in the case you don't specify it.

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
            loader: "url-loader",
            options: {
              limit: 8192,
              mimetype: "image/png",
              encoding: true,
            },
          },
        ],
      },
    ],
  },
};
```
