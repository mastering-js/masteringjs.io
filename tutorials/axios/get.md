The easiest way to make a GET request with [Axios](https://www.npmjs.com/package/axios) is the
[`axios.get()` function](https://github.com/axios/axios#example). The first 
parameter to `axios.get()` is the URL. For example, below is how you make a GET request
to the URL `httpbin.org/get?answer=42`:

```javascript
[require:axios.*get request basic example$]
```

The `options` Parameter
----------------------

The 2nd parameter to `axios.get()` is the [Axios options](https://github.com/axios/axios#request-config).
For example, you don't have to serialize the query string `?answer=42` yourself. Axios will serialize
`options.params` and add it to the query string for you. The below request is equivalent:

```javascript
[require:axios.*get request params$]
```

The `options` parameter is also how you set any [request headers](/tutorials/axios/headers). For example,
below is how you set the `Test-Header` header on a GET request.

```javascript
[require:axios.*setting headers with GET]
```