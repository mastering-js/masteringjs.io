Express doesn't automatically parse the HTTP request body for you,
but it does have an [officially supported middleware package for parsing HTTP request bodies](https://expressjs.com/en/resources/middleware/body-parser.html). As of v4.16.0, Express comes with a [built-in JSON request body parsing middleware](http://expressjs.com/en/4x/api.html#express.json) that's good enough for most JavaScript apps.

JSON Request Body
-----------------

Express has a [built-in `express.json()` function](http://expressjs.com/en/4x/api.html#express.json) that returns an [Express middleware function](/tutorials/express/middleware) that parses JSON HTTP request bodies into
[JavaScript objects](/tutorials/fundamentals/pojo). The `json()` middleware
adds a `body` property to the [Express request `req`](/tutorials/express/req).
To access the parsed request body, use `req.body` as shown below.

```javascript
[require:Express request body json middleware$]
```

Common Gotchas
--------------

If the JSON body is malformed, Express will error out with an HTTP 400. This
error also triggers [error handling middleware](/tutorials/express/error-handling).

```javascript
[require:Express request body malformed json$]
```

It is important to note that, by default, the `json()` middleware ignores
any request whose `Content-Type` header isn't something that Express
recognizes as JSON. If `express.json()` is silently ignoring your request,
make sure you check the `Content-Type` header.

```javascript
[require:Express request body content type$]
```

URL-Encoded Form Body Parser
----------------------------

Express has an officially supported module [body-parser](https://www.npmjs.com/package/body-parser) that includes a
[parser for URL-encoded request bodies](https://expressjs.com/en/resources/middleware/body-parser.html#bodyparserurlencodedoptions), like the ones submitted by [HTML forms](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Your_first_HTML_form).

```javascript
[require:Express request body url encoded$]
```

Files
-----

Neither Express nor body-parser supports file uploads out of the box.
However, you can use the [Formidable](https://www.npmjs.com/package/formidable) module on npm to handle file uploads. You can learn how
on our tutorial on [file uploads with Express](/tutorials/express/file-upload).