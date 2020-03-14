[Express' `sendFile()` function](https://expressjs.com/en/api.html#res.sendFile) lets you send a raw file as a response to an HTTP request. You can think of `res.sendFile()` as [Express' `static`](/tutorials/express/static) middleware for a single endpoint.

Using `sendFile()`
------------------

Suppose you have an HTML file `test.html` that looks like this:

```
<h1>Hello, World</h1>
```

You can make Express serve this HTML file as an HTTP response using `res.sendFile()` by passing the path to `test.html`. Note that the path must be absolute _unless_ you specify the `root` option.

```javascript
app.get('/myendpoint', (req, res) => {
  res.sendFile(`${__dirname}/test.html`);
});
```

If you don't want to specify the absolute path, you can pass the `root` option to
specify the directory the path is relative to.

```javascript
app.get('/myendpoint', (req, res) => {
  res.sendFile('test.html', { root: __dirname });
});
```