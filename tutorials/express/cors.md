[CORS headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) allow
apps running in the browser to make requests to servers on different domains (also 
known as _origins_). CORS headers are set on the server side - the HTTP server
is responsible for indicating that a given HTTP request can be cross-origin.

The [cors npm module](https://www.npmjs.com/package/cors) is an
[Express middleware](/tutorials/express/middleware) that sets CORS headers
on the [Express response object](/tutorials/express/res).

```javascript
[require:Express.*cors.*basic example$]
```

You can also declare CORS middleware on a certain subset of your routes by
passing a string parameter to `use()`.

```javascript
[require:Express.*cors.*subset$]
```