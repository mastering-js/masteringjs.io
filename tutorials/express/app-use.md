Express apps have a [`use()` function](https://expressjs.com/en/api.html#app.use). This function adds a new [middleware](/tutorials/express/middleware) to the app.

For example, suppose you want to print the HTTP method (get, post, etc.) and the URL of every request. Here's how you
can add a new middleware that prints the HTTP method and URL of every request:

```javascript
[require:Express use basic example$]
```

The Middleware Stack
--------------------

In Express, everything is middleware. Internally, an Express app has a middleware _stack_, and calling `use()` adds
a new _layer_ to the stack. Functions that define route handlers, like `get()` and `post()` also add layers to the stack. 
Express executes the middleware stack in order, so the order in which you call `use()` matters.

For example, one of the most common middleware functions is the [cors middleware](/tutorials/express/cors), which attaches
CORS headers to your Express HTTP responses. Make sure you call `app.use(cors())` **before** defining any route handlers
or anything else that sends an HTTP response, otherwise you won't get CORS headers!

```javascript
[require:Express use cors$]
```

Another common middleware function is [Express' body parser](http://expressjs.com/en/resources/middleware/body-parser.html).
This middleware is responsible for parsing the [request body](/tutorials/express/body) and setting the `req.body` property.
Make sure you call `app.use(express.json())` **before** using `req.body`, otherwise it will be undefined!

```javascript
[require:Express use body parser$]
```

The `path` Parameter
------------------

Although the `use()` function is typically called with only 1 parameter, you can also pass it a `path` that tells Express
to only execute the given middleware when it receives a request for a URL that starts with the given `path`.

```javascript
[require:Express use path param$]
```