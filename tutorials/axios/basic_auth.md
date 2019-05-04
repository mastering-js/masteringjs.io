[Basic auth](https://swagger.io/docs/specification/authentication/basic-authentication/) is a common way to handle logging in with username and password via HTTP. If you're using [Axios](https://www.npmjs.com/package/axios) as your HTTP client, you get basic auth for free.

[HTTPBin offers a free sample endpoint to test basic auth](http://httpbin.org/#/Auth/get_basic_auth__user___passwd_). The endpoint URL includes the correct username and password for test purposes. For example, the URL `https://httpbin.org/basic-auth/foo/bar` succeeds if you send it properly formatted basic auth for username 'foo' and password 'bar', and fails if you don't.

If you pass the `auth` option to `axios.get()`, axios will properly format basic auth for you as shown below.

```javascript
[require:axios.*basic auth.*works]
```

If login failed, HTTPBin will respond with an HTTP 401, which Axios bubbles up as a promise rejection.

```javascript
[require:axios.*basic auth.*error]
```