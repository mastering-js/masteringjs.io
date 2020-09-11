Axios has a `axios.delete()` function that makes it easy to send an [HTTP DELETE request](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/DELETE) to a given URL.

```javascript
[require:axios delete request basic example$]
```

Unlike [`axios.post()`](/tutorials/axios/post) and [`axios.put()`](/tutorials/axios/put), the 2nd param to `axios.delete()`
is the [`axios.post()`](/tutorials/axios/options), **not** the request body. To send a request body with a DELETE request,
you should use the [`data` option](/tutorials/axios/options#data).

```javascript
[require:axios delete request body$]
```