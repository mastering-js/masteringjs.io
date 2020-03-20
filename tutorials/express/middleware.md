When an Express server receives an HTTP request, it executes a list of [middleware](https://expressjs.com/en/guide/using-middleware.html) functions. The middleware functions are responsible for [handling the request](/tutorials/express/req) and [crafting a response](/tutorials/express/res).

You will usually see middleware defined as a function with 3 parameters: `req`, `res`, and `next`. The biggest exception to this rule is [error handling middleware](https://thecodebarbarian.com/80-20-guide-to-express-error-handling).
To add a middleware function to your Express app, you call [`app.use()`](http://expressjs.com/en/4x/api.html#app.use).

```javascript
const app = require('express')();

app.use((req, res, next) => {
  req; // The request
  res; // The response
  next; // A function that you must call to trigger the next middleware
});
```

Under the hood, when you call `app.use()`, Express adds your function to
[its internal middleware _stack_](https://thecodebarbarian.com/write-your-own-express-from-scratch#step-1-getting-started-with-middleware). Express executes middleware in the order they're
added, so if you call `app.use(fn1); app.use(fn2);`, Express will execute `fn1`
before `fn2`.

Middleware vs Route Handlers
----------------------------

Suppose you have a simple Express server that responds to GET requests with the
string 'Hello, World' as shown below.

```javascript
const app = require('express')();

app.get('/', function routeHandler(req, res) {
  res.send('Hello, World');
});
```

In Express, a route handler is just a special type of middleware that never
calls `next()`. You could also write a middleware that does the same thing.

```javascript
app.use(function(req, res, next) {
  // Do nothing if the request isn't `GET /`
  if (req.method !== 'GET' || req.url !== '/') {
    return next();
  }
  res.send('Hello, World');
});
```

Routing
-------

The [`app.use()` function](http://expressjs.com/en/4x/api.html#app.use) takes 2
parameters: an optional `path`, and a middleware function [`callback`](/tutorials/fundamentals/callbacks). If the first parameter to `app.use()` is
a string, Express will only execute the corresponding middleware function if
the [URL](https://nodejs.org/api/http.html#http_message_url) matches.

```javascript
// Express will only call `middleware()` if `req.url` is equal to '/'
app.use('/', function middleware(req, res, next) {
  // Do nothing if the request isn't a 'GET' request
  if (req.method !== 'GET') {
    return next();
  }
  res.send('Hello, World');
});
```

The `next()` Function
---------------------

If you have multiple middleware functions, you need to make sure your middleware
either calls `next()` or send a response. If you write Express middleware,
this is your responsibility. Express will not throw an error if your middleware
doesn't call `next()`, it will [simply hang](/tutorials/express/res#what-happens-if-you-dont-send-a-response).

```javascript
// If you open this page in Chrome, it will just keep loading forever.
app.use('/', function middleware(req, res, next) {
  console.log('Test');
});
```

In general, it is best practice to call `next()` unless you explicitly do not
want the rest of the middleware stack to run. Calling `next()` if there's no
more middleware is perfectly fine.

```javascript
[require:Express.*middleware.*next with no more middleware$]
```

If you call `next()` with a parameter, Express will treat that parameter as an
error and trigger [error handling middleware](/tutorials/express/error-handling). The below middleware will cause Express to respond with an HTTP 500 and a stack trace.

```javascript
[require:Express.*middleware.*next with error$]
```

If you open the above middleware in Chrome, you'll see something like this:

<img src="https://codebarbarian-images.s3.amazonaws.com/express2.jpg" class="inline-image" style="width: 200px" alt="An example of an HTTP response error">
