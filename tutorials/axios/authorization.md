[Setting request headers with Axios](/tutorials/axios/headers) is easy.
Here's how you can set the [Authorization header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization), which is typically used to send
access tokens to a server.

```javascript
[require:axios Authorization header on GET$]
```

HTTP headers are case-insensitive, so whether you use `'authorization'`
or `'Authorization'` doesn't matter.

```javascript
[require:axios Authorization header case insensitive$]
```

The actual format of the authorization header depends on what auth
strategy the server uses. For example, here's how you can [use Basic Auth with Axios](/tutorials/axios/basic_auth).

With [POST Requests](/tutorials/axios/post)
------------------

Setting the authorization header is a little different with `post()`,
because the 2nd parameter to `post()` is the [request body](https://developer.mozilla.org/en-US/docs/Web/HTTP/Messages). You should pass
the headers as the 3rd parameter to `post()` and `put()`.

```javascript
[require:axios Authorization header on POST$]
```