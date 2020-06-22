Node.js has a [built-in HTTP library](https://nodejs.org/api/http.html) that lets
you make HTTP requests with no outside modules. The only downside is that the API
is somewhat archaic: it relies on streams, and doesn't support promises. Below
is how you can make an HTTP request to `httpbin.org` using Node's `http` module:

```javascript
[require:Node http request basic get$]
```

There are a few nuances with Node's HTTP library that you need to know:

1. It does **not** support `https://` URLs. You will get a `Protocol "https:" not supported. Expected "http:"` error if you call `http.request()` with an HTTPS URL. You need to use `require('https').request()` instead.
2. `http.request()` has a non-standard [callback](/tutorials/fundamentals/callbacks) signature: there is no error parameter. Just `http.request(url, function callback(res) {})`. Because of this non-standard callback signature, you cannot use `http.request()` with [the `promisify()` function](/tutorials/node/promisify).

Alternatives
------------

Because of these rough edges in the API, most developers don't use Node.js' HTTP library for
making requests. We recommend using [Axios](/axios) instead. Below is how you can make
the above HTTP request using Axios.

```javascript
[require:axios get request basic example$]
```

Axios makes HTTP requests much cleaner than using Node.js' built-in library. Plus,
since Axios requests are promises, you can [handle errors using `catch()`](/tutorials/axios/catch).