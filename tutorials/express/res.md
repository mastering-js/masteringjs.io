The 2nd parameter to Express route handlers and middleware functions is the
[Express response object](http://expressjs.com/en/4x/api.html#res), commonly called 
`res`. The `res` object exposes several functions that let you configure and send
a response to an HTTP request.

Basic Response Using `res.send()`
-----------------------------

The [`res.send()` function](http://expressjs.com/en/4x/api.html#res.send) is the 
most basic way to send an HTTP response. Calling `res.send()` with a string sends
a response with the string as the response body and [content type](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) set to `'text/html; charset=utf-8'`.

```javascript
[require:Express.*response.*send]
```

JSON Responses Using `res.json()`
---------------------------------

The `res.send()` function is rarely used in practice, because Express responses
have a couple of convenient helper functions. If you're building a RESTful API
or another backend service that sends responses in JSON, you should use the
[`res.json()` function](http://expressjs.com/en/4x/api.html#res.json). The `res.json()` function converts the given object to JSON using [`JSON.stringify()`](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html) and sets the [content type to `'application/json; charset=utf-8'`](https://github.com/expressjs/express/blob/e1b45ebd050b6f06aa38cda5aaf0c21708b0c71e/lib/response.js#L263-L265).

```javascript
[require:Express.*response.*json]
```

Rendering Template Languages
----------------------------

Express supports [several different popular templating languages](https://github.com/expressjs/express/wiki#template-engines). For example,
you can use the [Pug language](https://www.npmjs.com/package/pug) (formerly known as Jade).

Given the below Pug code in `views/test.pug`:

```
h1= message
```

The below Express route handler will render an `h1` tag that contains
'Hello, World'. You do not need to install any libraries other than [pug](https://www.npmjs.com/package/pug) or explicitly `require()` pug.

```javascript
[require:Express.*response.*pug]
```

Setting the Response Status
---------------------------

The [`res.status()` function](http://expressjs.com/en/4x/api.html#res.status) lets you set the response status. Unlike `res.send()`, `res.json()`, and `res.render()`,
`res.status()` does **not** actually send the response. That's why you will
usually see `res.status().json()` or `res.status().render()`.

```javascript
[require:Express.*response.*status]
```

Response Headers
----------------

The [`res.status()` function](http://expressjs.com/en/4x/api.html#res.set) lets you set [HTTP response headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header). The below example demonstrates manually seting the response content type for sending an [SVG image](https://css-tricks.com/snippets/htaccess/serve-svg-correct-content-type/).

```javascript
[require:Express.*response.*set header]
```

What Happens if You Don't Send a Response?
------------------------------------------

In Express, you're responsible for sending your response using `res.json()`, `res.send()`, `res.end()`, or `res.render()`. Otherwise the request will hang forever. Express will **not** throw any error if you don't send a response.

```javascript
// Express won't throw an error, but any request to this endpoint will hang
// forever because there's no `res.send()`.
app.get('*', function(req, res) {
  res.status(201);
});
```