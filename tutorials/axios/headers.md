To set [HTTP request headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) with
an [axios](https://www.npmjs.com/package/axios) GET request, you should pass
an object with a `headers` property as the 2nd argument.

```javascript
[require:axios.*setting headers with GET]
```

With PUT and POST requests, the 2nd argument is the request body, so you should
pass an object with a `headers` property as the 3rd argument.

```javascript
[require:axios.*setting headers with POST]
```