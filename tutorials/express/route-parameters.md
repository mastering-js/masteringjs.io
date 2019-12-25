In [Express](https://expressjs.com/), [route parameters](https://expressjs.com/en/guide/routing.html#route-parameters) are essentially
variables derived from named sections of the URL. Express captures
the value in the named section and stores it in [the `req.params` property](https://expressjs.com/en/4x/api.html#req.params).

```javascript
[require:Express route parameters basic example$]
```

You can define multiple route parameters in a URL. In the below example,
the Express route is `/users/:userId/books/:bookId`, so `req.params.userId`
will contain the [substring](/tutorials/fundamentals/substring) after `/users/` and before `/books/`, and `req.params.bookId` will contain everything after `/books/`.

```javascript
[require:Express route parameters multiple$]
```

Why Route Parameters?
---------------------

Route parameters have some convenient properties that reduce the amount of
validation you need to do versus using [query parameters](/tutorials/express/query-parameters) or [request bodies](/tutorials/express/body):

- A route parameter is never `null` or `undefined`. For example, a request to `GET /users` above will cause an HTTP 404, and not call the route handler for `/users/:userId/books/:bookId`.
- A route parameter is always a string with positive length. For example, `GET /user/42/books/` also causes an HTTP 404.

If you're defining an HTTP API in Express, it is usually better to make a 
parameter a route parameter rather than a query parameter or a body parameter
if possible. If your parameter is mandatory and doesn't need to be an object,
route parameters are generally the way to go.