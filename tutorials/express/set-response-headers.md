[Express' response object](/tutorials/express/res), commonly called `res`, has a [`set()` function](https://expressjs.com/en/api.html#res.set) that sets a response header.
For example, the following code sets the `Content-Type` header in an Express route handler.

```javascript
app.get('/hello', function routeHandler(req, res) {
  res.set('Content-Type', 'text/plain');

  res.end('Hello, World');
});
```

To set a response header for multiple routes, you can use [Express middleware](/tutorials/express/middleware).
Just make sure you call `app.use()` to register your Express middleware **before** your route handlers.

```javascript
// Sets `Content-Type` response header on *all** responses
app.use(function myMiddleware(req, res, next) {
  res.set('Content-Type', 'text/plain');
  next();
});

app.get('/hello', function routeHandler(req, res) {
  // `myMiddleware` already executed when `routeHandler` runs
  res.end('Hello, World');
});
```