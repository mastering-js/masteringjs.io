The first parameter to Express route handlers and middleware functions is
the [Express request object](https://expressjs.com/en/api.html#req). This
parameter is usually called `req`.

```javascript
[require:Express.*\.Request.*basic]
```

Request Parameters
------------------

Express parses [query string](https://en.wikipedia.org/wiki/Query_string) parameters by default, and puts them into the [`req.query` property](https://expressjs.com/en/api.html#req.query).

```javascript
[require:Express.*\.Request.*query string]
```

Express also supports [named route parameters](https://expressjs.com/en/api.html#req.params) and puts them in the `req.params` object. Named route parameters are always strings, and
Express automatically decodes them using [`decodeUriComponent()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/decodeURIComponent).

```javascript
[require:Express.*\.Request.*params]
```

Express does **not** parse the [request body](/tutorials/express/body) for you by default. To opt in to
parsing JSON request bodies, use the [`express.json()` middleware](https://expressjs.com/en/api.html#express.json). Express will then parse
the HTTP request body and put the parsed body in `req.body`.

```javascript
[require:Express.*\.Request.*json body]
```

Headers
-------

To get the value of an [HTTP request header](https://developer.mozilla.org/en-US/docs/Glossary/Request_header), you should use Express' [`req.get()` function](https://expressjs.com/en/api.html#req.get). You may also use [Node.js' native `req.headers` property](https://nodejs.org/api/http.html#http_message_headers).

```javascript
[require:Express.*Request.*header]
```

Here's a [tutorial on how to set request headers in Axios](/tutorials/axios/headers)
if you're unfamiliar with Axios.

Body Size Limit
---------------

By default, [`express.json()` limits the request body to 100kb](https://expressjs.com/en/api.html#express.json). If the request body is any larger, Express will throw an [HTTP 413 "Payload Too Large" error](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413). You can configure this limit using the `limit` option to `express.json()`.

```javascript
[require:Express.*Request.*body size]
```