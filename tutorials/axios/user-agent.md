[Axios](https://github.com/axios/axios) lets you set the `User-Agent`
header using the `headers` option which allows you to to identify
the type of device making the request to the server.
The `User-Agent` property takes a
[string](https://deviceatlas.com/blog/list-of-user-agent-strings)
to tell the server the device making the request. The string follows a
[structure](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agents) to properly identify itself.
Below is an example:

```javascript
[require:axios user-agent-test]
```
