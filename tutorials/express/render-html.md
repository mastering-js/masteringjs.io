[Express](http://expressjs.com/) makes it easy to render plain HTML, either from a JavaScript string or from
a file. Given an HTML string, all you need to do is call [`res.send()`](http://expressjs.com/en/4x/api.html#res.send), Express takes care of setting the `content-type` header for you:

```javascript
[require:Express render html from string$]
```

From a File
-----------

If your HTML is in a file `test.html`, rather than a string, you can use [Express' `sendFile()` function](/tutorials/express/sendfile). The only caveat is that you **must** specify the absolute path to `test.html`.

```javascript
app.get('*', (req, res) => {
  // `__dirname` contains the directory that this code is in.
  res.sendFile(`${__dirname}/test.html`);
});
```