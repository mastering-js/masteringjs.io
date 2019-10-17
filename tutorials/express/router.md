[Routing](https://expressjs.com/en/guide/routing.html) in Express
means mapping an HTTP request to the appropriate request handler. 
In Express, a _request handler_ is a
[callback function](/tutorials/fundamentals/callbacks) with the 
following signature:

```javascript
function requestHandler(req, res) {}
```

For example, if you receive an HTTP GET request for `/route1`,
Express should call the request handler for `GET /route1` and
not call the request handler for `GET /route2`. Here's how
you can define a request handler for `GET /route1`:

```javascript
const express = require('express');
const app = express();

// When `app` receives a GET request to `/route1`, Express calls
// the `requestHandler()` function.
app.get('/route1', function requestHandler(req, res) {
  res.send('Hello from route1');
});

// Listen for requests on port 3000
app.listen(3000);
```

Testing with Axios
------------------

The easiest way to see your Express app in action is using
[Axios](http://npmjs.com/package/axios) - no need to remember
CURL flags. Here's a simple script that starts an Express server
and makes an HTTP request to that server using Axios and
[async/await](https://asyncawait.net).

```javascript
[require:Express.*router.*testing$]
```

Other HTTP Request Methods
--------------------------

The [`app.get()` function](https://expressjs.com/en/5x/api.html#app.get.method) defines a request handler specifically
for an [HTTP GET request](https://www.w3schools.com/tags/ref_httpmethods.asp). However, there are [several HTTP request methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) in addition to `GET`:

- `POST`
- `PUT`
- `DELETE`
- `OPTIONS`
- `HEAD`
- `PATCH`
- `TRACE`

Express has a separate function for each of these request methods:

- [`app.post()`](https://expressjs.com/en/5x/api.html#app.post.method)
- [`app.put()`](https://expressjs.com/en/5x/api.html#app.put.method)
- [`app.delete()`](https://expressjs.com/en/5x/api.html#app.delete.method)
- [`app.options()](https://expressjs.com/en/5x/api.html#routing-methods)
- [`app.head()`](https://expressjs.com/en/5x/api.html#routing-methods)
- [`app.patch()](https://expressjs.com/en/5x/api.html#routing-methods)
- [`app.trace()](https://expressjs.com/en/5x/api.html#routing-methods)

Most apps just use `app.get()`, `app.post()`, `app.put()`, and 
`app.delete()`. However, `app.options()` is useful for [CORS](/tutorials/fundamentals/cors). Here's how you can define a
POST handler:

```javascript
app.post('/route1', function(req, res) {
  res.send('Hello from POST /route1');
});
```

The [`app.all()` function](https://expressjs.com/en/4x/api.html#app.all) lets you define a route handler for all HTTP methods:

```javascript
// Express will call `routeHandler()` for any request to
// `/route1`, regardless of the request method. For example,
// `GET /route1` and `POST /route1` both trigger `routeHandler`.
app.all('/route1', function routeHandler(req, res) {});
```

Wildcards and Route Parameters
-----------------------------

Express routing supports [a subset of regular expressions](https://expressjs.com/en/guide/routing.html#route-paths), including wildcards. For example, the below is how you define a 
request handler for all URIs:

```javascript
// Express will call `requestHandler()` for **every** GET request.
app.get('*', function requestHandler(req, res) {});
```

The `:` character is how you define a [route parameter in Express](https://expressjs.com/en/guide/routing.html#route-parameters). A route parameter is a named section of the URL - Express captures
the value in the named section and stores it in [the `req.params` property](https://expressjs.com/en/4x/api.html#req.params).

```javascript
// Express stores whatever string comes after `/user/` in
// `req.params.id`
app.get('/user/:id', (req, res) => res.json({ id: req.params.id }));

await app.listen(3000);

let res = await axios.get('http://localhost:3000/user/test1');
res.data.id; // 'test1'

res = await axios.get('http://localhost:3000/user/test2');
res.data.id; // 'test2'
```

You can also define multiple route parameters. Route parameters
are delimited by `/`.

```javascript
// `GET /flight/MIA/JFK` means `req.params` is equal to
// `{ from: 'MIA', to: 'JFK' }`
app.get('/flight/:from/:to', (req, res) => res.json(req.params));
```

Subrouters
----------

The [`express.Router()` function](https://expressjs.com/en/4x/api.html#express.router) creates a subrouter. A subrouter is
an [Express middleware](https://masteringjs.io/tutorials/express/middleware) that behaves like a mini Express app. It has the
same `get()`, `post()`, `all()`, etc. methods that an Express app 
does for defining route handlers.

Routers are commonly used as Express sub-apps. For example, you
may have a separate router for REST API requests and another
router for custom views.

```javascript
// Set up an API sub-app...
const api = express.Router();

api.get('/users', (req, res) => { res.json({ users: [] }); });

// And a views sub-app...
const views = express.Router();
const fs = require('fs');
const usersPage = fs.readFileSync('./views/users.html', 'utf8');

views.get('/users', (req, res) => res.send(usersPage));

// And add them to a top-level app
const app = express();

// Handles `GET /api/users`
app.use('/api', api);
// Handles `GET /views/users`
app.use('/views', views);
```