[Express response objects](/tutorials/express/res) have a [`json()` function](http://expressjs.com/en/4x/api.html#res.json). The [`res.json()` function](/tutorials/express/res#json-responses-using-resjson) takes a single parameter,
an object `obj`, serializes it to JSON, and sends it in the [HTTP response body](https://en.wikipedia.org/wiki/HTTP_message_body).

```javascript
[require:Express.*response.*json$]
```

Express also sets the [`content-type` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type) to `application/json`. Most HTTP clients, like [Axios](https://www.npmjs.com/package/axios), handle automatically transforming JSON
strings into JavaScript objects using [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) when the content type is `application/json`.

[The `res.json()` uses `JSON.stringify()` under the hood](https://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript.html) to serialize objects into JSON. You can configure the arguments that Express passes
to `JSON.stringify()` using [`app.use()`](https://expressjs.com/en/api.html#app.settings.table). For example, to make Express pretty print JSON, you can use `app.set('json spaces', 2)` as shown below.

```javascript
[require:Express.*response.*json pretty print$]
```