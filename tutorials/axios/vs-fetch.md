[Axios is Mastering JS' offically recommended HTTP client](https://www.getrevue.co/profile/masteringjs/issues/should-you-use-axios-or-fetch-237049). We occasionally use [superagent](http://npmjs.com/package/superagent), but we almost never use the [`fetch()` function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch). The reason is that Axios drastically reduces the amount of boilerplate you need for your average API request. Here's some reasons why:

### Axios is [isomorphic](https://www.npmjs.com/package/axios#features), fetch is not

The syntax for most basic Axios requests is the same in both Node.js and the browser. Since Node.js does not
have a built-in `fetch()` function, you need to use a polyfill like [node-fetch](http://npmjs.com/package/node-fetch). And there are several [known differences between node-fetch and browser `fetch()`](https://github.com/node-fetch/node-fetch/blob/master/docs/v3-LIMITS.md).

### Axios throws an error when a request fails

One of the most annoying issues with `fetch()` is that it [does not throw an error when the server responds with an HTTP error status, like 404 or 500](https://medium.com/frontend-digest/axios-vs-fetch-which-to-use-in-2019-6678c083c5c).

```javascript
fetch('https://httpbin.org/post').catch(err => {
  /* No error even though the server responded with 405 */
});

axios.get('https://httpbin.org/post').catch(err => {
  err.response.status; // 405 "METHOD NOT ALLOWED"
});
```

However, `fetch()` **does** throw an error if it can't reach the server, so you always need two distinct error handling
paths with `fetch()`. The situation is even worse with [async/await](http://thecodebarbarian.com/async-await-error-handling-in-javascript.html): every `fetch()` needs an extra [`then()`](/tutorials/fundamentals/then) to bubble up errors.

[Axios error handling](/tutorials/axios/catch) is much easier: just use `catch()`.

### Automatic JSON and Form-Encoded Serialization and Parsing

Most modern APIs use JSON or [form encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/POST) for request bodies. Axios handles JSON and form encoding automatically, as well as automatically [serializing query strings](/tutorials/axios/get-query-params).

```javascript
// Serialize JSON body and query params with fetch:
body = JSON.stringify(body);
query = new URLSearchParams(query).toString();

const res = await fetch('/myendpoint?' + query, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body
});

// Serialize JSON body and query params with axios:
await axios.post('/myendpoint', { params: query, body });
```

### Framework Features: [Interceptors](/tutorials/axios/interceptors) and [Instances](/tutorials/axios/create)

With all these limitations, the unfortunate reality is that [everybody who uses `fetch()` writes their own wrapper around `fetch()`](https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper/). It is extremely difficult to build an app using `fetch()` directly.

Axios lets you go further by providing some framework-like features. You can use interceptors and instances to
[create your own API wrappers using Axios](https://www.getrevue.co/profile/masteringjs/issues/building-an-api-client-library-with-axios-254566). For example, here's how you can build a Trello API client using
instances and interceptors:

<img src="https://s3.amazonaws.com/revue/items/images/006/139/960/mail/48496b778150aefaa29789612cff0777.png" class="inline-image" style="width: 50%">

So Axios not only eliminates a lot of the boilerplate and rough edges of `fetch()`, and also makes it easier to
build specific wrappers for different APIs.