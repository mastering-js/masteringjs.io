The easiest way to make a PUT request with [Axios](/axios) is the
[`axios.put()` function](https://github.com/axios/axios#example). The first 
parameter to `axios.put()` is the URL, and the 2nd
is the [HTTP request body](https://en.wikipedia.org/wiki/HTTP_message_body).

```javascript
[require:axios.*PUT requests.*basic example$]
```

By default, if the 2nd parameter to `axios.put()` is an object, Axios
serializes the object to JSON using [the `JSON.stringify()` function](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript).
If the 2nd parameter is an object, Axios also sets the [`content-type` header to `application/json`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type), so
most web frameworks, like [Express](/tutorials/express/json), will be able
to automatically convert the request body into a JavaScript object for you.

```javascript
[require:axios.*PUT requests.*headers$]
```

Form-Encoded Request Bodies
---------------------------

If you pass a string as the `body` parameter to `axios.put()`, Axios will
set the `content-type` header to [`application/x-www-form-urlencoded`](https://dev.to/sidthesloth92/understanding-html-form-encoding-url-encoded-and-multipart-forms-3lpa).
That means the request body should be a bunch of key/value pairs separated by
`&`, like `key1=value1&key2=value2`.

```javascript
[require:axios.*PUT requests.*string$]
```