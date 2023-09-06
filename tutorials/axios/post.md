The easiest way to make a POST request with [Axios](https://www.npmjs.com/package/axios) is the
[`axios.post()` function](https://github.com/axios/axios#example). The first 
parameter to `axios.post()` is the URL, and the 2nd
is the [HTTP request body](https://en.wikipedia.org/wiki/HTTP_message_body).

```javascript
[require:axios.*POST requests.*basic example$]
```

By default, if the 2nd parameter to `axios.post()` is an object, Axios
serializes the object to JSON using [the `JSON.stringify()` function](http://thecodebarbarian.com/the-80-20-guide-to-json-stringify-in-javascript).
If the 2nd parameter is an object, Axios also sets the [`content-type` header to `application/json`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Type), so
most web frameworks, like [Express](/tutorials/express/json), will be able
to automatically convert the request body into a JavaScript object for you.

```javascript
[require:axios.*POST requests.*headers$]
```

To override the [`content-type` header in Axios](/tutorials/axios/headers),
you should use the third parameter to `axios.post()`: the `options` parameter.
Set the `options.header['content-type']` option to set the `content-type` header.

```javascript
[require:axios.*POST requests.*content-type$]
```

Form-Encoded Request Bodies
---------------------------

If you pass a string as the `body` parameter to `axios.post()`, Axios will
set the `content-type` header to [`application/x-www-form-urlencoded`](https://dev.to/sidthesloth92/understanding-html-form-encoding-url-encoded-and-multipart-forms-3lpa).
That means that the string passed in as the request body should contain a bunch of key/value pairs separated by
`&`, in the format of `key1=value1&key2=value2`.

```javascript
[require:axios.*POST requests.*string$]
```

You can also [POST using JavaScript's `FormData` class](/tutorials/axios/form-data) to POST more sophisticated data, including files.
